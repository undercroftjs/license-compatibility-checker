import { LicenseType } from './license-type';

export interface LicenseInfo {
  id: LicenseType;
  name: string;
  forwardCompatibility: LicenseType[];
}
