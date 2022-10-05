const WebSocket = require('ws');

const { PEERS_LIST, SERVERP2P_PORT } = require('../config');

const Utils = require('../utils');
const NodePeer = require('../network/node-peer');

class Network {
    constructor (blockchain) {
        this.peers = [];
        this.blockchain = blockchain;
        this.server;
    }

    async initializeASYNC() {
        try {
            console.log(`[p2p] initialize p2p network ...`);

            this.server = new WebSocket.Server({ port: SERVERP2P_PORT });
            this.server.on('error', (err) => this.onSocketError(err));
            this.server.on('connection', (ws, request, client) => this.onSocketConnection(ws, request, client));

            console.log(`[p2p] network p2p initialized on port "${SERVERP2P_PORT}"`);
            return true;
        }
        catch (err) {
            console.log(`[p2p] (network.init) > fatal error :`, err);
            return false;
        }
    }

    async onSocketError(err) {
        console.log(`[p2p] (network.err) > an error as occured :`, err);
    }

    async onSocketConnection(ws, request) {
        console.log(`[p2p] (network.connection) > new peer "${Utils.formatedIp(request.socket.remoteAddress)}" as connected`);
    }

    async connectPeer(ws, host) {
        this.peers.push(new NodePeer(ws, host));
    }

    async connectToPeers() {
        console.log(PEERS_LIST.length, PEERS_LIST);
        PEERS_LIST.forEach(host => {
            console.log(`[p2p] connecting to peer "${host}" ...`);
            this.connectPeer(new WebSocket(`ws://${host}`, { timeout: 10000 }), host);
        });
    }
}

module.exports = Network;