const fs = require("fs");

const readHTML = async(path) => {
    try {
        const html = await fs.readFile(path, { encoding: "utf8" });
        return html;
    } catch (error) {
        console.log(error);
        throw new Error("There was an error");
    }
};

module.exports = readHTML;