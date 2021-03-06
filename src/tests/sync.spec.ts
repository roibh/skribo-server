import { AsyncTest, Expect, TestFixture, Timeout } from 'alsatian';
import * as Data from './data';
import { Serve, Sync } from '../controllers';

@TestFixture('Test sync')
export class TestsOfSync {
    @AsyncTest('sync')
    @Timeout(10000)
    public async serve_get() {
        const result = await Sync.post_accounts(global.User.GroupId,
            { accounts: JSON.stringify([{ id: '1', name: 'first name' }]) });
        Expect(result).toBeDefined();
    }
}
