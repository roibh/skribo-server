import { AsyncTest, AsyncSetupFixture, Expect, Test, TestCase, TestFixture, Timeout, TeardownFixture, Teardown, AsyncTeardown, AsyncTeardownFixture, FocusTest, SetupFixture } from 'alsatian';
import * as Data from './data';
import { Results } from '../controllers/results';

@TestFixture('Test Results')
export class TestsOfResults {




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


}





