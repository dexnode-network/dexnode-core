const { SERVERP2P_PORT } = require('../config');

class Network {
    constructor () {
        this.server;
    }

    async initializeASYNC() {
        try {
            console.log(`[p2p] initialize p2p network ...`);
        }
        catch (err) {
            console.log(`[p2p] (network.index.initialize) >`, err);
        }
        finally {
            console.log(`[p2p] p2p network initialized >> "${SERVERP2P_PORT}"`)
        }
    }
}

module.exports = Network;