const fs = require('fs');
const getSizeCallback = require('get-folder-size');
const cliProgress = require('cli-progress');
const path = require("path");

module.exports = async function copyWithProgress(src, dest, options) {
  const _options = Object.assign({ progress: true, onCopy: () => {} }, options);
  let totalCopedSize = 0;

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const bar = _options.progress ? new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic) : null;
  const sizeSrc = await getSize(src);

  bar && bar.start(sizeSrc, 0);

  await copyFolderRecursiveSync(src, dest, {
    onCopy: (filepath, stat) => {
      totalCopedSize += stat.size;
      bar && bar.update(totalCopedSize);
      _options.onCopy(filepath, stat);
    }
  });

  bar && bar.update(sizeSrc);
  bar && bar.stop();
};



function copyFileSync(source, target, options) {
  const _options = Object.assign({ skipErrors: true }, options)
  try {
    let targetFile = target;
    if ( fs.existsSync( target ) ) {
      if ( fs.lstatSync( target ).isDirectory() ) {
        targetFile = path.join( target, path.basename( source ) );
      }
    }
    fs.cpSync(source, targetFile, { recursive: true });
  } catch (e) {
    if (!_options.skipErrors) {
      throw Error(e);
    } else {
      console.log('Fail copy', e.code, e.info);
    }
  }
}

function copyFolderRecursiveSync(source, target, options) {
  const _options = Object.assign({ insert: false, skipErrors: true, onCopy: () => {} }, options)
  let targetFolder = target;

  if (_options.insert) {
    targetFolder = path.join(target, path.basename(source));
  }

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  // Copy
  if ( fs.lstatSync( source ).isDirectory() ) {
    const files = fs.readdirSync( source );
    files.forEach( function ( file ) {
      let curSource = path.join( source, file );
      if ( fs.lstatSync( curSource ).isDirectory() ) {
        copyFolderRecursiveSync(curSource, targetFolder, { insert: true, onCopy: _options.onCopy });
        _options.onCopy(curSource, fs.lstatSync(curSource));
      } else {
        copyFileSync(curSource, targetFolder, { skipErrors: _options.skipErrors });
        _options.onCopy(curSource, fs.lstatSync(curSource));
      }
    });
  }
}

async function getSize(dir) {
  return new Promise((resolve, reject) => {
    getSizeCallback(dir, (err, size) => {
      if (err) {
        reject(err);
      }
      resolve(size);
    });
  });
}
