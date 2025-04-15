import licenseData from './data/licenses.json';
import { LicenseTypes } from './data/license-types';
import { LicenseData } from './types/license-data';
import { LicenseInfo } from './types/license-info';

const data: LicenseData = licenseData;

/**
 * Get the license type from a license string.
 * @param license - The license string.
 * @returns The license type.
 */
export function getLicenseType(license: string | undefined): LicenseInfo {
  if (!license) {
    return LicenseTypes.unlicensed;
  } else if (data[LicenseTypes.publicDomain.name].includes(license)) {
    return LicenseTypes.publicDomain;
  } else if (data[LicenseTypes.permissive.name].includes(license)) {
    return LicenseTypes.permissive;
  } else if (data[LicenseTypes.weaklyProtective.name].includes(license)) {
    return LicenseTypes.weaklyProtective;
  } else if (data[LicenseTypes.stronglyProtective.name].includes(license)) {
    return LicenseTypes.stronglyProtective;
  } else if (data[LicenseTypes.networkProtective.name].includes(license)) {
    return LicenseTypes.networkProtective;
  }
  return LicenseTypes.unknown;
}
