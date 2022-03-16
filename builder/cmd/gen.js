const shell = require('shelljs');
const fs = require('fs');
const configPath = require('../../configs/path');

const depotTools = require('../tools/depot-tools');

if (!fs.existsSync(configPath.outPath)){
  fs.mkdirSync(configPath.outPath, { recursive: true });
}
shell.cd(configPath.outPath);
depotTools.cmd('gn gen ./')
