/*

____ _  _ ____ _ ___  ____ 
[__  |_/  |__/ | |__] |  | 
___] | \_ |  \ | |__] |__| 
                           

*/

import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';
import { LogModel } from '../models';


const uuidv1 = require('uuid/v1');

@MethodConfig('Log')
export class Log {

    @Method(Verbs.Post, '/log/:script_id/:group_id/:embed_id')
    public static async log(@Body() log: any, @Param('script_id') script_id: string, @Param("group_id") group_id: string, @Param('embed_id') embed_id: string): Promise<MethodResult<boolean>> {
        try {

            const createdObject = await LogModel.insert({
                Log: log,
                GroupId: group_id,
                EmbedId: embed_id,
                ScriptId: script_id,


            })
            return new MethodResult(true);
        }
        catch (error) {
            console.error(error);
        }
        return new MethodResult<boolean>(true);
    }


}