/*

____ _  _ ____ _ ___  ____ 
[__  |_/  |__/ | |__] |  | 
___] | \_ |  \ | |__] |__| 
                           

*/

import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';

import { DB } from '../db';
import { ScriptModel } from '../models/script.model';
import { EmbedModel } from '../models/embed.model';
const uuidv1 = require('uuid/v1');

@MethodConfig('Log')
export class Log {

    @Method(Verbs.Post, '/log/:script_id/:group_id/:embed_id')
    public static async log(@Body() log: any, @Param('script_id') script_id: string, @Param("group_id") group_id: string, @Param('embed_id') embed_id: string): Promise<MethodResult<boolean>> {
        try {
            const client = await DB();
            const createdObject = await client.query('INSERT INTO public.logs("Log", "ScriptId", "EmbedId", "GroupId") VALUES($1,$2,$3,$4) RETURNING "ID"', [log, script_id, embed_id, group_id])
            return new MethodResult(createdObject);
        }
        catch (error) {
            console.error(error);
        }
        return new MethodResult<boolean>(true);
    }


}