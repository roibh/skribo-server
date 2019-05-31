import { AsyncTest, Expect, TestFixture, Timeout } from 'alsatian';
import * as Data from './data';
import { Embed, Scripts, Results, User } from '../controllers';

@TestFixture('Test finals')
export class TestsOfServe {

    @AsyncTest('embed_delete')
    @Timeout(10000)
    public async embed_delete() {
        const result = await Embed.delete(global.User.ScriptId, global.User.GroupId, global.User.EmbedId);
        Expect(result).toBeDefined();
    }

    @AsyncTest('script_delete')
    @Timeout(10000)
    public async script_delete() {
        const result = await Scripts.remove(global.User.GroupId, global.User.ScriptId);
        Expect(result).toBeDefined();
    }

    @AsyncTest('result_delete')
    @Timeout(10000)
    public async result_delete() {
        const result = await Results.delete(global.User.GroupId,
            global.User.ScriptId, global.User.EmbedId, global.User.ResultId);
        Expect(result).toBeDefined();
    }

    @AsyncTest('user_delete')
    @Timeout(10000)
    public async user_delete() {
        const result = await User.delete(global.User.UserId);
        Expect(result).toBeDefined();
    }

    @AsyncTest('group_delete')
    @Timeout(10000)
    public async group_delete() {
        const result = await User.deleteGroup(global.User.GroupId);
        Expect(result).toBeDefined();
    }

}
