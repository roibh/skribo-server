import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';

import { DB } from '../db';

@MethodConfig('Results')
export class Results {
    @Method(Verbs.Post, '/results/:user_id/:script_id/:embed_id')
    public static async results(@Param("user_id") user_id: string, @Param("script_id") script_id: string, @Param("embed_id") embed_id: string, @Body() results: any): Promise<MethodResult<boolean>> {
        try {
            const client = await DB();
            const createdObject = await client.query('INSERT INTO public.results("UserId", "ScriptId", "EmbedId", "Results") VALUES($1,$2,$3,$4) RETURNING "ID"', [user_id, script_id, embed_id, JSON.stringify(results)])
            return new MethodResult(createdObject);
        }
        catch (error) {
            console.error(error);
        }
    }


}