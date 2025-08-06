#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Converts .md files to .mdx files
 * - Renames the file extension from .md to .mdx
 * - Preserves all content as-is (MDX is a superset of Markdown)
 * - Handles frontmatter correctly
 */
function convertMdToMdx(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    const conversions = [];
    
    console.log(`Scanning directory: ${dirPath}\n`);
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      // Skip directories
      if (stats.isDirectory()) {
        console.log(`⏭️  Skipping directory: ${file}`);
        return;
      }
      
      // Only process .md files
      const ext = path.extname(file).toLowerCase();
      if (ext !== '.md') {
        if (ext === '.mdx') {
          console.log(`✅ Already MDX: ${file}`);
        } else {
          console.log(`⏭️  Skipping non-markdown file: ${file}`);
        }
        return;
      }
      
      const baseName = path.basename(file, '.md');
      const newFileName = baseName + '.mdx';
      const newFilePath = path.join(dirPath, newFileName);
      
      // Check if target .mdx file already exists
      if (fs.existsSync(newFilePath)) {
        console.log(`⚠️  Cannot convert "${file}" - target file "${newFileName}" already exists`);
        return;
      }
      
      conversions.push({
        original: file,
        converted: newFileName,
        originalPath: filePath,
        newPath: newFilePath
      });
    });
    
    if (conversions.length === 0) {
      console.log('\n🎉 No .md files found to convert! All files are already .mdx or other formats.');
      return;
    }
    
    console.log(`\n📋 Files to convert (${conversions.length}):`);
    conversions.forEach((conversion, index) => {
      console.log(`${index + 1}. "${conversion.original}" → "${conversion.converted}"`);
    });
    
    // Check for dry-run mode
    const dryRun = process.argv.includes('--dry-run') || !process.argv.includes('--execute');
    
    if (dryRun) {
      console.log('\n🔍 DRY RUN MODE - No files will be converted');
      console.log('To actually convert files, run: node scripts/convert-md-to-mdx.js --execute');
      return;
    }
    
    // Execute conversions
    console.log('\n🚀 Converting files...');
    let successCount = 0;
    
    conversions.forEach((conversion, index) => {
      try {
        // Read the original file content
        const content = fs.readFileSync(conversion.originalPath, 'utf8');
        
        // Write to new .mdx file
        fs.writeFileSync(conversion.newPath, content, 'utf8');
        
        // Remove the original .md file
        fs.unlinkSync(conversion.originalPath);
        
        console.log(`✅ ${index + 1}/${conversions.length} Converted: "${conversion.original}" → "${conversion.converted}"`);
        successCount++;
      } catch (error) {
        console.log(`❌ ${index + 1}/${conversions.length} Failed to convert "${conversion.original}": ${error.message}`);
      }
    });
    
    console.log(`\n🎉 Completed! Successfully converted ${successCount}/${conversions.length} files.`);
    
    if (successCount > 0) {
      console.log('\n💡 Next steps:');
      console.log('1. Verify the converted files work correctly in your app');
      console.log('2. Update any import statements that reference the old .md files');
      console.log('3. Consider regenerating your sitemap if needed: npm run sitemap');
    }
    
  } catch (error) {
    console.error(`❌ Error scanning directory: ${error.message}`);
    process.exit(1);
  }
}

// Main execution
const postsDir = path.join(__dirname, '..', 'src', 'content', 'posts');

console.log('🔄 MD to MDX Converter');
console.log('====================');

// Check if posts directory exists
if (!fs.existsSync(postsDir)) {
  console.error(`❌ Posts directory not found: ${postsDir}`);
  process.exit(1);
}

convertMdToMdx(postsDir);