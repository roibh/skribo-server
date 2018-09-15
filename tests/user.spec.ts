import { AsyncTest, Expect, TestCase, TestFixture, Timeout } from 'alsatian';
import { User } from '../controllers/user';
import { DBHandler } from '@methodus/data';
import { UserModel } from '../models';

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

@TestFixture('Test Results')
export class TestsOfResults {

    // @AsyncTest('user_get')
    // @TestCase(null)
    // @TestCase('111111')
    // @Timeout(10000)
    // public async user_get(userId) {
    //     try {
    //         const user = await User.get(userId || global.User.UserId);
    //         Expect(user).toBeDefined();
    //     } catch (ex) {
    //         Expect(userId).toBe('111111');
    //     }
    // }

    @AsyncTest('user_new')
    @Timeout(10000)
    public async user_new() {
        const user = new UserModel();
        Expect(user).toBeDefined();
    }

    @AsyncTest('user_getGroups')
    @Timeout(10000)
    public async user_getGroups() {
        const groups = await User.getGroups(global.User.UserId);
        Expect(groups).toBeDefined();
    }
}
