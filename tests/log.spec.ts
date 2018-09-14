import { AsyncTest, AsyncSetupFixture, Expect, Test, TestCase, TestFixture, Timeout, TeardownFixture, Teardown, AsyncTeardown, AsyncTeardownFixture, FocusTest, SetupFixture } from 'alsatian';
import * as Data from './data';
import { Log } from '../controllers';

@TestFixture('Test log')
export class TestsOfLog {
    @AsyncTest('log')
    @Timeout(10000)
    public async log_log() {
        const result = await Log.log('log data', global.User.ScriptId, global.User.GroupId, global.User.EmbedId);
        Expect(result).toBeDefined();
    }
}