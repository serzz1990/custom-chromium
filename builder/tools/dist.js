const fs = require('fs');
const path = require('path');
const configDist = require('../../configs/dist');
const configPath = require('../../configs/path');

module.exports = async function () {
  if (fs.existsSync(configPath.distPath)) {
    await fs.promises.rm(configPath.distPath, { recursive: true });
  }
  await fs.mkdirSync(configPath.distPath);
  await Promise.all(configDist.copy.map(async (filename) => {
    const srcPath = path.join(configPath.outPath, filename);
    const distPath = path.join(configPath.distPath, filename);
    const exists = fs.existsSync(srcPath);
    if (exists) {
      await fs.promises.cp(srcPath, distPath, { recursive: true });
    }
  }));
}


