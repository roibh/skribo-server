/*

____ _  _ ____ _ ___  ____
[__  |_/  |__/ | |__] |  |
___] | \_ |  \ | |__] |__|

*/

import { Body, Method, MethodConfig, Param, Query, Verbs, MethodResult } from '@methodus/server';
import { UserAccountModel } from '../models';
import { AutoLogger } from 'logelas';
import { DBHandler, Query as DataQuery } from '@methodus/data';
@MethodConfig('Sync')
export class Sync {
    @Method(Verbs.Post, '/sync/:group_id/accounts')
    public static async post_accounts(
        @Param('group_id') groupId: string,
        @Body() accounts: any): Promise<MethodResult<boolean>> {
        try {
            const accountsList = JSON.parse(accounts.accounts);
            accountsList.forEach(async (element) => {
                const account = new UserAccountModel({
                    AccountKey: element.id,
                    AccountName: element.name,
                    GroupId: groupId,
                });
                await account.save();

            });
            return new MethodResult(true);
        } catch (error) {
            AutoLogger.error(error);
        }
    }

    @Method(Verbs.Get, '/sync/:group_id/accounts')
    public static async get_accounts(
        @Param('group_id') groupId: string,
    ): Promise<MethodResult<UserAccountModel[]>> {
        try {

            const query = new DataQuery<UserAccountModel>();
            query.filter({ GroupId: groupId });
            const results: UserAccountModel[] = await query.run();
            return new MethodResult(results);
        } catch (error) {
            AutoLogger.error(error);
        }
    }
}
