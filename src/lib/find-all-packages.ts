import fs from 'fs';
import path from 'path';

/**
 * Recursively finds all package.json files within a node_modules folder.
 * @param nodeModulesPath - The starting directory (usually your project's node_modules).
 * @returns An array of absolute paths to each package.json found.
 */
export async function findPackageJsons(nodeModulesPath: string): Promise<string[]> {
  const results: string[] = [];

  if (!fs.existsSync(nodeModulesPath)) return results;

  const entries = fs.readdirSync(nodeModulesPath);
  for (const entry of entries) {
    const entryPath = path.join(nodeModulesPath, entry);
    const stat = fs.statSync(entryPath);

    if (stat.isDirectory()) {
      if (entry.startsWith('@')) {
        const scopedEntries = fs.readdirSync(entryPath);
        for (const scopedEntry of scopedEntries) {
          const scopedPath = path.join(entryPath, scopedEntry);
          const pkgJsonPath = path.join(scopedPath, 'package.json');
          if (fs.existsSync(pkgJsonPath)) {
            results.push(pkgJsonPath);
          }
        }
      } else {
        const pkgJsonPath = path.join(entryPath, 'package.json');
        if (fs.existsSync(pkgJsonPath)) {
          results.push(pkgJsonPath);
        }
      }
    }
  }

  return results;
}
