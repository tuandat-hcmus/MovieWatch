require('dotenv').config();
const mark = process.env.PORT.toString();
const fs = require('fs');
const path = require('path');

function Template() {
    this.engine = function (filePath, data, callback) {
        fs.readFile(filePath, (err, content) => {
            if (err) {
                return callback(err);
            }
            let rendered = renderHtml(content.toString(), data);
            return callback(null, rendered);
        })
    }
}
const prePath = path.join(__dirname, 'resources/views/partials');

function getBody(fileName) {
    return fs.readFileSync(path.join(prePath, fileName)).toString();
}

function renderHtml(content, data) {
    const regex = new RegExp(mark + '\{', 'g');
    let templateCode = content.replace(regex, '${');
    let lineArr = templateCode.split('\n');
    lineArr.forEach((line, index) => {
        if (/\$\{\+/.exec(line)) {
            const fileName = line.substring(line.search('{+') + 2, line.indexOf('}')).trim();
            line = getBody(fileName);
        }
        lineArr[index] = line;
    });
    templateCode = lineArr.join('\n').replace(regex, '${');
    lineArr = templateCode.split('\n');
    const output = [];
    let count = 0;
    lineArr.forEach(line => {
        line = line.replace(/\$\{\s*if/, 'if(')
            .replace(/\${\s*for/, 'for(');
        if (/for\(/.exec(line)) {
            line = line.replace(/\s+in\s+/, ' of ');
        }
        if (!/\$\{/.exec(line)) {
            line = line.replace(/\}/, '){');
        }
        line = line.replace(/\{else\)\{/, '} else {')
            .replace(/\{\\if\)\{/, '}')
            .replace(/\{\\for\)\{/, '}')
            .replace(/</, 'out.push(`<')
            .replace(/>\s*$/, '>`);');
        output.push(line);
    });
    const char = '\n';
    const func = new Function('data', `
    const out = [];
    ${output.join('\n')};
    return out.join("\\n")`);
    return func(data);
}
module.exports = new Template();

