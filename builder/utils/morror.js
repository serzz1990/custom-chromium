const fs = require('fs');

module.exports = async function (srcPath, destPath) {
  const srcPathExists = fs.existsSync(srcPath);
  if (!srcPathExists) {
    await rm(destPath);
  } else {
    await fs.promises.cp(srcPath, destPath, { recursive: true });
  }
}

async function rm (_path) {
  const exists = fs.existsSync(_path);
  if (exists) {
    const stat = await fs.promises.stat(_path);
    const isDir = stat.isDirectory();
    if (isDir) {
      await fs.promises.rmdir(_path, { recursive: true });
    } else {
      await fs.promises.unlink(_path);
    }
  }
}
