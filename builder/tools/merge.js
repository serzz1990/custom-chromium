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

module.exports = async function () {
  const originalFilesDir = path.join(configPath.chromiumPath, 'src')
  const modifyFilesDir = path.join(configPath.updatesPath, 'src')
  const buildFilesDir = path.join(configPath.buildPath, 'src')

  await dir.forEachFiles(modifyFilesDir, {
    onPath: async (modifyPath) => {
      const targetPath = modifyPath.replace(modifyFilesDir, buildFilesDir)
      const originalFilePath = modifyPath.replace(modifyFilesDir, originalFilesDir)
      const modifyPathStat = await fs.promises.stat(modifyPath)
      const isExistTargetPath = fs.existsSync(targetPath)
      const isExistOriginalPath = fs.existsSync(originalFilePath)
      const filename = path.basename(modifyPath)

      if (ignoreFiles.includes(filename)) {
        return;
      }

      if (modifyPathStat.isDirectory()) {
        return await fs.promises.mkdir(targetPath, { recursive: true })
      }

      if (!isExistOriginalPath) {
        await modifyFile(modifyPath, targetPath)
        // await fs.promises.cp(modifyPath, targetPath, { recursive: true })
        return;
      }

      if (!isExistTargetPath) {
        return;
      }

      const diffs = await findFilesDiff(originalFilePath, modifyPath)

      if (diffs) {
        console.log(colors.red(`Conflict in: ${modifyPath}`))
        console.log(colors.green(`> ${diffs.line}: ${diffs.lines[0]}`))
        console.log(colors.yellow(`> ${diffs.line}: ${diffs.lines[1]}`))
        throw Error
      } else {
        await modifyFile(modifyPath, targetPath)
        // await fs.promises.cp(modifyPath, targetPath, { recursive: true })
      }
    }
  })
}

async function findFilesDiff (originalFilePath, modifyFilePath) {
  const modifyFileContent = await fs.promises.readFile(modifyFilePath, 'utf8')
  const originalFileContent = await fs.promises.readFile(originalFilePath, 'utf8')
  const contentWithoutModify = modifyFileContent.replace(/\n?\/\/START-UPDATES(.+?)\n?\/\/END-UPDATES/gmis, '')
  if (contentWithoutModify !== originalFileContent) {
    return findStringDiff(originalFileContent, contentWithoutModify)
  } else {
    return null
  }
}

async function modifyFile (modifyFilePath, filePathTo) {
  const modifyFileContent = await fs.promises.readFile(modifyFilePath, 'utf8')
  const newFileContent = modifyFileContent
    .replace(/\n?\/\/START-UPDATES(.+)?/gmi, '')
    .replace(/\n?\/\/END-UPDATES(.+)?/gmi, '')
  await fs.promises.writeFile(filePathTo, newFileContent)
}

function findStringDiff(str1, str2) {
  const lines1 = str1.split(/\r?\n/)
  const lines2 = str2.split(/\r?\n/)
  const maxLinesCount = Math.max(lines1.length, lines2.length)
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
  return null
}

