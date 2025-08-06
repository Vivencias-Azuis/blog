#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Converts a filename to kebab-case format
 * - Converts to lowercase
 * - Replaces spaces with hyphens
 * - Removes accents/diacritics
 * - Removes special characters except hyphens and dots
 * - Removes multiple consecutive hyphens
 */
function toKebabCase(filename) {
  // Extract file extension
  const ext = path.extname(filename);
  const nameWithoutExt = path.basename(filename, ext);
  
  // Convert to lowercase and handle accents
  let kebabName = nameWithoutExt
    .toLowerCase()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  
  return kebabName + ext;
}

/**
 * Scans directory and renames files that need normalization
 */
function normalizeFilenames(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    const renames = [];
    
    console.log(`Scanning directory: ${dirPath}\n`);
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      // Skip directories
      if (stats.isDirectory()) {
        console.log(`⏭️  Skipping directory: ${file}`);
        return;
      }
      
      // Only process .md and .mdx files
      const ext = path.extname(file).toLowerCase();
      if (!['.md', '.mdx'].includes(ext)) {
        console.log(`⏭️  Skipping non-markdown file: ${file}`);
        return;
      }
      
      const normalizedName = toKebabCase(file);
      
      // Check if file needs renaming
      if (file !== normalizedName) {
        const newFilePath = path.join(dirPath, normalizedName);
        
        // Check if target file already exists (case-insensitive check)
        const existingFiles = fs.readdirSync(dirPath);
        const conflictingFile = existingFiles.find(existingFile => 
          existingFile.toLowerCase() === normalizedName.toLowerCase() && existingFile !== file
        );
        
        if (conflictingFile) {
          console.log(`⚠️  Cannot rename "${file}" to "${normalizedName}" - conflicting file exists: "${conflictingFile}"`);
          return;
        }
        
        renames.push({
          original: file,
          normalized: normalizedName,
          originalPath: filePath,
          newPath: newFilePath
        });
      } else {
        console.log(`✅ File already normalized: ${file}`);
      }
    });
    
    if (renames.length === 0) {
      console.log('\n🎉 All files are already properly named!');
      return;
    }
    
    console.log(`\n📋 Files that need renaming (${renames.length}):`);
    renames.forEach((rename, index) => {
      console.log(`${index + 1}. "${rename.original}" → "${rename.normalized}"`);
    });
    
    // Ask for confirmation (in a real script, you might want to use a prompt library)
    console.log('\n🤔 Do you want to proceed with the renaming? (y/N)');
    
    // For this script, we'll add a dry-run mode by default
    const dryRun = process.argv.includes('--dry-run') || !process.argv.includes('--execute');
    
    if (dryRun) {
      console.log('\n🔍 DRY RUN MODE - No files will be renamed');
      console.log('To actually rename files, run: node scripts/normalize-filenames.js --execute');
      return;
    }
    
    // Execute renames
    console.log('\n🚀 Renaming files...');
    let successCount = 0;
    
    renames.forEach((rename, index) => {
      try {
        fs.renameSync(rename.originalPath, rename.newPath);
        console.log(`✅ ${index + 1}/${renames.length} Renamed: "${rename.original}" → "${rename.normalized}"`);
        successCount++;
      } catch (error) {
        console.log(`❌ ${index + 1}/${renames.length} Failed to rename "${rename.original}": ${error.message}`);
      }
    });
    
    console.log(`\n🎉 Completed! Successfully renamed ${successCount}/${renames.length} files.`);
    
  } catch (error) {
    console.error(`❌ Error scanning directory: ${error.message}`);
    process.exit(1);
  }
}

// Main execution
const postsDir = path.join(__dirname, '..', 'src', 'content', 'posts');

console.log('🔧 Filename Normalizer for Blog Posts');
console.log('=====================================');

// Check if posts directory exists
if (!fs.existsSync(postsDir)) {
  console.error(`❌ Posts directory not found: ${postsDir}`);
  process.exit(1);
}

normalizeFilenames(postsDir);