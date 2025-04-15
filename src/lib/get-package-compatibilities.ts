import { LicenseInfo } from './types/license-info';
import { PackageCompatability } from './types/package-compatability';
import fs from 'fs';
import { PackageJson } from './types/package-json';
import { getPackageLicense } from './get-package-license';
import { getLicenseType } from './get-license-type';
import { LicenseTypes } from './data/license-types';
import { getForwardCompatibility } from './get-forward-compatibility';

export function getPackageCompatibilities(packages: string[], packageLicenseInfo: LicenseInfo) {
  const compatiblePackages: PackageCompatability[] = [];
  const incompatiblePackages: PackageCompatability[] = [];
  for (const pkg of packages) {
    const packageJson = fs.readFileSync(pkg, { encoding: 'utf8' });
    const modulePkg: PackageJson = JSON.parse(packageJson);
    const moduleLicense = getPackageLicense(modulePkg);
    const moduleLicenseType = getLicenseType(moduleLicense);
    const moduleInfo: PackageCompatability = {
      name: modulePkg.name || 'Unnamed',
      version: modulePkg.version || 'Unversioned',
      license: moduleLicense,
      licenseType: moduleLicenseType.name,
      reason: moduleLicenseType.name === LicenseTypes.unknown.name || moduleLicenseType.name === LicenseTypes.unlicensed.name
        ? 'unknown'
        : !getForwardCompatibility(packageLicenseInfo.id, moduleLicenseType.id)
          ? 'forwardCompatibility'
          : 'compatible',
    };

    if (moduleInfo.reason === 'compatible') {
      compatiblePackages.push(moduleInfo);
    } else {
      incompatiblePackages.push(moduleInfo);
    }
  }
  return [compatiblePackages, incompatiblePackages];
}
