import { PackageJson } from './types/package-json';

/**
 * Get the package name from a package.json object.
 * @param packageJson - The package.json object.
 * @returns The package name or 'unknown' if not found.
 */
export function getPackageLicense(packageJson: PackageJson): string {
  if (!packageJson) {
    return 'unknown';
  }
  if (typeof packageJson.license === 'object') {
    return packageJson.license.type ?? 'unknown';
  }
  if (Array.isArray(packageJson.license)) {
    return packageJson.license[0] ?? 'unknown';
  }
  if (typeof packageJson.license === 'string') {
    return packageJson.license;
  }
  return 'unknown';
}
