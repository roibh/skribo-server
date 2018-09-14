/*

____ _  _ ____ _ ___  ____
[__  |_/  |__/ | |__] |  |
___] | \_ |  \ | |__] |__|

*/

import { Body, Method, MethodConfig, Param, Query, Verbs, MethodResult } from '@methodus/server';
import { UserAccountModel } from '../models';
import { AutoLogger } from 'logelas';

@MethodConfig('Sync')
export class Sync {
    @Method(Verbs.Post, '/sync/:group_id/accounts')
    public static async accounts(
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
}
