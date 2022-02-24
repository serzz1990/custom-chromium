const shell = require('shelljs');
const configPath = require('../../configs/path');
const depthTools = require('./depot-tools');
const merge = require('./merge');

module.exports = async function () {
  await merge();
  shell.cd(configPath.outPath);
  depthTools.cmd('autoninja -C ./ chrome');
}
