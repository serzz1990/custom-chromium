const shell = require('shelljs');
const colors = require("colors/safe");
const fs = require("fs");
const configPath = require("../../configs/path");
const depotToolsRepo = 'https://chromium.googlesource.com/chromium/tools/depot_tools.git';

module.exports = {
  cloneRepo: () => {
    if (!shell.which('git')) {
      console.log(colors.red.underline('Sorry, this script requires git'));
      shell.exit(1);
    }
    if (!fs.existsSync(configPath.depotToolsPath)){
      fs.mkdirSync(configPath.depotToolsPath, { recursive: true });
      shell.exec('git clone ' + depotToolsRepo);
    }
  },
  cmd: (cmd) => {
    return shell.exec(`export PATH="$PATH:${configPath.depotToolsPath}" && ${cmd}`);
  }
}
