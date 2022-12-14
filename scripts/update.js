const axios = require('axios');
const substrings = require('substrings');
const fs = require('fs');

const readMe = fs.readFileSync('./README.md', 'utf-8');
const codeBlock = substrings.getOne('```', '```', readMe);

var edited;
(async () => {
const status = (await axios.get(`https://garden.is-a.dev/v2/discordstatus/785783071244025867`).catch(e => console.log(e))).data;
const activity = (await axios.get(`https://garden.is-a.dev/v2/discordactivity/785783071244025867`).catch(e => console.log(e))).data;
const finalCode = eval(`function edit() { \n${codeBlock}\n readMe.status = "${status}"; readMe.activity = "${activity}"; return readMe }; edit()`);
fs.writeFileSync('./README.md', `${readMe.replace(codeBlock, `const readMe = ${finalCode}`)}`);
})();
