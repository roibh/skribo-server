import { AsyncTest, AsyncSetupFixture, Expect, TestFixture, Timeout, AsyncTeardownFixture } from 'alsatian';

import * as Data from './data';
import { User } from '../controllers/user';


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
