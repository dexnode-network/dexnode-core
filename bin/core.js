const Blockchain = require('../blockchain');
const Network = require('../network');
const ServerAPI = require('../api');

const blockchain = new Blockchain();
const network = new Network(blockchain);
const apiserver = new ServerAPI(blockchain, network);

(async () => {

    try {
        const blockchainState = await blockchain.initializeASYNC();
        const networkState = await network.initializeASYNC();
        const apiserverState = await apiserver.initializeASYNC();
    }
    catch (err) {
        console.log(`[sys] (bin.core.entry) fatal error >`, err);
    }

})().catch(err => {

    console.log(`[sys] (bin.core.entry) fatal error >`, err);
    process.exit(1);

});