const tsConfig = require('./tsconfig.json');
const tsConfigPath = require('tsconfig-paths');

const { outDir, paths, baseUrl } = tsConfig.compilerOptions;

tsConfigPath.register({
  baseUrl: `${outDir}/${baseUrl}`,
  paths: paths
});
