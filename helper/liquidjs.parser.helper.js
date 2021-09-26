const {Liquid} = require('liquidjs')

const liquidEngine = new Liquid()

async function parseHtml({html, inputJson}) {
    try {
        return await liquidEngine.parseAndRender(html, inputJson);
    } catch (err) {
        console.error("Error:parseHtml", err)
        throw "Error in parse string"
    }
}

module.exports = {
    parseHtml
}
