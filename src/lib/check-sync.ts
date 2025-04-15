import { check } from './check';

export function checkSync(packageJsonPath: string, modulesPath: string) {
  const onCheckResult = (err: any, passed: any, output: any): any => {
    return {
      err: err,
      passed: passed,
      output: output,
    };
  };
  check(packageJsonPath, modulesPath)
    .then((result) => {
      onCheckResult(null, result.passed, result.output);
    })
    .catch((err) => {
      onCheckResult(err, false, err);
    });
  return onCheckResult;
}
