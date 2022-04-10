# How to use
Replace %IP_ADDRESS% in script.js
Then read it and load it to puppeteer page

If target.type() === "page"
```javascript
await page.evaluateOnNewDocument(fs.readFileSync("script.js", "UTF-8"))
```
If target.type() === "service_worker"
```javascript
await page.evaluate(fs.readFileSync("script.js", "UTF-8"))
```
