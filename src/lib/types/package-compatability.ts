export interface PackageCompatability {
  name: string,
  version: string,
  license: string,
  licenseType: string,
  reason: 'forwardCompatibility' | 'unknown' | 'compatible',
}
