import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';

import { DB } from '../db';
import { ScriptModel } from '../models/script.model';
import { EmbedModel } from '../models/embed.model';
const uuidv1 = require('uuid/v1');

@MethodConfig('Log')
export class Log {

    @Method(Verbs.Post, '/embed/:script_id/:user_id/:embed_id/log')
    public static async log(@Body() log: any, @Param('script_id') script_id: string, @Param("user_id") user_id: string, @Param('embed_id') embed_id: string): Promise<MethodResult<boolean>> {
        try {
            const client = await DB();
            const createdObject = await client.query('INSERT INTO public.logs("Log", "ScriptId", "EmbedId", "UserId") VALUES($1,$2,$3,$4) RETURNING "ID"', [log, script_id, embed_id, user_id])
            return new MethodResult(createdObject);
        }
        catch (error) {
            console.error(error);
        }
        return new MethodResult<boolean>(true);
    }


}