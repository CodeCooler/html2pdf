const {parseHtml} = require("./helper/liquidjs.parser.helper")
const path = require('path')
const puppeteer = require('puppeteer');
const {checkForFilePath, checkForValidJson} = require("./helper/html2pdf.process.helper");

async function convertPdf({htmlString, inputJson, filePath, fileName, externalCss, displayHeaderFooter, headerTemplate, footerTemplate}) {
    try {
        await checkForFilePath(filePath);
        await checkForValidJson(inputJson);
        const finalHtml = await parseHtml({inputJson, html: htmlString})
        // launch a new chrome instance
        const browser = await puppeteer.launch({
            headless: true,
        });
        // create a new page
        const page = await browser.newPage();
        await page.setContent(finalHtml, {
            waitUntil: 'domcontentloaded',
        });
        await page.setViewport({
            height: 900,
            width: 1440,
            deviceScaleFactor: 2,
        });
        const cssTag = [];
        if (externalCss) {
            cssTag.push('<style>');
            cssTag.push(externalCss);
            cssTag.push('</style>');
        }
        const css = cssTag.join('');

        const pdfOptions = {
            path: path.join(filePath, fileName),
            printBackground: true,
            displayHeaderFooter: true,
            margin: {
                bottom: '50px',
                right: '29px',
                top: 20,
            },
            format: 'A4',
        };
        if (displayHeaderFooter) {
            pdfOptions.headerTemplate = headerTemplate ? headerTemplate : "";
            pdfOptions.footerTemplate = `${css} ${footerTemplate ? footerTemplate : ''}`

        }
        await page.pdf(pdfOptions);
        await browser.close();
        return pdfOptions.path
    } catch (error) {
        console.error("Error:convertPdf", error)
        throw  "Error in convert pdf"
    }
}

module.exports = {
    convertPdf,
}

