const axios = require('axios');
const substrings = require('substrings');
const fs = require('fs');
const dayjs = require('dayjs');
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const js_beautify = require("js-beautify").js;

const readMe = fs.readFileSync('./README.md', 'utf-8');
const codeBlock = substrings.getOne('```js', '```', readMe);

dayjs.extend(timezone);
dayjs.extend(utc);

var edited;
(async () => {
const status = (await axios.get(`https://garden.is-a.dev/v2/discordstatus/785783071244025867`).catch(e => console.log(e))).data;
const activity = (await axios.get(`https://garden.is-a.dev/v2/discordactivity/785783071244025867`).catch(e => console.log(e))).data;
const { location, followers } = (await axios.get(`https://api.github.com/users/leecheeyong`).catch(e => console.log(e))).data;
const { stargazers_count } = (await axios.get(`https://api.github.com/repos/leecheeyong/leecheeyong`).catch(e => console.log(e))).data;
const finalCode = eval(`function edit() { \n${codeBlock}\n readMe.status = "${status.message} - ${activity.message}"; readMe.location = "${location}"; readMe.stats = () => { return "${followers} followers with ${stargazers_count} stars on this repository on ${dayjs().tz("Asia/Taipei").format("DD/MM/YY")}" };  return readMe }; edit()`);
function objify(obj) { return Object.entries(obj).reduce((a, e) => {if (typeof e[1] != "function") {a += `${e[0]}: "${e[1]}", `;} return a;}, "`{").slice(1, -2) + "}";}
function str(obj) {return Object.entries(obj)  .reduce((a, e) => {if(Array.isArray(e[1])) { a += `${e[0]}: ${JSON.stringify(e[1])}, `;}else  if(typeof e[1] == "object") {a += `${e[0]}: ${objify(e[1])}, `; }  else if (typeof e[1] == "function") {a += `${e[0]}: ${e[1].toString()}, `;}else {a += `${e[0]}: "${e[1]}", `;}return a;}, "`{").slice(1, -2) + "}";}
fs.writeFileSync('./README.md', `${readMe.replace(codeBlock, `\n${js_beautify(`const readMe = ${str(finalCode)}`, { indent_size: 2, space_in_empty_paren: true })}\n`)}`);
})();
