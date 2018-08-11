/*

____ _  _ ____ _ ___  ____ 
[__  |_/  |__/ | |__] |  | 
___] | \_ |  \ | |__] |__| 
                           

*/

import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';
import { DB } from '../db';
import { ScriptModel } from '../models/script.model';

@MethodConfig('Sync')
export class Sync {
    @Method(Verbs.Post, '/sync/:group_id/accounts')
    public static async accounts(@Param("group_id") group_id: string, @Body() accounts: any): Promise<MethodResult<boolean>> {
        try {
            const client = await DB();
            console.log(accounts);
            accounts.accounts.forEach(async (element) => {
                const foundAccounts = await client.query('SELECT * FROM  public.user_accounts WHERE "GroupId"=$1 AND "AccountKey"=$2', [group_id, element.AccountKey]);
                if (foundAccounts.rows.length > 0) {
                    await client.query('UPDATE   public.user_accounts set   "AccountKey"=$1 , "AccountName"=$2', [element.AccountKey, element.AccountName])

                } else {
                    await client.query('INSERT INTO public.user_accounts("GroupId", "AccountKey", "AccountName") VALUES($1,$2,$3) RETURNING "ID"', [group_id, element.AccountKey, element.AccountName])

                }
            });

            return new MethodResult(true);




        }
        catch (error) {
            console.error(error);
        }
    }


}