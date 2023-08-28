# Fetch Relay
Do a fetch request with random servers.

## By Using Fetch Relays 
> Depends on the server you're using

- Able to mask your IP Address 
- Able to mask your user agents
- Able to bypass rate limits (Do many requests at once)

## About This Project
- Able to choose a random server to make a request
- Uses axios
- Server addresses can be choosen for specific request

## Setup a relay server
Source code: [/relayServer](/relayServer/index.js)
- Try to use different service providers to host them
- They are **not** rate limited/protected from any kinds of attacks by other people out there
    - You **should** set an encryption/do a verification to make sure that every request is made by an authorized person
    
- API: `[POST] /` POST request to `/` endpoint with the body as the fetch query
    ```js
    fetch(`https://your-server.example`, {
      method:"POST",
      body: JSON.stringify({
        url: 'https://example.com'
      })
    }).then(r=>r.text()).then(r=>r)
    ```

## The usage of Fetch-Relay
```js
const { setRelays, fetch } = require('fetch-relay');
    
setRelays(['https://relay-server-1.example', 'https://relay-server-2.example', ...]);
    
fetch({ 
   url: 'https://example.com', // url to make request to with a relay server
   method: "POST", // method to be used
   data: { // data (parsed and stringify) by axios
       value: "TEST"
   }
}).then()

```
