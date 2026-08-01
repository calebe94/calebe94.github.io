---
title: "Menos é mais: refatorando o i18n do blog com KISS e filosofia Unix"
description: "Troquei bandeirinhas por um ícone de globo, movi 28 arquivos de lugar, e gerei redirects automáticos — tudo sem framework, sem biblioteca de i18n, e sem JavaScript desnecessário."
date: "2026-08-01 00:00:00"
tags:
  - PT_BR
  - blog
  - suckless
  - i18n
---

# Menos é mais: refatorando o i18n do blog com KISS e filosofia Unix

Se você já tentou manter um site em dois idiomas, sabe que a parte mais chata não é traduzir o conteúdo — é a infraestrutura. Onde colocar os arquivos? Como fazer o toggle? O que fazer com os links antigos quando você muda tudo de lugar?

Eu vinha empurrando esses problemas com a barriga desde que migrei o blog do Astro Cactus pro Quartz 4. Funcionava, mas era feio. E eu sou o tipo de pessoa que se incomoda com coisa feia.

Bom... vamos direto ao ponto.

> **📋 Resumo visual do que mudou:**
>
> | Antes | Depois |
> |-------|--------|
> | 🇧🇷 Português (bandeira + texto) | 🌐 Ícone de globo (SVG 20×20px) |
> | pt-BR na raiz, EN em `/en/` | `pt/` e `en/` como irmãs simétricas |
> | `/posts/foo` (pt-BR) | `/pt/posts/foo` + redirect automático |
> | ReaderMode só em posts | ReaderMode em todas as páginas |
> | `glossario.md` ≠ `glossary.md` | `glossary.md` nos dois idiomas |
> | `/` = Home em português | `/` → redirect para `/pt/` |

## A bagunça que eu tinha

O blog tinha português na raiz e inglês em `/en/`. Assimétrico. O Explorer do Quartz mostrava "Home" solto, pastas de posts e notes sem contexto de idioma, e um `/en/` que parecia um anexo em vez de uma versão equivalente do site.

O toggle de idioma era uma bandeirinha com texto: `🇧🇷 Português` ou `🇬🇧 English`. Funcionava? Sim. Mas "Português" é uma palavra comprida. Em telas menores, o texto empurrava o botão de ReaderMode pra fora da barra. E bandeira representa país, não língua — eu escrevo em português, não sou uma embaixada.

E ainda tinha o glossário: `glossario.md` em português, `glossary.md` em inglês. Inconsistente. Toda vez que eu linkava o glossário num post novo, tinha que lembrar qual era o nome certo.

Nada disso era bug. Mas era ruído. E ruído acumula.

## A filosofia

Eu não sou fã de framework. Na verdade, eu tenho uma birra específica com coisa que faz mágica sem eu entender o que tá acontecendo. Se eu não consigo abrir o `view-source:` e ler o HTML, tem algo errado.

Três princípios guiam tudo que eu faço nesse site:

**KISS (Keep It Simple, Stupid).** Se resolve com um arquivo estático, não precisa de biblioteca. Se um componente tem 30 linhas, não precisa de 60.

**Suckless.** O site tem que ser rápido, autocontido, e não depender de nada que eu não entenda completamente — veja [[premissas_basicas]]. Sem framework que faz mágica. Sem 200KB de JavaScript pra trocar um ícone.

**Filosofia Unix.** Cada componente faz uma coisa bem feita. O toggle de idioma não sabe que o emitter de redirects existe. A estrutura de pastas é previsível: `pt/` e `en/` são irmãs, não casos especiais.

E tem uma quarta influência que merece menção: a tríade [motherfuckingwebsite.com](https://motherfuckingwebsite.com/), [securemotherfuckingwebsite.com](https://securemotherfuckingwebsite.com/), e o manifesto [Have a Fucking Website](https://www.otherstrangeness.com/2026/03/14/have-a-fucking-website/). Se você nunca leu, são três páginas. A primeira é um site feio, leve, e perfeitamente funcional — 5KB, sem CSS, sem JS, e você consegue ler tudo em 30 segundos. A segunda adiciona HTTPS e um pouquinho de CSS responsivo. A terceira é um lembrete de que ter um site próprio, sob seu domínio, com seu conteúdo, ainda é o jeito mais livre de existir na internet. Nada de Medium, nada de Substack, nada de plataforma que pode sumir amanhã. **Seu domínio, seu HTML, suas regras.**

Dito isso, fui refatorar.

## Ícone de globo no lugar de bandeira + texto

O `LangToggle` antigo era um `<button>` com dois `<span>`s dentro: um pra bandeira, um pro texto. O SCSS tinha `gap: 4px`, `font-size: 0.8rem`, `white-space: nowrap` — gambiarra em cima de gambiarra pra caber na barra.

Apaguei tudo. O novo componente é um SVG inline de globo terrestre, 20×20px, mesmo esquema visual do Darkmode e do ReaderMode:

```tsx
<button class="langtoggle" aria-label="English">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 ..." />
  </svg>
</button>
```

O SCSS agora é idêntico ao `darkmode.scss` e `readermode.scss`:

```scss
.langtoggle {
  width: 20px;
  height: 32px;
  flex-shrink: 0;

  & svg {
    position: absolute;
    width: 20px;
    height: 20px;
    top: calc(50% - 10px);
    stroke: var(--darkgray);
  }
}
```

O label "Português" / "English" ainda existe — mas só no `aria-label` e no `<title>` do SVG, pra leitores de tela. Quem tá vendo a tela só vê o ícone. Um botão, um SVG, zero texto visível, zero quebra de layout. KISS.

## Estrutura simétrica de pastas

Movi todo o conteúdo em português pra `content/pt/`. 28 arquivos renomeados. O `git` detectou como rename, não como delete+create — então o histórico não se perdeu.

```
Antes:                    Depois:
  content/                  content/
    index.md  (pt-BR)         index.md    (redirect)
    posts/    (pt-BR)         pt/
    notes/    (pt-BR)           index.md  (Português)
    uses/     (pt-BR)           posts/    (pt-BR)
    en/                         notes/    (pt-BR)
      index.md  (EN)            uses/     (pt-BR)
      posts/    (EN)          en/
      notes/    (EN)            index.md  (English)
      uses/     (EN)            posts/    (EN)
                                notes/    (EN)
                                uses/     (EN)
```

O Explorer agora mostra `pt/` e `en/` como irmãs, cada uma com suas subpastas. Sem exceções, sem casos especiais. Unix: tudo no seu lugar.

## Redirects automáticos pra não quebrar a internet

Mover 28 arquivos quebra todo link que já existe por aí. `/posts/zuko-pedal-marshall-diy` agora é `/pt/posts/zuko-pedal-marshall-diy`. Eu não queria deixar ninguém no 404 — e também não queria configurar redirect no Cloudflare ou no nginx. Isso é responsabilidade do build, não do servidor.

Escrevi um emitter customizado pro Quartz. 40 linhas. Ele pega todo arquivo em `content/pt/`, calcula qual era o slug antigo (sem o prefixo `/pt`), e gera um HTML estático com `<meta http-equiv="refresh">`:

```typescript
// quartz/plugins/emitters/legacyRedirects.ts
export const LegacyRedirects: QuartzEmitterPlugin = () => ({
  name: "LegacyRedirects",
  async *emit(ctx, content) {
    for (const [_tree, file] of content) {
      const slug = simplifySlug(file.data.slug!)
      if (!slug || !slug.startsWith("pt/")) continue

      const oldSlug = slug.slice(3) // "pt/posts/foo" → "posts/foo"
      const redirUrl = resolveRelative(oldSlug, slug)

      yield write({
        ctx,
        content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<link rel="canonical" href="${redirUrl}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${redirUrl}">
</head>
</html>`,
        slug: oldSlug,
        ext: ".html",
      })
    }
  },
})
```

24 arquivos de redirect gerados a cada build. Zero JavaScript no cliente. Zero dependência externa. Um arquivo estático com um meta tag resolve. Isso é Unix: uma ferramenta que faz uma coisa só — gerar redirects — e não sabe que o LangToggle existe.

## ReaderMode onde faltava

O `defaultListPageLayout` não tinha `ReaderMode` — só o `defaultContentPageLayout` tinha. Resultado: `/pt/`, `/en/`, `/pt/posts/` não mostravam o botão de modo leitor. Uma linha resolveu:

```typescript
// quartz.layout.ts — defaultListPageLayout
{ Component: Component.Darkmode() },
{ Component: Component.ReaderMode() },  // ← adicionado
{ Component: Component.LangToggle() },
```

Foi literalmente copiar e colar a linha que já existia no outro layout. 5 segundos.

## Raiz redireciona pra português

Sou brasileiro, meu conteúdo principal é em português. A raiz (`/`) agora é um redirect automático pra `/pt/`. Mesmo esquema dos redirects de posts: meta tag, zero JavaScript:

```html
<meta http-equiv="refresh" content="0; url=/pt/">
<link rel="canonical" href="/pt/">
```

Se o navegador tem JavaScript desabilitado, aparece o link "Redirecionando para português...". Se tem, o redirect é instantâneo.

## `glossario.md` → `glossary.md`

Renomeei o arquivo em português pra bater com o inglês. Atualizei as 6 referências cruzadas no template de post, no `welcome.md` e no post do Zuko. Agora é `glossary.md` nos dois idiomas, sem exceção.

## O que eu não usei

E é aqui que eu quero chegar. Nada do que eu fiz precisou de:

- **Biblioteca de i18n.** O toggle é um script vanilla de 30 linhas que troca `/pt/` ↔ `/en/` no pathname.
- **Framework de rotas.** Os redirects são HTML puro com `<meta http-equiv="refresh">`.
- **CSS framework.** O SCSS do LangToggle é 30 linhas e copia o padrão que o Darkmode já usava.
- **JavaScript no redirect da raiz.** É um meta tag. O navegador faz o trabalho.

Cada dependência que você adiciona é uma decisão que você vai ter que manter por anos. Eu não quero manter um `react-i18next` no meu blog estático. Não quero debugar por que o `next-intl` quebrou na versão 4. Não quero 200KB de JavaScript pra trocar "Português" por "English".

O que eu quero: um site que eu entenda completamente. Que eu possa abrir o `view-source:` e ler o HTML. Que compile em 600ms. Que não dependa de nada que eu não possa consertar com `git revert`.

E já que estamos falando de independência: eu rodo esse site num VPS próprio, com Nginx, sem plataforma nenhuma no meio. Se você quer fazer o mesmo, o [awesome-selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted) é o ponto de partida — uma lista curada de software que você pode hospedar você mesmo. O [selfh.st](https://selfh.st/) e o [selfh.st/apps](https://selfh.st/apps/) complementam com newsletters e guias semanais sobre o ecossistema self-hosted. Não é só sobre "não depender de terceiros" — é sobre entender a pilha inteira, do DNS ao HTML. E isso, pra mim, é a graça toda.

Esse site tem 139 arquivos estáticos, 52 arquivos Markdown, e zero dependências de runtime além do preact que o Quartz já empacota. O toggle de idioma é um `<button>` com um SVG dentro. Os redirects são HTML. A estrutura de pastas é `pt/` e `en/`.

**Menos é mais. Sempre foi.**

---

Esse post faz parte da série de bastidores do blog. Se você curte essa filosofia, dá uma olhada no [código fonte](https://github.com/Calebe94/blog) e no [[glossary|glossário]] — ele é atualizado a cada post.
