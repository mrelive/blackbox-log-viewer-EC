#!/usr/bin/env node

/**
 * Auto-fix missing .js extensions in ESM imports
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '..', 'src');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Fix relative imports without .js extension
  // Match: from "./something" or from './something'
  // Don't match: from "./something.js" or from "./something.json"
  const importRegex = /from\s+["'](\.[^"']+)["']/g;
  
  content = content.replace(importRegex, (match, importPath) => {
    // Skip if already has .js, .json, or .css extension
    if (importPath.endsWith('.js') || importPath.endsWith('.json') || importPath.endsWith('.css')) {
      return match;
    }
    
    // Add .js extension
    changed = true;
    return match.replace(importPath, importPath + '.js');
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed: ${path.relative(process.cwd(), filePath)}`);
  }
  
  return changed;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  let fixedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixedCount += walkDir(filePath);
    } else if (file.endsWith('.js')) {
      if (fixFile(filePath)) {
        fixedCount++;
      }
    }
  }
  
  return fixedCount;
}

console.log('Fixing missing .js extensions in ESM imports...\n');
const fixedCount = walkDir(srcDir);
console.log(`\n✓ Fixed ${fixedCount} file(s)`);
