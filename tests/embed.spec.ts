import { AsyncTest, AsyncSetupFixture, Expect, Test, TestCase, TestFixture, Timeout, TeardownFixture, Teardown, AsyncTeardown, AsyncTeardownFixture, FocusTest, SetupFixture } from 'alsatian';

import * as Data from './data';
import { DataScripts } from './database';
import { Results } from '../controllers/results';
import { User } from '../controllers/user';
import { DB } from '../db';
import { Script } from 'vm';
import { Scripts, Embed, Serve } from '../controllers';
import { EmbedModel, ScriptModel } from '../models';
import { DBHandler } from '@methodus/data';

DBHandler.config = {
    connections: {
        'default': {
            server: 'mongodb://localhost:27017',
            db: 'test',
            poolSize: 10,
            ssl: false,
            exchanges: ['event-bus', 'cache-bus'],
            readPreference: 'primaryPreferred'
        }
    }

}

const enum Mutations {
    UID,
    COMPANY,
    ID,
    FILE_ID,
    CASE_ID
}

function mutate(source, mutation?: Mutations) {
    const obj = JSON.parse(JSON.stringify(source));
    switch (mutation) {
        case Mutations.UID:
            delete obj.uid;
            break;
        case Mutations.COMPANY:
            delete obj._company_id;
            delete obj.company_id;
            break;
        case Mutations.ID:
            obj.id = guid();
            break;
        case Mutations.FILE_ID:
            obj.file_id = guid();
            break;
        case Mutations.CASE_ID:
            obj.case_id = guid();
            break;
    }
    return obj;
}

function guid() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const user_id = '000000000000000000';
const group_id = '000000000000000000';
const script_id = '000000000000000000';
const embed_id = '000000000000000000';

@TestFixture('Test Embeds')
export class TestsOEmbeds {

 

    @AsyncTest('embed_create')
    @Timeout(10000)
    public async embed_create() {
        const embed: EmbedModel = new EmbedModel({
            GroupId: Data.User.GroupId, Name: 'Test embed', ScriptId: Data.User.ScriptId, Page: 'https://www.google.com', Variables: [
                {
                    type: 'number',
                    name: 'limit',
                    value: '5'
                },
                {
                    type: 'string',
                    name: 'keyValue',
                    value: 'a fancy key'
                }
            ]
        });

        const result: any = (await Embed.create(embed, Data.User.ScriptId, Data.User.GroupId)).result;
        Data.User.EmbedId = result.EmbedId;
        Expect(result).toBeDefined();


    }

    @AsyncTest('embed_update')
    @Timeout(10000)
    public async embed_update() {

        const embed: EmbedModel = new EmbedModel({
            Name: 'Test embed', ScriptId: Data.User.ScriptId, Page: 'https://www.google.com', Variables: [{
                type: 'number',
                name: 'limit',
                value: '5'
            },
            {
                type: 'string',
                name: 'keyValue',
                value: 'a fancy key'
            }]
        })
        const result = await Embed.update(embed, Data.User.ScriptId, Data.User.GroupId, Data.User.EmbedId);
        Expect(result).toBeDefined();


    }

    @AsyncTest('embed_list')
    @Timeout(10000)
    public async embed_list() {
        const result = await Embed.list(Data.User.ScriptId, Data.User.GroupId);
        Expect(result).toBeDefined();
    }






}





