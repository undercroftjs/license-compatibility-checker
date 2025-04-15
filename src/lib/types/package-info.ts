import { LicenseInfo } from './license-info';

export interface PackageInfo {
  name: string;
  version: string;
  license: string;
  licenseInfo: LicenseInfo;
  resolvedModulesPath: string;
  resolvedPackagePath: string;
}
