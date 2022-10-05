const DB_PATH = process.env.DB_PATH || '/db';

const GENESIS_BLOCK = {
    height: 0,
    version: 1,
    timestamp: 1661236307396,
    lastHash: 'DEXNODE-NETWORK-2022-08-22',
    hash: 'ea2ee0552731c25e96629e462f1c3e1ac1a8a61c73df050b591d2d7133fbda6d',
    difficulty: 1,
    bits: '1effffff',
    nonce: 0,
    merkleRoot: 'merkle-hash',
    data: []
}

const SERVERP2P_PORT = process.env.SERVERP2P_PORT || 5000;

const SERVERAPI_PORT = process.env.SERVERAPI_PORT || 3000;

const PEERS_LIST = process.env.PEERS_LIST ? process.env.PEERS_LIST.split(','): [];

module.exports = {
    DB_PATH, GENESIS_BLOCK,
    
    SERVERP2P_PORT,
    
    SERVERAPI_PORT,

    PEERS_LIST
}