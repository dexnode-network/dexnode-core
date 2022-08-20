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

    async mineBlock({ lastBlock, startNonce, stopNonce, data }) {
        return '';
    }
}

module.exports = Block;