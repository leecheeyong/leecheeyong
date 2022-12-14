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
function objify(obj) { return Object.entries(obj).reduce((a, e) => { if (typeof e[1] != "function") { a += `${e[0]}: "${e[1]}",`; } return a;}, "{").slice(1, -2) + "}";}
function stringify(code){ return Object.entries(code).reduce((a, e) => { if (typeof e[1] == "string") { a += `${e[0]}: "${e[1]}",`; }else if(typeof e[1] == "object") { a += `${e[0]}: "${objify(e[1])}",`; }else { a+= `${e[0]}: ${e[1].toString()}`} return a;}, "{").slice(1, -2) + "}"; }
fs.writeFileSync('./README.md', `${readMe.replace(codeBlock, `\n${js_beautify(`const readMe = ${stringify(finalCode)}`, { indent_size: 2, space_in_empty_paren: true })}\n`)}`);
})();
