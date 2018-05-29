const { Client } = require('pg')

let activeClient = null;

export async function DB() {


    if (!activeClient) {
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'skribo',
            password: '1234',
            port: 5432,
        });
        await client.connect()
        activeClient = client;

    }
    return activeClient;



}