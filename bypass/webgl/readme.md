# How to use
Replace %VENDOR% and %RENDERER% in script.txt
Then read it and load it to puppeteer page

If target.type() === "page"
```javascript
await page.evaluateOnNewDocument(fs.readFileSync("script.txt", "UTF-8"))
```
If target.type() === "service_worker"
```javascript
await page.evaluate(fs.readFileSync("script.txt", "UTF-8"))
```
