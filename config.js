const DB_PATH = process.env.DB_PATH || __dirname + '/blockchain';

const SERVERP2P_PORT = process.env.SERVERP2P_PORT || 5000;
const SERVERAPI_PORT = process.env.SERVERAPI_PORT || 3000;

module.exports = {
    DB_PATH, SERVERP2P_PORT, SERVERAPI_PORT
}