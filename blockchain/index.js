const db = require('lmdb');

const { DB_PATH } = require('../config');

const Block = require('./block');

class Blockchain {
    constructor () {
        this.chain;
    }

    async initializeASYNC() {
        console.log(`[sys] initialize blockchain database ...`);
        this.chain = db.open(DB_PATH, { create: true });

        if (await this.getChainHeightASYNC() <= 0)
            await this.addBlockASYNC(Block.genesisBlock());

        console.log(`[sys] blockchain database current height #`, await this.getChainHeightASYNC());

        // #TODO verify blockchain database integrity

        console.log(`[sys] blockchain initialized, chain accepted !`);
    }

    async addBlockASYNC(block) {
        return await this.chain.put(block.height, JSON.stringify(block));
    }

    async getChainHeightASYNC() {
        return this.chain.getCount()-1;
    }

    async getLastBlockASYNC() {
        return new Block(JSON.parse(this.chain.get(this.chain.getCount()-1)));
    }

    async getBlockFromHeight(height) {
        return new Block(JSON.parse(this.chain.get(height)));
    }

    async getBlockFromHash(hash) {
        //
    }
}

module.exports = Blockchain;