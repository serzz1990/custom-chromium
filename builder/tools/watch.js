const merge = require('../tools/merge');
const configPath = require('../../configs/path');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const depotTools = require('./depot-tools');
const build = require('./build');
const mirror = require('../utils/morror');

let building = false;
let nextBuild = false;
let timeoutId;

module.exports = async function () {
  await merge();

  // fs.watch(configPath.updatesPath, { recursive: true }, async (eventType, filename) => {
  //   clearTimeout(timeoutId);
  //   const isTemp = filename ? filename.search(/~$/) > -1 : true;
  //   if (!isTemp) {
  //     const srcPath = path.join(configPath.updatesPath, filename);
  //     const destPath = path.join(configPath.buildPath, filename);
  //     await mirror(srcPath, destPath, filename);
  //   }
  //   timeoutId = setTimeout(runbuild, 600);
  // });
}

async function runbuild () {
  if (building) {
    nextBuild = true;
  } else {
    building = true;
    try {
      await build();
    } finally {
      building = false;
      if (nextBuild) {
        nextBuild = false;
        clearTimeout(timeoutId);
        runbuild();
      }
    }
  }
}
