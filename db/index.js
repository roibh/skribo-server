"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
require('pg').defaults.ssl = config_1.Config.db.ssl;
const pg_1 = require("pg");
let activeClient = null;
class SkriboDB {
    constructor(client) {
        this._client = client;
    }
    query(query, args, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultObject = yield this._client.query(query, args);
            //console.log('>>>>>>>>', JSON.stringify(resultObject));
            if (!resultObject.rows) {
                return resultObject;
            }
            if (resultType === 0 /* Single */) {
                return resultObject.rows[0];
            }
            else {
                return resultObject.rows;
            }
        });
    }
    hashCode(str) {
        var hash = 0;
        if (str.length == 0)
            return hash;
        for (let i = 0; i < str.length; i++) {
            let char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
    createTable(schema, name, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            let seqQuery = `CREATE SEQUENCE public."${name}_ID_seq";
        ALTER SEQUENCE public."results_ID_seq"
            OWNER TO postgres;`;
            let query = 'CREATE TABLE ' + schema + '."' + name + '" ( \n' +
                fields.map(element => {
                    const elementDBtype = this.getDbType(element.type);
                    return ` "${element.name}" ${elementDBtype} ,`;
                }).join('\n') +
                '"ID" integer NOT NULL DEFAULT nextval(\'"' + name + '_ID_seq"\'::regclass), \n' +
                ' CONSTRAINT "' + name + '_pkey" PRIMARY KEY("ID") \n' +
                ') WITH(OIDS = FALSE) TABLESPACE pg_default; \n' +
                'ALTER TABLE ' + schema + '."' + name + '"  \nOWNER to postgres;';
            try {
                const seqResultObject = yield this._client.query(seqQuery, []);
            }
            catch (error) {
                console.warn(error);
            }
            try {
                const resultObject = yield this._client.query(query, []);
                return resultObject;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    getDbType(strType) {
        switch (strType) {
            case 'string':
                return 'text COLLATE pg_catalog."default"';
            case 'array':
                return 'text[] COLLATE pg_catalog."default"';
            case 'number':
                return 'bigint';
            default:
                return strType;
        }
    }
}
exports.SkriboDB = SkriboDB;
function DB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!activeClient) {
            const connectionObj = (config_1.Config.db.url) ? config_1.Config.db.url : config_1.Config.db;
            const client = new pg_1.Client(connectionObj);
            yield client.connect();
            activeClient = new SkriboDB(client);
        }
        return activeClient;
    });
}
exports.DB = DB;
//# sourceMappingURL=index.js.map