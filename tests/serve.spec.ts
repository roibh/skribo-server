import { AsyncTest, Expect, TestFixture, Timeout, TestCase } from 'alsatian';
import * as Data from './data';
import { Serve } from '../controllers';

@TestFixture('Test Serve')
export class TestsOfServe {
    @AsyncTest('serve_get')
    @TestCase()
    @TestCase('111111')
    @Timeout(10000)
    public async serve_get(ScriptId?: string, GroupId?: string, EmbedId?: string) {
        try {
            const result = await Serve.get(ScriptId || global.User.ScriptId, global.User.GroupId, global.User.EmbedId);
            Expect(result).toBeDefined();
        } catch (ex) {
            Expect(ScriptId).toBe('111111');
        }

    }
}
