import { AsyncTest, Expect, TestFixture, Timeout, TestCase } from 'alsatian';

import * as Data from './data';
import { Scripts, Embed, Serve } from '../controllers';
import { EmbedModel, ScriptModel } from '../models';
import { DBHandler } from '@methodus/data';

DBHandler.config = {
    connections: {
        default: {
            db: 'test',
            exchanges: ['event-bus', 'cache-bus'],
            poolSize: 10,
            readPreference: 'primaryPreferred',
            server: 'mongodb://localhost:27017',
            ssl: false,
        },
    },

};

@TestFixture('Test Embeds')
export class TestsOEmbeds {

    @AsyncTest('embed_create')
    @TestCase(Data.Embed)
    @TestCase(null)
    @Timeout(10000)
    public async embed_create(embedData) {
        const embed: EmbedModel = new EmbedModel(embedData);

        try {
            const result: any = (await Embed.create(embed, global.User.ScriptId, global.User.GroupId)).result;
            global.User.EmbedId = result.EmbedId;
            Expect(result).toBeDefined();
        } catch (ex) {
            Expect(embedData).toBe(null);
        }
    }

    @AsyncTest('embed_update')
    @TestCase(Data.Embed)
    @TestCase(null)
    @Timeout(10000)
    public async embed_update(embedData) {
        const embed: EmbedModel = new EmbedModel(embedData);
        try {
            const result = await Embed.update(embed, global.User.ScriptId, global.User.GroupId, global.User.EmbedId);
            Expect(result).toBeDefined();
        } catch (ex) {
            Expect(embedData).toBe(null);
        }
    }

    @AsyncTest('embed_list')
    @Timeout(10000)
    public async embed_list() {
        const result = await Embed.list(global.User.ScriptId, global.User.GroupId);
        Expect(result).toBeDefined();
    }

    @AsyncTest('embed_get')
    @Timeout(10000)
    public async embed_get() {
        const result = await Embed.get(global.User.ScriptId, global.User.GroupId, global.User.EmbedId);
        Expect(result).toBeDefined();
    }
}
