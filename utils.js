const SHA256 = require('crypto-js/sha256');

class Utils {
    constructor () {
        //
    }

    async hash({height, lastHash, merkleRoot, diff, bits, nonces}) {
        return SHA256(``, 'hex').toString();
    }

    async hashData(data) {
        //
    }

    async hashBlock(block) {
        //
    }
}

module.exports = Utils;