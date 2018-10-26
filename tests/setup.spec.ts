import { AsyncTest, AsyncSetupFixture, Expect, TestFixture, Timeout, AsyncTeardownFixture } from 'alsatian';

import * as Data from './data';
import { User } from '../controllers/user';
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
global.User = {
    EmbedId: '000000000000000000',
    GroupId: '000000000000000000',
    Name: 'test user',
    ResultId: '000000000000000000',
    ScriptId: '000000000000000000',
    UserId: '000000000000000000',
}

const userId = '000000000000000000';

@TestFixture('Test Setup')
export class TestsOfResults {

    @AsyncSetupFixture
    public async setup() {
        const userResult: any = (await User.attachToGroup(userId, global.User)).result;
        global.User.GroupId = userResult.GroupId;
    }

    // @AsyncTest('user_get')
    // @Timeout(10000)
    // public async user_get() {
    //     const user = await User.get(global.User.UserId);
    //     Expect(user).toBeDefined();
    // }

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
