#!/usr/bin/env node

import path from 'path';
import updateNotifier from 'update-notifier';
import pkg from '../../package.json';
import lcc from '../lib';

console.log('\nThis is a CLI tool for checking license compatibility of Node.js modules.\n');
console.log('Forked from license-checker-cli at https://github.com/HansHammel.\n');

(async () => {
  if (!module.parent) {
    try {
      const arg1 = process.argv[2] || path.join(process.cwd(), 'package.json');
      const arg2 = process.argv[3] || path.join(process.cwd(), 'node_modules');
      const result = await lcc.check(arg1, arg2);

      console.log(result.output);
      updateNotifier({ pkg }).notify();

      if (!result.passed) {
        process.exit(1);
      }
    } catch (err) {
      console.error(err);
      updateNotifier({ pkg }).notify();
      process.exit(1);
    }
  } else {
    module.exports.check = lcc.check;
  }
})();

