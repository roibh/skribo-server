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
    public static async accounts(@Param("group_id") group_id: string, @Body() accounts: any): Promise<MethodResult<ScriptModel>> {
        try {
            const client = await DB();

            const foundAccounts = await client.query('SELECT * FROM  public.user_accounts WHERE "GroupId"=$1', [group_id]);
            if (foundAccounts.rows.length > 0) {
                const createdObject = await client.query('UPDATE   public.user_accounts set   "Accounts"=$1', [accounts])
                return new MethodResult(createdObject);
            } else {
                const createdObject = await client.query('INSERT INTO public.user_accounts("GroupId", "Accounts") VALUES($1,$2) RETURNING "ID"', [group_id, accounts])
                return new MethodResult(createdObject);
            }





        }
        catch (error) {
            console.error(error);
        }
    }


}