const fs = require("fs");

async function checkForFilePath(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error("Invalid file path....")
        throw  "InValid Pdf File path"
    }
}

async function checkForValidJson(json){
    try {
        JSON.parse(JSON.stringify(json));
    } catch (e) {
        throw "Invalid JSON data"
    }
    return true;
}

module.exports ={
    checkForFilePath,
    checkForValidJson
}
