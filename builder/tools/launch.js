const puppeteer = require('puppeteer');
const path = require('path');
const device = require('../../configs/devices/device.json');
const configPath = require('../../configs/path');
const configDist = require('../../configs/dist');

module.exports = async function () {
  const browser = await puppeteer.launch({
    executablePath: path.join(configPath.outPath, configDist.platforms[process.platform].executablePath),
    devtools: false,
    headless: false,
    defaultViewport: null,
    args: [
      `--user-agent=${device.userAgent}`,

      // Custom screen
      `--custom-screen-width=${device.screen.width}`,
      `--custom-screen-height=${device.screen.height}`,
      `--custom-screen-avail-width=${device.screen.availWidth}`,
      `--custom-screen-avail-height=${device.screen.availHeight}`,
      `--custom-screen-avail-top=${device.screen.availTop}`,
      `--custom-screen-avail-left=${device.screen.availLeft}`,
      `--custom-screen-color-depth=${device.screen.colorDepth}`,
      `--custom-screen-pixel-depth=${device.screen.pixelDepth}`,

      // Custom navigator
      `--custom-navigator-platform=${device.navigator.platform}`,
      `--custom-navigator-hardware-concurrency=${device.navigator.hardwareConcurrency}`,
      `--custom-navigator-device-memory=${device.navigator.deviceMemory}`,
    ]
  });

  const page = await browser.newPage();
  await page.goto('https://abrahamjuliot.github.io/creepjs/');
}