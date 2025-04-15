import { LicenseTypes } from './data/license-types';
import { LicenseType } from './types/license-type';

export function getForwardCompatibility(pkgLicenseType: LicenseType, moduleLicenseType: LicenseType): boolean {
  switch (moduleLicenseType) {
    case LicenseTypes.unlicensed.id:
      return false;
    case LicenseTypes.unknown.id:
      return false;
    case LicenseTypes.publicDomain.id:
      return LicenseTypes.publicDomain.forwardCompatibility.includes(pkgLicenseType);
    case LicenseTypes.permissive.id:
      return LicenseTypes.permissive.forwardCompatibility.includes(pkgLicenseType);
    case LicenseTypes.weaklyProtective.id:
      return LicenseTypes.weaklyProtective.forwardCompatibility.includes(pkgLicenseType);
    case LicenseTypes.stronglyProtective.id:
      return LicenseTypes.stronglyProtective.forwardCompatibility.includes(pkgLicenseType);
    case LicenseTypes.networkProtective.id:
      return LicenseTypes.networkProtective.forwardCompatibility.includes(pkgLicenseType);
    default:
      return false;
  }
}
