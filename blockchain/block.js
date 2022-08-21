const { GENESIS_BLOCK } = require('../config');

const Utils = require('../utils');

class Block {
    constructor ({ height, version, timestamp, lastHash, hash, difficulty, bits, nonce, merkleRoot, data }) {
        this.height = height;
        this.version = version;
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.difficulty = difficulty;
        this.bits = bits;
        this.nonce = nonce;
        this.merkleRoot = merkleRoot;
        this.data = data;
    }

    toString() {
        return `Block(${this.height}) hash: ${this.hash}`;
    }

    static genesisBlock() {
        return new this(GENESIS_BLOCK);
    }

    static async mineBlockASYNC({ lastBlock, startNonce, stopNonce, data }) {
        const height = lastBlock.height+1;
        const version = lastBlock.version;
        const lastHash = lastBlock.hash;
        const difficulty = lastBlock.difficulty;
        const bits = lastBlock.bits;
        const target = Utils.bitsToTarget(bits);

        const merkleRoot = Utils.hashData(JSON.stringify(data));

        for (let i=startNonce; i<stopNonce; i++) {
            console.log(i);
            const nonce = i;
            const hash = Utils.hash({ height, version, lastHash, difficulty, bits, nonce, merkleRoot, data });
            if (Utils.isHashLower(target, hash)) {
                console.log(`found`);
                const timestamp = Date.now();
                const block = new this({ height, version, timestamp, lastHash, hash, difficulty, bits, nonce, merkleRoot, data });
                return block;
            }
        }
    }
}

module.exports = Block;