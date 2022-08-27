const express = require('express');

const { SERVERAPI_PORT } = require('../config');

const Block = require('../blockchain/block');

class ServerAPI {
    constructor (blockchain, network) {
        this.blockchain = blockchain;
        this.network = network;
        this.server = express();
        this.server.get('/', (req, res) => this.onServerGetHome(req, res));
        this.server.get('/block', (req, res) => this.onServerGetBlock(req, res));
        this.server.get('/mine', (req, res) => this.onServerMine(req, res));
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

    async onServerGetBlock(req, res) {
        const block = await this.blockchain.getLastBlockASYNC();
        res.json(block);
    }

    async onServerMine(req, res) {
        console.log(`[api] (api.index.mine) mining new block ...`);

        const lastBlock = await this.blockchain.getLastBlockASYNC();
        const minedBlock = await Block.mineBlockASYNC({ lastBlock, startNonce: 0, stopNonce: 1000000, data: [] });

        await this.blockchain.addBlockASYNC(minedBlock);

        if (minedBlock == Block) {
            console.log(`[api] new block found !!`, minedBlock.toString());
        }

        res.send(`${JSON.stringify(minedBlock)}`,);
    }
}

module.exports = ServerAPI;