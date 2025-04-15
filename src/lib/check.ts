import path from 'path';
import colors from 'colors/safe';
import { getPackageLicense } from './get-package-license';
import { getLicenseType } from './get-license-type';
import os from 'os';
import { findPackageJsons } from './find-all-packages';
import { buildOutput } from './build-output';
import { PackageInfo } from './types/package-info';
import { getPackageCompatibilities } from './get-package-compatibilities';

export async function check(packageJsonPath: string, modulesPath: string) {
  const pkg: any = require(packageJsonPath);
  const resolvedPackagePath: string = path.resolve(packageJsonPath);
  const resolvedModulesPath: string = path.resolve(modulesPath);
  const pkgLicense = getPackageLicense(pkg);
  const pkgLicenseType = getLicenseType(pkgLicense);
  const packages = await findPackageJsons(modulesPath);

  if (packages.length === 0) {
    const output: any[] = [];
    output.push(colors.red('No packages found in node_modules'));
    return {
      passed: true,
      output: output.join(os.EOL),
      compatiblePackages: [],
      incompatiblePackages: [],
    };
  }

  const [compatiblePackages, incompatiblePackages] = getPackageCompatibilities(packages, pkgLicenseType);

  const packageInfo: PackageInfo = {
    name: pkg.name || 'Unnamed',
    version: pkg.version || 'Unversioned',
    license: pkgLicense,
    licenseInfo: pkgLicenseType,
    resolvedModulesPath,
    resolvedPackagePath,
  };

  const output = buildOutput(packageInfo, compatiblePackages, incompatiblePackages);
  return {
    passed: incompatiblePackages.length === 0,
    output: output,
    compatiblePackages: compatiblePackages,
    incompatiblePackages: incompatiblePackages,
  };
}
