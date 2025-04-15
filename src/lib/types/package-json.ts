export interface PackageJson {
  [key: string]: unknown;

  name?: string;
  version?: string;
  license?: string | { type: string; url: string };
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  bin?: string | Record<string, string>;
}
