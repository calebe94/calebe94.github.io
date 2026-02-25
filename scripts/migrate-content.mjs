import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Frontmatter field mapping for Astro → Quartz migration
const frontmatterMap = {
  publishDate: 'date',
  updatedDate: 'updated',
  coverImage: null, // Remove - Quartz uses socialImage string instead
  ogImage: 'socialImage', // Keep but as simple string, not object
};

// Fields to keep as-is
const keepFields = ['title', 'description', 'tags', 'draft', 'aliases', 'cssclasses', 'enableToc', 'comments', 'lang'];

function migrateFrontmatter(frontmatter) {
  const migrated = {};

  for (const [key, value] of Object.entries(frontmatter)) {
    if (frontmatterMap[key] === null) {
      // Skip this field (remove it)
      continue;
    }

    if (frontmatterMap[key]) {
      // Map to new field name
      const newKey = frontmatterMap[key];
      migrated[newKey] = value;
    } else if (keepFields.includes(key)) {
      // Keep as-is
      migrated[key] = value;
    }
  }

  return migrated;
}

function processFile(sourcePath, destPath) {
  try {
    const content = fs.readFileSync(sourcePath, 'utf8');
    const { data: frontmatter, content: markdownBody } = matter(content);

    const migratedFrontmatter = migrateFrontmatter(frontmatter);

    const file = matter.stringify(markdownBody, migratedFrontmatter);

    // Ensure destination directory exists
    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    fs.writeFileSync(destPath, file, 'utf8');
    console.log(`✓ Migrated: ${sourcePath} → ${destPath}`);
  } catch (error) {
    console.error(`✗ Error processing ${sourcePath}:`, error.message);
  }
}

function migrateDirectory(sourceDir, destDir) {
  if (!fs.existsSync(sourceDir)) {
    console.log(`⚠ Source directory doesn't exist: ${sourceDir}`);
    return;
  }

  const files = fs.readdirSync(sourceDir, { recursive: true, withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) continue;

    if (file.name.endsWith('.md') || file.name.endsWith('.mdx')) {
      const sourcePath = path.join(sourceDir, file.name);
      const destPath = path.join(destDir, file.name);
      processFile(sourcePath, destPath);
    }
  }
}

// Main migration
console.log('🚀 Starting content migration from Astro to Quartz 4...\n');

// Migrate posts
console.log('\n📝 Migrating posts...');
migrateDirectory('src/content/post', 'content/posts');

// Migrate notes
console.log('\n📝 Migrating notes...');
migrateDirectory('src/content/note', 'content/notes');

// Migrate uses
console.log('\n📝 Migrating uses...');
migrateDirectory('src/content/uses', 'content/uses');

console.log('\n✅ Migration complete!');
