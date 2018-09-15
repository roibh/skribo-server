/*

____ _  _ ____ _ ___  ____
[__  |_/  |__/ | |__] |  |
___] | \_ |  \ | |__] |__|
*/
import { AutoLogger } from 'logelas';
import { Body, Method, MethodConfig, Param, Query, Verbs, MethodResult } from '@methodus/server';
import { LogModel } from '../models';

@MethodConfig('Log')
export class Log {

    @Method(Verbs.Post, '/log/:script_id/:group_id/:embed_id')
    public static async log(
        @Body() log: any,
        @Param('script_id') scriptId: string,
        @Param('group_id') groupId: string,
        @Param('embed_id') embedId: string): Promise<MethodResult<boolean>> {
        try {
            const logObject = new LogModel({
                EmbedId: embedId,
                GroupId: groupId,
                Log: log,
                ScriptId: scriptId,

            });

            const createdObject = await LogModel.insert(logObject);
            return new MethodResult(createdObject !== undefined);
        } catch (error) {
            AutoLogger.error(error);
        }
        return new MethodResult<boolean>(true);
    }

}
