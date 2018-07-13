/*

____ _  _ ____ _ ___  ____ 
[__  |_/  |__/ | |__] |  | 
___] | \_ |  \ | |__] |__| 
                           

*/

import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';
import { DB } from '../db';
import { ScriptModel } from '../models/script.model';
import { EmbedModel } from '../models/embed.model';
import * as FS from 'fs';

const uuidv1 = require('uuid/v1');

@MethodConfig('Serve')
export class Serve {

    @Method(Verbs.Get, '/serve/:script_id/:group_id/:embed_id')
    public static async get(@Param('script_id') script_id: string, @Param("group_id") group_id: string, @Param('embed_id') embed_id: string): Promise<MethodResult<string>> {
        try {


            const client = await DB();
            const codeResult = await client.query(`SELECT * FROM public.scripts SET   WHERE  "ScriptId"=$1;`, [script_id]);
            if (codeResult.rowCount > 0) {
                let code = codeResult.rows[0].Code;
                const InstanceScript = await client.query('SELECT * FROM public.embeds WHERE "ScriptId"=$1 and "GroupId"=$2 and "EmbedId"=$3', [script_id, group_id, embed_id]);
                if (InstanceScript.rowCount > 0) {
                    let variables = InstanceScript.rows[0].Variables;
                    variables = JSON.parse(variables);

                    let preCode = [
                        'declare class SkriboEnv {',
                        ...variables.map((item) => {
                            return `public static ${item.name}="${item.value}";`;
                        }),
                        '};'
                    ].join('\n');

                    // variables.forEach((element: any) => {
                    //     preCode += `class SkriboEnv {
                    //         _${element.name}='${element.value}';`;
                    //     // const regex = new RegExp(`$Skribo_${element.name}`, 'g');
                    //     // code = code.replace(regex, element.value);
                    // });



                    let function_code: string = FS.readFileSync('./content/pipe_functions.js', { encoding: 'utf-8' });

                    const dataUrl = script_id + '/' + group_id + '/' + embed_id;

                    function_code = function_code.replace(/\$SCRIPTURL\$/g, `serve/${dataUrl}`);
                    function_code = function_code.replace(/\$LOGURL\$/g, `log/${dataUrl}`);
                    function_code = function_code.replace(/\$RESULTURL\$/g, `results/${dataUrl}/`);
                    function_code = function_code.replace(/\$SERVERURL\$/g, `https://skribo.herokuapp.com/`);
                    function_code = function_code.replace(/\$SYNCURL\$/g, `sync/${group_id}/`);

                    function_code = function_code.replace(/\$SKRIBODATA\$/g, `'` + JSON.stringify({
                        'group_id': group_id,
                        'base_url': 'https://skribo.herokuapp.com'
                    }) + `'`);

                    console.log('complete script', preCode)
                    return new MethodResult(preCode + function_code + code)
                }



            }
            throw (new MethodError('not found', 404));

        }
        catch (error) {
            console.error(error);
        }
    }


}