import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';

import { DB } from '../db';
import { ScriptModel } from '../models/script.model';

@MethodConfig('Sync')
export class Sync {
    @Method(Verbs.Post, '/sync/:user_id/accounts')
    public static async accounts(@Param("user_id") user_id: string, @Body() accounts: any): Promise<MethodResult<ScriptModel>> {
        try {
            const client = await DB();

            const foundAccounts = await client.query('SELECT * FROM  public.user_accounts WHERE "UserId"=$1', [user_id]);
            if (foundAccounts.rows.length > 0) {
                const createdObject = await client.query('UPDATE   public.user_accounts set   "Accounts"=$1', [accounts])
                return new MethodResult(createdObject);
            } else {
                const createdObject = await client.query('INSERT INTO public.user_accounts("UserId", "Accounts") VALUES($1,$2) RETURNING "ID"', [user_id, accounts])
                return new MethodResult(createdObject);
            }





        }
        catch (error) {
            console.error(error);
        }
    }


}