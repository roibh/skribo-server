import { AsyncTest, Expect, TestFixture, Timeout, TestCase } from 'alsatian';
import * as Data from './data';
import { Serve } from '../controllers';

@TestFixture('Test Serve')
export class TestsOfServe {
    @AsyncTest('serve_get')
    @TestCase(global.User.ScriptId, global.User.GroupId, global.User.EmbedId)
    @TestCase(null, global.User.GroupId, global.User.EmbedId)
    @Timeout(10000)
    public async serve_get(ScriptId, GroupId, EmbedId) {
        const result = await Serve.get(ScriptId, GroupId, EmbedId);
        Expect(result).toBeDefined();
    }
}
