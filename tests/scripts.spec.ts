import { AsyncTest, AsyncSetupFixture, Expect, Test, TestCase, TestFixture, Timeout, TeardownFixture, Teardown, AsyncTeardown, AsyncTeardownFixture, FocusTest, SetupFixture } from 'alsatian';
import * as Data from './data';
import { Scripts } from '../controllers';
import { ScriptModel } from '../models';



@TestFixture('Test Scripts')
export class TestsOfScripts {



    @AsyncTest('scripts_create')
    @Timeout(10000)
    public async scripts_create() {
        const script: ScriptModel = new ScriptModel({
            Name: 'Test script', Description: 'Test description', ResultsDescriptor: {}, GroupId: Data.User.GroupId, Code: '', Variables: [{
                "type": "number",
                "name": "namedd",
                "value": "1"
            }]
        });


        const result = (await Scripts.create(Data.User.GroupId, script)).result;
        Data.User.ScriptId = result.ScriptId;
        Expect(result.ScriptId).toBeDefined();
    }



    @AsyncTest('scripts_update')
    @Timeout(10000)
    public async scripts_update() {
        const script: ScriptModel = new ScriptModel({
            Name: 'Test script', Description: 'Test description updated', ResultsDescriptor: {}, GroupId: Data.User.GroupId, Code: '', Variables: [{
                "type": "number",
                "name": "namedd",
                "value": "1"
            }]
        });


        const result = (await Scripts.update(Data.User.GroupId, Data.User.ScriptId, script)).result;
        Data.User.ScriptId = result.ScriptId;
        Expect(result.ScriptId).toBeDefined();
    }



    @AsyncTest('scripts_list')
    @Timeout(10000)
    public async scripts_list() {
        const result = (await Scripts.list(Data.User.GroupId)).result;
        Expect(result).toBeDefined();
    }

    @AsyncTest('scripts_get')
    @Timeout(10000)
    public async scripts_get() {
        const result = (await Scripts.get(Data.User.GroupId, Data.User.ScriptId)).result;
        Expect(result).toBeDefined();
    }



}




