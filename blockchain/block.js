class Block {
    constructor ({ height, ver, time, lastHash, hash, diff, bits, size, n_tx, merkleRoot, nonce, tx }) {
        this.height = height;
        this.ver = ver;
        this.time = time;
        this.lastHash = lastHash;
        this.hash = hash;
        this.diff = diff;
        this.bits = bits;
        this.size = size;
        this.n_tx = n_tx;
        this.merkleRoot = merkleRoot;
        this.nonce = nonce;
        this.tx = tx;
    }

    static genesisBlock() {
        return new this({
            height: 0,
            ver: 1,
            time: 0,
            lasthash: 'The time FED get DECENTRALIZE 2022/08/15',
            hash: 'genesis-hash',
            diff: 1,
            bits: '1d00ffff',
            size: 255,
            n_tx: 0,
            merkle_root: 'merkle-hash',
            nonce: 1,
            tx: ['0','1']
        });
    }
}

module.exports = Block;