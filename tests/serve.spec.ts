import { AsyncTest, AsyncSetupFixture, Expect, Test, TestCase, TestFixture, Timeout, TeardownFixture, Teardown, AsyncTeardown, AsyncTeardownFixture, FocusTest, SetupFixture } from 'alsatian';
import * as Data from './data';
import { Serve } from '../controllers';

@TestFixture('Test Serve')
export class TestsOfServe {
    @AsyncTest('serve_get')
    @Timeout(10000)
    public async serve_get() {
        const result = await Serve.get(Data.User.ScriptId, Data.User.GroupId, Data.User.EmbedId);
        Expect(result).toBeDefined();
    }
}