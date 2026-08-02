import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import esbuild from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const readerModeSrc = fs.readFileSync(
  path.join(__dirname, "readermode.inline.ts"),
  "utf8",
);
const langToggleSrc = fs.readFileSync(
  path.join(__dirname, "langtoggle.inline.ts"),
  "utf8",
);

function compileInlineScript(name: string, src: string): string {
  const result = esbuild.transformSync(src, {
    format: "iife",
    loader: "ts",
    platform: "browser",
    target: "esnext",
  });
  if (result.warnings.length > 0) {
    console.warn(`esbuild warnings for ${name}:`, result.warnings);
  }
  return result.code;
}

const readerModeScript = compileInlineScript("readermode", readerModeSrc);
const langToggleScript = compileInlineScript("langtoggle", langToggleSrc);

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

function createStorage(initial: Record<string, string> = {}): StorageLike {
  const store = new Map<string, string>(Object.entries(initial));
  return {
    getItem(key: string) {
      return store.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
  };
}

class MockElement {
  private attributes = new Map<string, string>();
  private listeners = new Map<string, Set<(...args: unknown[]) => void>>();

  constructor(readonly className: string) {}

  addEventListener(type: string, handler: (...args: unknown[]) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(handler);
  }

  removeEventListener(type: string, handler: (...args: unknown[]) => void) {
    this.listeners.get(type)?.delete(handler);
  }

  setAttribute(name: string, value: string) {
    this.attributes.set(name, value);
  }

  getAttribute(name: string) {
    return this.attributes.get(name) ?? null;
  }

  dispatchEvent(event: { type: string }) {
    for (const handler of this.listeners.get(event.type) ?? []) {
      handler(event);
    }
  }

  click() {
    this.dispatchEvent({ type: "click" });
  }
}

interface MockDocument {
  documentElement: MockElement;
  addEventListener(type: string, handler: (...args: unknown[]) => void): void;
  removeEventListener(
    type: string,
    handler: (...args: unknown[]) => void,
  ): void;
  dispatchEvent(event: { type: string }): void;
  getElementsByClassName(className: string): MockElement[];
}

function createMockDocument(elements: MockElement[]): MockDocument {
  const listeners = new Map<string, Set<(...args: unknown[]) => void>>();
  const documentElement = new MockElement("");

  return {
    documentElement,
    addEventListener(type, handler) {
      if (!listeners.has(type)) {
        listeners.set(type, new Set());
      }
      listeners.get(type)!.add(handler);
    },
    removeEventListener(type, handler) {
      listeners.get(type)?.delete(handler);
    },
    dispatchEvent(event) {
      for (const handler of listeners.get(event.type) ?? []) {
        handler(event);
      }
    },
    getElementsByClassName(className) {
      return elements.filter((el) => el.className === className);
    },
  };
}

interface Page {
  document: MockDocument;
  readerButton: MockElement;
  langButton: MockElement;
  assignedURL: string | null;
  runScripts(): void;
  dispatchNav(): void;
}

function createPage(pathname: string, storage: StorageLike): Page {
  const readerButton = new MockElement("readermode");
  const langButton = new MockElement("langtoggle");
  const document = createMockDocument([readerButton, langButton]);

  let assignedURL: string | null = null;
  const cleanup: (() => void)[] = [];

  const window = {
    location: {
      pathname,
      assign(url: string) {
        assignedURL = url;
      },
    },
    addCleanup(fn: () => void) {
      cleanup.push(fn);
    },
  };

  const CustomEvent = class {
    readonly detail?: unknown;
    constructor(
      readonly type: string,
      init?: { detail?: unknown },
    ) {
      this.detail = init?.detail;
    }
  };

  const context = {
    console,
    document,
    localStorage: storage,
    window,
    CustomEvent,
  };

  return {
    document,
    readerButton,
    langButton,
    get assignedURL() {
      return assignedURL;
    },
    runScripts() {
      runInNewContext(readerModeScript, context, {
        filename: "readermode.inline.ts",
      });
      runInNewContext(langToggleScript, context, {
        filename: "langtoggle.inline.ts",
      });
    },
    dispatchNav() {
      document.dispatchEvent(
        new CustomEvent("nav", { detail: { url: pathname } }),
      );
    },
  };
}

test("reader mode persists across language toggle in both directions", () => {
  const storage = createStorage();

  // Load an English page and activate reader mode
  let page = createPage("/en/posts/foo", storage);
  page.runScripts();
  page.dispatchNav();
  assert.equal(
    page.document.documentElement.getAttribute("reader-mode"),
    "off",
  );

  page.readerButton.click();
  assert.equal(page.document.documentElement.getAttribute("reader-mode"), "on");
  assert.equal(storage.getItem("reader-mode"), "on");

  // Toggle language: English -> Portuguese
  page.langButton.click();
  assert.equal(page.assignedURL, "/pt/posts/foo");
  assert.equal(storage.getItem("lang"), "pt");

  // Simulate full page reload at the new URL with the same localStorage
  page = createPage("/pt/posts/foo", storage);
  page.runScripts();
  page.dispatchNav();
  assert.equal(page.document.documentElement.getAttribute("reader-mode"), "on");
  assert.equal(storage.getItem("reader-mode"), "on");

  // Toggle language back: Portuguese -> English
  page.langButton.click();
  assert.equal(page.assignedURL, "/en/posts/foo");
  assert.equal(storage.getItem("lang"), "en");

  page = createPage("/en/posts/foo", storage);
  page.runScripts();
  page.dispatchNav();
  assert.equal(page.document.documentElement.getAttribute("reader-mode"), "on");
});

test("reader mode defaults to off when nothing is stored", () => {
  const storage = createStorage();
  const page = createPage("/en/posts/foo", storage);
  page.runScripts();
  page.dispatchNav();
  assert.equal(
    page.document.documentElement.getAttribute("reader-mode"),
    "off",
  );
  assert.equal(storage.getItem("reader-mode"), "off");
});
