import { AsyncTest, AsyncSetupFixture, Expect, Test, TestCase, TestFixture, Timeout, TeardownFixture, Teardown, AsyncTeardown, AsyncTeardownFixture, FocusTest, SetupFixture } from 'alsatian';

import * as Data from './data';
import { DataScripts } from './database';
import { Results } from '../controllers/results';
import { User } from '../controllers/user';
import { DB } from '../db';
import { Script } from 'vm';
import { Scripts, Embed, Serve } from '../controllers';
import { EmbedModel, ScriptModel } from '../models';



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
                //console.log('>>>>>', DataScripts[i]);
                let result = await client.query(DataScripts[i], []);
                //c//onsole.log('<<<<<', result);
            } catch (error) {
                //console.log(error);
            }

        }




        const userResult: any = (await User.attachToGroup(user_id, Data.User)).result;
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

        const groups = await User.getGroups(user_id);
        Expect(groups).toBeDefined();

    }





    @AsyncTest('scripts_create')
    @Timeout(10000)
    public async scripts_create() {
        const script: ScriptModel = {
            Name: 'Test script', Description: 'Test description', ResultsDescriptor: {}, GroupId: Data.User.GroupId, Code: '', Variables: [{
                "type": "number",
                "name": "namedd",
                "value": 1
            }]
        }
        const result = (await Scripts.create(Data.User.GroupId, script)).result;
        Data.User.ScriptId = result.ScriptId;
        Expect(result.ScriptId).toBeDefined();
    }
    @AsyncTest('embed_create')
    @Timeout(10000)
    public async embed_create() {
        const embed: EmbedModel = {
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
        }
        
        const result: any = (await Embed.create(embed, Data.User.ScriptId, Data.User.GroupId)).result;
        Data.User.EmbedId = result.EmbedId;
        Expect(result).toBeDefined();


    }

    @AsyncTest('embed_update')
    @Timeout(10000)
    public async embed_update() {

        const embed: EmbedModel = { Name: 'Test embed', ScriptId: Data.User.ScriptId, Page: 'https://www.google.com', Variables: [] }
        const result = await Embed.update(embed, Data.User.ScriptId, Data.User.GroupId, Data.User.EmbedId);
        Expect(result).toBeDefined();


    }

    @AsyncTest('embed_list')
    @Timeout(10000)
    public async embed_list() {
        const result = await Embed.list(Data.User.ScriptId, Data.User.GroupId);
        Expect(result).toBeDefined();
    }





    @AsyncTest('serve_get')
    @Timeout(10000)
    public async serve_get() {
        const result = await Serve.get(Data.User.ScriptId, Data.User.GroupId, Data.User.EmbedId);
        Expect(result).toBeDefined();
    }

    @AsyncTest('create')
    @TestCase(Data.ReportResult)
    @Timeout(10000)
    public async create(resultMutation) {
        const result = await Results.create(Data.User.GroupId, Data.User.ScriptId, Data.User.EmbedId, resultMutation);
        Expect(result).toBeDefined();
    }
    @AsyncTest('list')
    @Timeout(10000)
    public async list() {
        const result = await Results.list(Data.User.GroupId, Data.User.ScriptId, Data.User.EmbedId);
        Expect(result).toBeDefined();
    }

    @AsyncTest('listByScript')
    @Timeout(10000)
    public async listByScript() {
        const result = await Results.listByScript(Data.User.GroupId, Data.User.ScriptId);
        Expect(result).toBeDefined();
    }
    @AsyncTeardownFixture
    public async CleanUp() {

        try {
            const client = await DB();

            const tableName = 'RESULTS_' + client.hashCode(Data.User.GroupId + Data.User.ScriptId);
            await client.query(`DROP TABLE public."${tableName}"`, []);
            await client.query(`DROP SEQUENCE public."${tableName}_ID_seq"`, []);

            await User.deleteGroup(Data.User.GroupId);
            await User.delete(user_id);
        } catch (error) {

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





