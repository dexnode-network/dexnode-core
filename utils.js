const SHA256 = require('crypto-js/sha256');

class Utils {
    static hash({height, version, lastHash, difficulty, bits, nonce, merkleRoot, data}) {
        return SHA256(`${height}${version}${lastHash}${difficulty}${bits}${nonce}${merkleRoot}${data}`, 'hex').toString();
    }

    static hashData(data) {
        return SHA256(data,'hex').toString();
    }

    static hashBlock(block) {
        const { height, version, lastHash, difficulty, bits, nonce, merkleRoot, data } = block;
        return this.hash({ height, version, lastHash, difficulty, bits, nonce, merkleRoot, data });
    }

    static bitsToDecimal(bits) {
        return parseInt('0x' + bits, '16');
    }

    static bitsToTarget(bits) {
        const nBits = this.bitsToDecimal(bits);
        const exponent = nBits >> 24;
        const mantissa = nBits & 0xFFFFFF;
        const target = (mantissa * (2 ** (8 * (exponent - 3)))).toString('16');
        const targetBuffer = Buffer.from('0'.repeat(64 - target.length) + target, 'hex');
        return targetBuffer.toString('hex');
    }

    static isHashLower(target, hash) {
        const targetBuffer = Buffer.from(target, 'hex');
        const hashBuffer = Buffer.from(hash, 'hex');
        return Buffer.compare(targetBuffer, hashBuffer) > 0;
    }

    static formatedIp(ip) {
        return ip.replace(/^.*:/, '');
    }
}

module.exports = Utils;