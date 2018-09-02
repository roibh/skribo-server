/*

____ _  _ ____ _ ___  ____ 
[__  |_/  |__/ | |__] |  | 
___] | \_ |  \ | |__] |__| 
                           

*/

import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';
import { UserAccountModel } from '../models';

@MethodConfig('Sync')
export class Sync {
    @Method(Verbs.Post, '/sync/:group_id/accounts')
    public static async accounts(@Param("group_id") group_id: string, @Body() accounts: any): Promise<MethodResult<boolean>> {
        try {
            const accountsList = JSON.parse(accounts.accounts);
            accountsList.forEach(async (element) => {
                const account = new UserAccountModel({ GroupId: group_id, AccountKey: element.id, AccountName: element.name });
                await account.save();
                // const foundAccounts = await client.query('SELECT * FROM  public.user_accounts WHERE "GroupId"=$1 AND "AccountKey"=$2', [group_id, element.id]);
                // if (foundAccounts.length > 0) {
                //     await client.query('UPDATE   public.user_accounts set   "AccountKey"=$1 , "AccountName"=$2', [element.id, element.name])

                // } else {
                //     await client.query('INSERT INTO public.user_accounts("GroupId", "AccountKey", "AccountName") VALUES($1,$2,$3) RETURNING "ID"', [group_id, element.id, element.name])

                // }
            });
            return new MethodResult(true);
        }
        catch (error) {
            console.error(error);
        }
    }


}