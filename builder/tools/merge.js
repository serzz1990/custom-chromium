const path = require('path');
const fs = require('fs');
const configPath = require('../../configs/path');
const colors = require('colors/safe');
const dir = require('../utils/dir');
const ignoreFiles = [
  '.DS_Store'
];

// module.exports = async function () {
//   await dir.copy(configPath.updatesPath, configPath.buildPath, {
//     // onPath: (filepath) => {
//     //   console.log(filepath)
//     // }
//   });
// }


//
module.exports = async function () {
  const srcPath = path.join(configPath.updatesPath, 'src');
  const buildPath = path.join(configPath.buildPath, 'src');
  let conflict = false;

  await dir.forEachFiles(srcPath, {
    onPath: async (itemSrc, itemStat) => {
      const sourcePath = itemSrc.replace(srcPath, srcPath);
      const targetItemPath = itemSrc.replace(srcPath, buildPath);
      const sourcePathStat = await fs.promises.stat(sourcePath);
      const existsTargetItemPath = fs.existsSync(targetItemPath);
      const filename = path.basename(sourcePath);
      if (ignoreFiles.includes(filename)) {
        return;
      }

      if (sourcePathStat.isDirectory()) {
        if (!existsTargetItemPath) {
          await fs.promises.mkdir(targetItemPath, { recursive: true });
        }
      } else {
        if (!existsTargetItemPath) {
          return;
        }
        // console.log(chromiumItemPath, ' => ' ,targetItemPath);
        const updatedFileContent = await fs.promises.readFile(itemSrc, 'utf8');
        const buildFileContent = await fs.promises.readFile(targetItemPath, 'utf8');
        const updatedFileContentWithoutUpdates = updatedFileContent.replace(/\/\/START-UPDATES(.+?)\/\/END-UPDATES\n?/gmis, '');
        const buildFileContentWithoutUpdates = buildFileContent.replace(/\/\/START-UPDATES(.+?)\/\/END-UPDATES\n?/gmis, '');
        if (updatedFileContentWithoutUpdates !== buildFileContentWithoutUpdates) {
          const difRes = findDiff(buildFileContentWithoutUpdates, updatedFileContentWithoutUpdates);
          console.log(colors.red(`Conflict in: ${targetItemPath}`));
          console.log(colors.green(`> ${difRes.line}: ${difRes.lines[0]}`));
          console.log(colors.yellow(`> ${difRes.line}: ${difRes.lines[1]}`));
          conflict = true;
        } else {
          await fs.promises.cp(itemSrc, targetItemPath, { recursive: true });
        }
      }
    }
  });
  if (conflict) {
    throw Error;
  }
}

function findDiff(str1, str2, maxLength = 50){
  const lines1 = str1.split(/\r?\n/);
  const lines2 = str2.split(/\r?\n/);
  const maxLinesCount = Math.max(lines1.length, lines2.length);
  for (let i = 0; i < maxLinesCount; i++) {
    if (lines1[i] !== lines2[i]) {
      return {
        line: i + 1,
        lines: [
          lines1[i],
          lines2[i]
        ]
      }
    }
  }
  return null;
}

