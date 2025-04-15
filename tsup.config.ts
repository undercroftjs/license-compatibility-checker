import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/lib/index.ts'],
    outDir: 'dist/lib',
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    minify: true,
  },
  {
    entry: ['src/bin/cli.ts'],
    outDir: 'dist/bin',
    format: ['cjs'],
    sourcemap: true,
    clean: false, // Don't clear after lib build
    // banner: {
    //   js: '#!/usr/bin/env node',
    // },
  }
]);
