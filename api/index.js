const express = require('express');

const { SERVERAPI_PORT } = require('../config');

class ServerAPI {
    constructor () {
        this.server = express();
        this.server.get('/', (req, res) => this.onServerGetHome(req, res));
    }

    async initializeASYNC() {
        try {
            console.log(`[api] initialize api server ...`);
            this.server.listen(SERVERAPI_PORT);
        }
        catch (err) {
            console.log(`[api] (api.index.initialize) >`, err);
        }
        finally {
            console.log(`[api] api server initialized on port "${SERVERAPI_PORT}" >> http://localhost:${SERVERAPI_PORT}/`);
        }
    }

    async onServerGetHome(req, res) {
        res.send('DEXNODE API 1.0');
    }
}

module.exports = ServerAPI;