module.exports = {
  platforms: {
    darwin: {
      executablePath: 'Chromium.app/Contents/MacOS/Chromium',
      files: ['Chromium.app']
    }
  },
  copy: [
    // 'Chromium Framework.framework',
    // 'Chromium Helper.app',
    // 'Chromium Helper (Plugin).app',
    // 'Chromium Helper (Renderer).app',
  ]
};
