const DB_PATH = process.env.DB_PATH || __dirname + '/blockchain';
const GENESIS_BLOCK = {
    height: -1,
    version: 1,
    timestamp: 1661010297806,
    lastHash: 'last-hash',
    hash: 'genesis-hash',
    difficulty: 1,
    bits: '1D00FFFF',
    nonce: 0,
    merkleRoot: '',
    data: []
}

const SERVERP2P_PORT = process.env.SERVERP2P_PORT || 5000;

const SERVERAPI_PORT = process.env.SERVERAPI_PORT || 3000;

module.exports = {
    DB_PATH, GENESIS_BLOCK,
    
    SERVERP2P_PORT,
    
    SERVERAPI_PORT
}