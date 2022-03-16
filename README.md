This is an open source custom chrome project.
The goal of the project is to completely fake the fingerprint of any device without leaving any traces.

## Setup
[MacOS](https://github.com/serzz1990/custom-chromium/blob/main/docs/setup/macos.md)

## Development
[MacOS](https://github.com/serzz1990/custom-chromium/blob/main/docs/development/macos.md)

## Project tree
    📦custom-chromium
    ┣ 📂build (files for build)
    ┣ 📂builder (scripts for build)
    ┣ 📂chromium (original chromium)
    ┣ 📂configs (configs for build)
    ┃ ┗ 📂devices (device descriptors)
    ┣ 📂depot_tools (utils for build chromium)
    ┣ 📂docs (documentation)
    ┣ 📂dist (distribution kit)
    ┗ 📂updates (changes made to chromium assembly)

## How does it work?

  soon

## Links 

* [Telegram chat](https://t.me/cchromium)
* [pixelscan](https://pixelscan.net/)
* [creepjs](https://abrahamjuliot.github.io/creepjs/)
* [best practice for patching chrome](https://github.com/Eloston/ungoogled-chromium/tree/master/patches/extra)
* [best practice for patching chrome 2](https://github.com/brave/brave-browser/wiki/Patching-Chromium)


## TODO LIST ✓
  - [x] create one json with all params
  - [ ] change patching chrome
  - [ ] [media.codecs](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth/evasions/media.codecs)
  - [ ] [navigator.languages](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth/evasions/navigator.languages)
  - [ ] [navigator.permissions](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth/evasions/navigator.permissions)
  - [ ] [navigator.plugins](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth/evasions/navigator.plugins)
  - [x] [navigator.vendor](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth/evasions/navigator.vendor)
  - [ ] [webgl.vendor](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth/evasions/webgl.vendor)
  - [ ] [window.outerdimensions](https://github.com/berstend/puppeteer-extra/blob/master/packages/puppeteer-extra-plugin-stealth/evasions/window.outerdimensions)
  - [ ] matchMedia
  - [ ] fonts
  - [ ] WebRTC
  - [ ] css computed style colors / fonts
  - [ ] keyboard
  - [ ] mimeTypes
  - [ ] audio
  - [ ] emoji
  - [ ] [chrome.app](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth/evasions/chrome.app)
  - [ ] [chrome.csi](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth/evasions/chrome.csi)
  - [ ] [chrome.runtime](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth/evasions/chrome.runtime)
  - [ ] [iframe.contentWindow](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow)
  - [ ] [navigator.webdriver](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth/evasions/navigator.webdriver)
  - [ ] collect device descriptor
