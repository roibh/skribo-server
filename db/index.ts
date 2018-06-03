const { Client } = require('pg')
import { Config } from '../config';

let activeClient = null;

export async function DB() {

    console.log(Config);
    if (!activeClient) {
        const client = new Client(Config.db.url);
        await client.connect()
        activeClient = client;

    }
    return activeClient;



}