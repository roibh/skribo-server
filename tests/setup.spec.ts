import { AsyncTest, AsyncSetupFixture, Expect, TestFixture, Timeout, AsyncTeardownFixture } from 'alsatian';

import * as Data from './data';
import { DataScripts } from './database';
import { Results } from '../controllers/results';
import { User } from '../controllers/user';

import { Script } from 'vm';
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

const userId = '000000000000000000';
const groupId = '000000000000000000';
const scriptId = '000000000000000000';
const embedId = '000000000000000000';

@TestFixture('Test Setup')
export class TestsOfResults {

    @AsyncSetupFixture
    public async setup() {
        const userResult: any = (await User.attachToGroup(userId, Data.User)).result;
        Data.User.GroupId = userResult.GroupId;
    }

    @AsyncTest('user_get')
    @Timeout(10000)
    public async user_get() {
        const user = await User.get(Data.User.UserId);
        Expect(user).toBeDefined();
    }

    @AsyncTest('user_getGroups')
    @Timeout(10000)
    public async user_getGroups() {
        const groups = await User.getGroups(userId);
        Expect(groups).toBeDefined();
    }

    // @AsyncTeardownFixture
    // public async CleanUp() {
    // }

}
