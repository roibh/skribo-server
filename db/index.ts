import { Config } from '../config';
require('pg').defaults.ssl = Config.db.ssl;
import { Client } from 'pg';
let activeClient: SkriboDB = null;


export const enum ResultType {
    Single,
    Multi
}

export class SkriboDB {
    _client: Client;
    constructor(client: Client) {
        this._client = client;
    }

    public async query(query, args, resultType?: ResultType) {

        const resultObject = await this._client.query(query, args);
        //console.log('>>>>>>>>', JSON.stringify(resultObject));
        if (!resultObject.rows) {
            return resultObject;
        }
        if (resultType === ResultType.Single) {
            return resultObject.rows[0];
        } else {
            return resultObject.rows;
        }
    }
    public hashCode(str) {
        var hash = 0;
        if (str.length == 0) return hash;
        for (let i = 0; i < str.length; i++) {
            let char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }


    public async createTable(schema, name, fields) {



        let seqQuery = `CREATE SEQUENCE public."${name}_ID_seq";
        ALTER SEQUENCE public."${name}_ID_seq"
            OWNER TO postgres;`


        let query = 'CREATE TABLE ' + schema + '."' + name + '" ( \n' +
            fields.map(element => {
                const elementDBtype = this.getDbType(element.type)

                return ` "${element.name}" ${elementDBtype} ,`
            }).join('\n') +
            '"ID" integer NOT NULL DEFAULT nextval(\'"' + name + '_ID_seq"\'::regclass), \n' +
            ' CONSTRAINT "' + name + '_pkey" PRIMARY KEY("ID") \n' +
            ') WITH(OIDS = FALSE) TABLESPACE pg_default; \n' +
            'ALTER TABLE ' + schema + '."' + name + '"  \nOWNER to postgres;'


        try {
            const seqResultObject = await this._client.query(seqQuery, []);
        } catch (error) {
            console.warn(error);
        }
        try {
            const resultObject = await this._client.query(query, []);
            return resultObject
        } catch (error) {
            console.error(error);
        }

    }

    getDbType(strType) {
        switch (strType) {
            case 'string':
                return 'text COLLATE pg_catalog."default"';
            case 'array':
                return 'text[] COLLATE pg_catalog."default"';
            case 'number':
                return 'bigint'
            default:
                return strType;
        }
    }


}

export async function DB() {
    if (!activeClient) {
        const connectionObj = (Config.db.url) ? Config.db.url : Config.db;
        const client = new Client(connectionObj);

        await client.connect()
        activeClient = new SkriboDB(client);

    }
    return activeClient;
}