import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';

import { DB } from '../db';
import { ScriptModel } from '../models/script.model';

@MethodConfig('Embed')
export class Embed {
    @Method(Verbs.Get, '/embed/:script_id/:user_id/')
    public static async get(@Param('script_id') script_id: string, @Param("user_id") user_id: string): Promise<MethodResult<ScriptModel>> {
        try {
            const client = await DB();
            const res = await client.query('SELECT * FROM public.embeds WHERE "ScriptId"=$1 and "UserId"=$2', [script_id, user_id]);
            return new MethodResult(res.rows);
        }
        catch (error) {
            console.error(error);
        }
    }

}