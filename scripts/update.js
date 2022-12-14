const axios = require('axios');
const substrings = require('substrings');
const fs = require('fs');
const js_beautify = require("js-beautify").js;

const readMe = fs.readFileSync('./README.md', 'utf-8');
const codeBlock = substrings.getOne('```js', '```', readMe);

var edited;
(async () => {
const status = (await axios.get(`https://garden.is-a.dev/v2/discordstatus/785783071244025867`).catch(e => console.log(e))).data;
const activity = (await axios.get(`https://garden.is-a.dev/v2/discordactivity/785783071244025867`).catch(e => console.log(e))).data;
const finalCode = eval(`function edit() { \n${codeBlock}\n readMe.status = "${status.message}"; readMe.activity = "${activity.message}"; return readMe }; edit()`);
fs.writeFileSync('./README.md', `${readMe.replace(codeBlock, `\n${js_beautify(`const readMe = ${JSON.stringify(finalCode)}`, { indent_size: 2, space_in_empty_paren: true })}\n`)}`);
})();
