import { AsyncTest, AsyncSetupFixture, Expect, Test, TestCase, TestFixture, Timeout, TeardownFixture, Teardown, AsyncTeardown, AsyncTeardownFixture, FocusTest, SetupFixture } from 'alsatian';

import * as Data from './data';
import { DataScripts } from './database';
import { Results } from '../controllers/results';
import { User } from '../controllers/user';
import { DB } from '../db';
import { Script } from 'vm';
import { Scripts } from '../controllers';



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

@TestFixture('Test Results')
export class TestsOfResults {

    @AsyncSetupFixture
    async setup() {
        const client = await DB();
        for (let i = 0; i < DataScripts.length; i++) {
            try {
                console.log('>>>>>',DataScripts[i]);
                let result = await client.query(DataScripts[i], []);
                console.log('<<<<<',result);
            } catch (error) {
                console.log(error);
            }

        }




        const userResult: any = (await User.attachToGroup(user_id, Data.User)).result;
        Data.User.GroupId = userResult.GroupId;

    }


    @AsyncTest('user_get')
    @TestCase()
    @Timeout(10000)
    public async user_get() {
        try {
            const user = await User.get(Data.User.UserId);
            Expect(user).toBeDefined();
        } catch (error) {
            debugger
            console.log(error);
        }
    }

    @AsyncTest('user_getGroups')
    @TestCase()
    @Timeout(10000)
    public async user_getGroups() {
        try {
            const groups = await User.getGroups(user_id);
            Expect(groups).toBeDefined();
        } catch (error) {
            debugger
            console.error(error);
        }
    }


    @AsyncTest('create')
    @TestCase(Data.ReportResult)
    @Timeout(10000)
    public async create(resultMutation) {
        try {
            const result = await Results.create(Data.User.GroupId, script_id, embed_id, resultMutation);
            Expect(result).toBeDefined();
        } catch (error) {
            debugger
            console.error(error);
        }

    }

    @AsyncTest('list')
    @TestCase()
    @Timeout(10000)
    public async list() {
        try {
            const result = await Results.list(Data.User.GroupId, script_id, embed_id);
            Expect(result).toBeDefined();
        } catch (error) {
            debugger
            console.error(error);
        }

    }

    @AsyncTest('listByScript')
    @TestCase()
    @Timeout(10000)
    public async listByScript() {
        try {
            const result = await Results.listByScript(Data.User.GroupId, script_id);
            Expect(result).toBeDefined();
        } catch (error) {
            debugger
            console.error(error);
        }

    }

    @AsyncTeardownFixture
    public async CleanUp() {

        try {
            const client = await DB();

            // const tableName = 'RESULTS_' + client.hashCode(Data.User.GroupId + script_id);
            // await client.query(`DROP TABLE public."${tableName}"`, []);
            // await client.query(`DROP SEQUENCE public."${tableName}_ID_seq"`, []);

            //await User.deleteGroup(Data.User.GroupId);
            //await User.delete(user_id);
        } catch (error) {
            debugger
            console.error(error);
        }

        // var query = "DELETE * FROM Users WHERE Email=@Email";
        // const deleteResult = await dal.query(query, {
        //     "Email": Data.newUserNew.Email
        // });
        // Expect(deleteResult.result.ok).toBe(1);
        // const db = await DBHandler.getConnection('default');
        // const result = await db.collection('Message').remove({ 'TEST': true });
        // Expect(result).toBeDefined();
    }

}





