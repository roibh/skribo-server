import { AsyncTest, Expect, TestCase, TestFixture, Timeout } from 'alsatian';
import * as Data from './data';
import { Results } from '../controllers/results';
global.User = {
    EmbedId: '000000000000000000',
    GroupId: '000000000000000000',
    Name: 'test user',
    ResultId: '000000000000000000',
    ScriptId: '000000000000000000',
    UserId: '000000000000000000',
}
@TestFixture('Test Results')
export class TestsOfResults {

    @AsyncTest('create')
   // @TestCase(Data.ReportResultCollection)
   // @TestCase(Data.ReportResultEmbeded)
    @TestCase(Data.ReportResultEmbededCopy)
    @Timeout(10000)
    public async create(resultMutation) {
        const result = (await Results.create(global.User.GroupId,
            global.User.ScriptId, global.User.EmbedId, resultMutation)).result;
        global.User.ResultId = result.ResultId;
        Expect(result).toBeDefined();
    }
    @AsyncTest('list')
    @Timeout(10000)
    public async list() {
        const result = await Results.list(global.User.GroupId, global.User.ScriptId, global.User.EmbedId);
        Expect(result).toBeDefined();
    }

    @AsyncTest('listByScript')
    @Timeout(10000)
    public async listByScript() {
        const result = await Results.listByScript(global.User.GroupId, global.User.ScriptId);
        Expect(result).toBeDefined();
    }

    @AsyncTest('get')
    @Timeout(10000)
    public async get() {
        const result = await Results.get(global.User.GroupId, global.User.ScriptId, global.User.EmbedId, global.User.ResultId);
        Expect(result).toBeDefined();
    }
}
