import { AsyncTest, AsyncSetupFixture, Expect, Test, TestCase, TestFixture, Timeout, TeardownFixture, Teardown, AsyncTeardown, AsyncTeardownFixture, FocusTest, SetupFixture } from 'alsatian';
import * as Data from './data';
import { User } from '../controllers/user';
import { DBHandler } from '@methodus/data';
import { UserModel } from '../models';

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


const user_id = '000000000000000000';


@TestFixture('Test Results')
export class TestsOfResults {

    @AsyncTest('user_get')
    @Timeout(10000)
    public async user_get() {
        const user = await User.get(global.User.UserId);
        Expect(user).toBeDefined();
    }

    @AsyncTest('user_new')
    @Timeout(10000)
    public async user_new() {
        const user = new UserModel();
        Expect(user).toBeDefined();
    }

    @AsyncTest('user_getGroups')
    @Timeout(10000)
    public async user_getGroups() {
        const groups = await User.getGroups(user_id);
        Expect(groups).toBeDefined();
    }





    // @AsyncTeardownFixture
    // public async CleanUp() {

    //     try {
    //         const client = await DB();

    //         const tableName = 'RESULTS_' + client.hashCode(global.User.GroupId + global.User.ScriptId);
    //         await client.query(`DROP TABLE public."${tableName}"`, []);
    //         await client.query(`DROP SEQUENCE public."${tableName}_ID_seq"`, []);

    //         await User.deleteGroup(global.User.GroupId);
    //         await User.delete(user_id);
    //     } catch (error) {

    //         console.error(error);
    //     }

    //     // var query = "DELETE * FROM Users WHERE Email=@Email";
    //     // const deleteResult = await dal.query(query, {
    //     //     "Email": Data.newUserNew.Email
    //     // });
    //     // Expect(deleteResult.result.ok).toBe(1);
    //     // const db = await DBHandler.getConnection('default');
    //     // const result = await db.collection('Message').remove({ 'TEST': true });
    //     // Expect(result).toBeDefined();
    // }

}





