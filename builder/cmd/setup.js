const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const configPath = require('../../configs/path');

const steps = require('../utils/steps');
const build = require('../tools/build');
const depotTools = require('../tools/depot-tools');
const copy = require("../utils/copy");

(async () => {
  await steps([
    {
      name: 'Get depot tools',
      fn: depotTools.cloneRepo
    },
    {
      name: 'Get chromium',
      fn: () => {
        if (!fs.existsSync(configPath.chromiumPath)) {
          fs.mkdirSync(configPath.chromiumPath, { recursive: true });
          shell.cd(configPath.chromiumPath);
          // https://chromium.googlesource.com/chromium/src.git#:~:text=Chromium%20is%20an%20open%2Dsource,how%20to%20get%20the%20code.
          // shell.exec('git fetch https://chromium.googlesource.com/chromium/src.git +refs/tags/59.0.3071.115:chromium_59.0.3071.115 --depth 1');
          // depotTools.cmd('caffeinate fetch --no-history chromium');
          depotTools.cmd('caffeinate fetch chromium');
        }
      }
    },
    {
        name: 'Copy chromium',
        fn: async () => {
          await copy(configPath.chromiumPath + '/src', configPath.buildPath + '/src');
        }
    },
    {
      name: 'Generate ninja files',
      fn: async () => {
        if (!fs.existsSync(configPath.outPath)){
          fs.mkdirSync(configPath.outPath, { recursive: true });
        }
        shell.cd(configPath.outPath);
        depotTools.cmd('gn gen ./')
      }
    },
    {
      name: 'Setup Faster builds',
      fn: async () => {
        const argsFilePath = path.join(configPath.outPath, 'args.gn');
        fs.writeFileSync(argsFilePath, `is_debug = false
is_component_build = true
symbol_level = 0
                `);
      }
    },
    {
      name: 'Build cache',
      fn: build
    },
  ]);
})();
