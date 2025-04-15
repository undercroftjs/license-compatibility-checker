import { LicenseType } from '../types/license-type';
import { LicenseInfo } from '../types/license-info';

export const LicenseTypes: Record<LicenseType, LicenseInfo> = {
  publicDomain: {
    id: 'publicDomain',
    name: 'Public Domain',
    forwardCompatibility: [
      'unlicensed',
      'unknown',
      'publicDomain',
      'permissive',
      'weaklyProtective',
      'stronglyProtective',
      'networkProtective',
    ],
  },
  permissive: {
    id: 'permissive',
    name: 'Permissive',
    forwardCompatibility: [
      'unlicensed',
      'permissive',
      'weaklyProtective',
      'stronglyProtective',
      'networkProtective',
    ],
  },
  weaklyProtective: {
    id: 'weaklyProtective',
    name: 'Weakly Protective',
    forwardCompatibility: ['unlicensed', 'weaklyProtective', 'stronglyProtective', 'networkProtective'],
  },
  stronglyProtective: {
    id: 'stronglyProtective',
    name: 'Strongly Protective',
    forwardCompatibility: [
      'unlicensed',
      'stronglyProtective',
      'networkProtective',
    ],
  },
  networkProtective: {
    id: 'networkProtective',
    name: 'Network Protective',
    forwardCompatibility: [
      'unlicensed',
      'networkProtective',
    ],
  },
  unknown: {
    id: 'unknown',
    name: 'Unknown',
    forwardCompatibility: [],
  },
  unlicensed: {
    id: 'unlicensed',
    name: 'Unlicensed',
    forwardCompatibility: [],
  },
};
