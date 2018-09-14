import { AsyncTest, Expect, TestFixture, Timeout } from 'alsatian';
import * as Data from './data';
import { Embed, Scripts, Results, User } from '../controllers';

@TestFixture('Test finals')
export class TestsOfServe {

    @AsyncTest('embed_delete')
    @Timeout(10000)
    public async embed_delete() {
        const result = await Embed.delete(Data.User.ScriptId, Data.User.GroupId, Data.User.EmbedId);
        Expect(result).toBeDefined();
    }

    @AsyncTest('script_delete')
    @Timeout(10000)
    public async script_delete() {
        const result = await Scripts.remove(Data.User.GroupId, Data.User.ScriptId);
        Expect(result).toBeDefined();
    }

    @AsyncTest('result_delete')
    @Timeout(10000)
    public async result_delete() {
        const result = await Results.delete(Data.User.GroupId,
            Data.User.ScriptId, Data.User.EmbedId, Data.User.ResultId);
        Expect(result).toBeDefined();
    }

    @AsyncTest('user_delete')
    @Timeout(10000)
    public async user_delete() {
        const result = await User.delete(Data.User.UserId);
        Expect(result).toBeDefined();
    }

    @AsyncTest('group_delete')
    @Timeout(10000)
    public async group_delete() {
        const result = await User.deleteGroup(Data.User.GroupId);
        Expect(result).toBeDefined();
    }

}
