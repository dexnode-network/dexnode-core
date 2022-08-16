const db = require('lmdb');

const { DB_PATH } = require('../config');

class Blockchain {
    constructor () {
        this.chain;
    }

    async initializeASYNC() {
        try {
            console.log(`[sys] initialize blockchain database ...`);
            this.chain = db.open(DB_PATH, { create: true });
        }
        catch (err) {
            console.log(`[sys] (blockchain.index.initialize) >`, err);
        }
        finally {
            console.log(`[sys] blockchain database initialized !`);
        }
    }
}

module.exports = Blockchain;