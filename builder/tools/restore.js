const shell = require('shelljs');
const path = require('path');
const fs = require('fs');
const configPath = require('../../configs/path');
const dir = require('../utils/dir');

module.exports = async function () {
  const srcPath = path.join(configPath.updatesPath, 'src');
  const chromiumPath = path.join(configPath.chromiumPath, 'src');
  const tempPath = path.join(configPath.rootPath, 'temp/src');
  const buildPath = path.join(configPath.buildPath, 'src');
  if (fs.existsSync(tempPath)) {
    await fs.promises.rm(tempPath, { recursive: true });
  }
  await fs.promises.mkdir(tempPath, { recursive: true });
  await dir.forEachFiles(srcPath, {
    onPath: async (itemSrc, itemStat) => {
      const chromiumItemPath = itemSrc.replace(srcPath, chromiumPath);
      const targetItemPath = itemSrc.replace(srcPath, tempPath);
      if (fs.existsSync(chromiumItemPath)) {
        const chromiumItemPathStat = await fs.promises.stat(chromiumItemPath);
        if (chromiumItemPathStat.isDirectory()) {
          if (!fs.existsSync(tempPath)) {
            await fs.promises.mkdir(targetItemPath, { recursive: true });
          }
        } else {
          // console.log(chromiumItemPath, ' => ' ,targetItemPath);
          await fs.promises.cp(chromiumItemPath, targetItemPath);
        }
      }
    }
  });
  await dir.copy(tempPath, buildPath);
  await fs.promises.rm(tempPath, { recursive: true });
}
