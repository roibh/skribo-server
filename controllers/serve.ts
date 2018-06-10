import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';

import { DB } from '../db';
import { ScriptModel } from '../models/script.model';
import { EmbedModel } from '../models/embed.model';
const uuidv1 = require('uuid/v1');

@MethodConfig('Serve')
export class Serve {

    @Method(Verbs.Get, '/embed/:script_id/:user_id/:embed_id')
    public static async get(@Param('script_id') script_id: string, @Param("user_id") user_id: string, @Param('embed_id') embed_id: string): Promise<MethodResult<ScriptModel>> {
        try {
            const client = await DB();
            const codeResult = await client.query(`SELECT * FROM public.scripts SET   WHERE  "ID"=$1;`, [script_id]);
            if (codeResult.rowCount > 0) {
                let code = codeResult.rows[0].Code;
                const InstanceScript = await client.query('SELECT * FROM public.embeds WHERE "ScriptId"=$1 and "UserId"=$2 and "EmbedId"=$3', [script_id, user_id, embed_id]);
                if (InstanceScript.rowCount > 0) {
                    let variables = InstanceScript.rows[0].Variables;
                    variables = JSON.parse(variables);
                    variables.forEach((element: any) => {
                        code = code.replace(`$${element.name}$`);
                    });
                    return new MethodResult(code)
                }



            }
            throw (new MethodError('not found', 404));

        }
        catch (error) {
            console.error(error);
        }
    }


}