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

    @AsyncTest('embed_get')
    @Timeout(10000)
    public async embed_get() {
        const result = await Embed.get(Data.User.ScriptId, Data.User.GroupId, Data.User.EmbedId);
        Expect(result).toBeDefined();
    }


    @AsyncTest('embed_delete')
    @Timeout(10000)
    public async embed_delete() {
        const result = await Embed.delete(Data.User.ScriptId, Data.User.GroupId, Data.User.EmbedId);
        Expect(result).toBeDefined();
    }

}





