class NodePeer {
    constructor (ws, host) {
        this.sockid = null;
        this.host = host;

        this.socket = ws;
        this.socket.on('error', (err) => this.onSocketError(err));
        this.socket.on('open', () => this.onSocketOpen());
        this.socket.on('close', () => this.onSocketClose());
        this.socket.on('message', (message) => this.onSocketMessage(message));
    }

    async onSocketError(err) {
        console.log(err.code);
    }

    async onSocketOpen() {
        console.log(`onSocketOpen()`);
    }

    async onSocketClose() {
        console.log(`onSocketClose()`);
    }

    async onSocketMessage(message) {
        console.log(`onSocketMessage()`);
    }
}

module.exports = NodePeer;