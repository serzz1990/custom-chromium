const fs = require('fs');
const cliProgress = require('cli-progress');
const path = require('path');

module.exports = {
  forEachFiles,
  copy
};

async function forEachFiles (src, options) {
  const _options = Object.assign({
    onPath: async () => {}
  }, options);
  const stat =  await fs.promises.stat(src);
  const isDirectory = stat.isDirectory();
  const paths = [];
  await _options.onPath(src, stat);

  if (isDirectory) {
    const files = await fs.promises.readdir(src);
    await Promise.all(
      files.map(async (file) => {
        const curSource = path.join(src, file);
        const curStat = await fs.promises.stat(curSource);
        paths.push({ path: curSource, stat: curStat });
      })
    );
    paths.sort((a, b) => (a.stat.isDirectory() ? 1 : -1));
    await Promise.all(
      paths.map(async (item) => {
        if (item.stat.isDirectory()) {
          await forEachFiles(item.path, _options);
        } else {
          await _options.onPath(item.path, stat);
        }
      })
    );
  }
}

async function copy(src, dest, options) {
  const _options = Object.assign({
    progress: true,
    insert: false,
    skipErrors: true,
    onPath: () => {}
  }, options);
  const bar = _options.progress ? new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic) : null;
  let sizeSrc = 0;
  let totalCopedSize = 0;

  await forEachFiles(src, { onPath: async (itemSrc, stat) => {
      sizeSrc += stat.size
  }});

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  bar && bar.start(sizeSrc, 0);

  await forEachFiles(src, { onPath: async (itemSrc, stat) => {
      totalCopedSize += stat.size;
      bar && bar.update(totalCopedSize);
      try {
        const target = itemSrc.replace(src, dest);
        await _options.onPath(itemSrc, stat);
        await fs.promises.cp(itemSrc, target, { recursive: true });
      } catch (e) {
        if (!_options.skipErrors) {
          throw Error(e);
        } else {
          console.log('Fail copy', e.code, e.info);
        }
      }
  }});

  bar && bar.stop();
}

