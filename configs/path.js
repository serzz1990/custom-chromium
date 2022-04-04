const path = require('path');

const rootPath = path.join(__dirname, '../');
const buildPath = path.join(rootPath, '/_build');
const chromiumPath = path.join(rootPath, '/chromium');
const updatesPath = path.join(rootPath, '/updates');
const outPath = path.join(buildPath, 'src/out/Default');
const depotToolsPath = path.join(rootPath, '/depot_tools');
const distPath = path.join(rootPath, '/dist');

module.exports = {
  rootPath,
  buildPath,
  chromiumPath,
  depotToolsPath,
  outPath,
  updatesPath,
  distPath
}
