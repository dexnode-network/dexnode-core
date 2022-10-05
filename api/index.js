const express = require('express');

const { SERVERAPI_PORT } = require('../config');

const Block = require('../blockchain/block');
let mine = false;

class ServerAPI {
    constructor (blockchain, network) {
        this.blockchain = blockchain;
        this.network = network;
        this.server = express();
        this.server.get('/', (req, res) => this.onServerGetHome(req, res));
        this.server.get('/api/block', (req, res) => this.onServerGetBlock(req, res));
        this.server.get('/api/mine', (req, res) => this.onServerMine(req, res));
    }

    async mineBlocks() {
        if (mine == true)
            return;

        for (let i=0; i<100; i++) {
            const lastBlock = await this.blockchain.getLastBlockASYNC();
            const minedBlock = await Block.mineBlockASYNC({ lastBlock, startNonce: 0, stopNonce: 1000000, data: [] });
            if (minedBlock.height == lastBlock.height+1) {
                await this.blockchain.addBlockASYNC(minedBlock);
                console.log(`[api] block #`, minedBlock.height, `mined, added to chain !`, minedBlock.hash, minedBlock.nonce);
            }
            else {
                console.log(`[api] (mineBlocks) > no block found, or invalid`);
                break;
            }
        }

        console.log(`[api] mining process terminated !`);
        mine = false;
    }

    async initializeASYNC() {
        try {
            console.log(`[api] initialize api server ...`);

            this.server.listen(SERVERAPI_PORT);
            console.log(`[api] api server initialized on port "${SERVERAPI_PORT}" >> http://localhost:${SERVERAPI_PORT}/`);

            this.network.connectToPeers();
        }
        catch (err) {
            console.log(`[api] (api.index.initialize) >`, err);
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
        if (mine == false) {
            this.mineBlocks();
            console.log(`[api] (api.index.mine) mine 100 blocks`);
            res.send(`mining 100 blocks, accepted !`,);
        }
        else {
            console.log(`[api] (api.index.mine) already running`);
            res.send(`mining 100 block, already running !`,);
        }
    }
}

module.exports = ServerAPI;