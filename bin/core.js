const Blockchain = require('../blockchain');
const Network = require('../network');
const ServerAPI = require('../api');

const blockchain = new Blockchain();
const network = new Network(blockchain);
const apiserver = new ServerAPI(blockchain, network);

(async () => {

    try {
        await blockchain.initializeASYNC();
        await network.initializeASYNC();
        await apiserver.initializeASYNC();
    }
    catch (err) {
        console.log(`[sys] (bin.core.entry) fatal error >`, err);
    }
    finally {
        console.log(`[sys] all system up, ready for decentralize fed !`);
    }

})().catch(err => {

    console.log(`[sys] (bin.core.entry) fatal error >`, err);
    process.exit(1);

});