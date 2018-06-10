require('pg').defaults.ssl = true

const { Client } = require('pg')
import { Config } from '../config';

let activeClient = null;

export async function DB() {


    if (!activeClient) {
        const connectionObj = (Config.db.url) ? Config.db.url : Config.db;
        const client = new Client(connectionObj);
        await client.connect()
        activeClient = client;

    }
    return activeClient;



}