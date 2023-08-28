const fetch = require('node-fetch');
const express = require('express');
const spotify = require('spotify-url-info')(fetch);
const app = express();


app.get("/", (req,res) => res.send("Hello World"))

app.get("/artist/:id", async (req,res) => {
  res.send(spotify.getData(req.params.id);
})

app.listen(process.env.PORT || 3000)
