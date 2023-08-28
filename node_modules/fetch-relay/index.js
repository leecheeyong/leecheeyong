const axios = require('axios');

module.exports =  {
     servers: [],
     fetch: async (data, serverURI) => {
        if(!serverURI) serverURI = this.servers[Math.floor(Math.random() * this.servers.length)];
        if (!data?.url) new Error('URL is required');
        var response = (await axios({
            url: serverURI,
            data,
            method: 'POST'
        }));
        response.relayServer = serverURI;
        return response;
    },

    setRelays: (array) => {   
        if(!Array.isArray(array)) throw new Error(`setRelays expects an array, got ${typeof array}`);
        this.servers = array;
        return this;
    }
}


