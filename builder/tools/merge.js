const path = require('path');
const fs = require('fs');
const configPath = require('../../configs/path');
const dir = require('../utils/dir');
const safeMergeFiles = require('safe-merge-files');
module.exports = async function () {
  await dir.copy(configPath.updatesPath, configPath.buildPath, {
    // onPath: (filepath) => {
    //   console.log(filepath)
    // }
  });
}


//
// module.exports = async function () {
//   const srcPath = path.join(configPath.updatesPath, 'src');
//   const buildPath = path.join(configPath.buildPath, 'src');
//
//   await dir.forEachFiles(srcPath, {
//     onPath: async (itemSrc, itemStat) => {
//       const sourcePath = itemSrc.replace(srcPath, srcPath);
//       const targetItemPath = itemSrc.replace(srcPath, buildPath);
//       const sourcePathStat = await fs.promises.stat(sourcePath);
//       if (sourcePathStat.isDirectory()) {
//         if (!fs.existsSync(targetItemPath)) {
//           await fs.promises.mkdir(targetItemPath, { recursive: true });
//         }
//       } else {
//         // console.log(chromiumItemPath, ' => ' ,targetItemPath);
//         safeMergeFiles(itemSrc, targetItemPath, function(err, change) {
//           if(change === 0) console.log('No change', targetItemPath);
//           else if(change === 1) console.log('Modified', targetItemPath);
//           else console.log('Conflict', targetItemPath);
//           // if (change === -1) console.log('Conflict', targetItemPath);
//         });
//       }
//     }
//   });
// }
