const puppeteer = require('puppeteer');
const path = require('path');
const device = require('../../configs/devices/device.json');
const configPath = require('../../configs/path');
const configDist = require('../../configs/dist');

module.exports = async function () {
  const browser = await puppeteer.launch({
    executablePath: path.join(configPath.outPath, configDist.platforms[process.platform].executablePath),
    devtools: false,
    dumpio: true,
    headless: false,
    defaultViewport: null,
    args: [
      `--user-agent=${device.navigator.userAgent}`,
      `--custom-device-data=${JSON.stringify(device)}`
    ]
  });

  const page = await browser.newPage();
  await page.goto('https://abrahamjuliot.github.io/creepjs/');
}
