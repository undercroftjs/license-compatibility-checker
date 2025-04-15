import colors from 'colors/safe';
import os from 'os';
import { LicenseTypes } from './data/license-types';
import { PackageInfo } from './types/package-info';
import { PackageCompatability } from './types/package-compatability';

const buildCheckingMessage = (pkg: PackageInfo) => {
  return colors.yellow(
    'Checking ' +
    colors.blue(pkg.license ?? colors.red('No license')) + ` (${pkg.licenseInfo.name}) of ` +
    pkg.name + '@' + pkg.version + os.EOL + 'in ' +
    colors.blue(pkg.resolvedPackagePath) + os.EOL + 'against ' +
    colors.blue(pkg.resolvedModulesPath) + ':',
  );
};

const buildCompatibleMessage = (pkg: PackageCompatability) => {
  return `${pkg.name}@${pkg.version} ` +
    colors.green(pkg.license) + ' ' +
    colors.yellow(`(${pkg.licenseType})`);
};

const buildIncompatibleMessage = (incompatiblePackage: PackageCompatability, checkingPackage: PackageInfo) => {
  return `${incompatiblePackage.name}@${incompatiblePackage.version} ` +
    colors.red(incompatiblePackage.license ?? colors.red('No license')) + ' ' +
    colors.yellow(`(${incompatiblePackage.license}) - ` + colors.red('possibly incompatible') + ' with ') +
    colors.blue(checkingPackage.license ?? colors.red('No license')) + ` (${checkingPackage.licenseInfo.name})`;
};

const buildForwardCompatibilityMessage = (incompatiblePackage: PackageCompatability, checkingPackage: PackageInfo) => {
  const pkgCompatibilityString = incompatiblePackage.licenseType === LicenseTypes.unknown.name || incompatiblePackage.licenseType === LicenseTypes.unlicensed.name
    ? 'possibly incompatible'
    : 'incompatible';
  return `${incompatiblePackage.name}@${incompatiblePackage.version} ` +
    colors.red(incompatiblePackage.license ?? colors.red('No license')) + ' ' +
    colors.yellow(`(${incompatiblePackage.license}) - ` + colors.red(pkgCompatibilityString) + ' with ') +
    colors.blue(checkingPackage.license || colors.red('No license')) + ` (${checkingPackage.licenseInfo.name})`;
};

export function buildOutput(pkg: PackageInfo, compatiblePackages: any[], incompatiblePackages: any[]): string {
  const output: any[] = [];
  output.push(buildCheckingMessage(pkg));
  if (compatiblePackages.length > 0) {
    compatiblePackages.forEach((pkg) =>
      output.push(buildCompatibleMessage(pkg)));
  }

  if (incompatiblePackages.length == 0) {
    return output.join(os.EOL);
  }

  const unknown = incompatiblePackages.filter((pkg) => pkg.reason === 'unknown');
  if (unknown.length > 0) {
    unknown.forEach((incompatiblePackage) =>
      output.push(buildIncompatibleMessage(incompatiblePackage, pkg)));
  }

  const forwardCompatibility = incompatiblePackages.filter((pkg) => pkg.reason === 'forwardCompatibility');
  if (forwardCompatibility.length > 0) {
    output.push(colors.red('Possible forward compatibility issues:'));
    forwardCompatibility.forEach((incompatiblePackage) =>
      output.push(buildForwardCompatibilityMessage(incompatiblePackage, pkg)));
  }

  return output.join(os.EOL);
}
