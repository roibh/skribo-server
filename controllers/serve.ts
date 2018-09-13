/*

____ _  _ ____ _ ___  ____ 
[__  |_/  |__/ | |__] |  | 
___] | \_ |  \ | |__] |__| 
                           

*/

import { Method, MethodConfig, Param, Verbs, MethodError, MethodResult } from '@methodus/server';

import { ScriptModel } from '../models/script.model';
import { EmbedModel } from '../models/embed.model';
import * as FS from 'fs';
import { Repo, Query as DataQuery } from '@methodus/data';
const uuidv1 = require('uuid/v1');

@MethodConfig('Serve')
export class Serve {


    static timespanToRange(timespan) {
        //'TODAY', 'YESTERDAY', 'LAST_7_DAYS', 'THIS_WEEK_SUN_TODAY',
        // 'THIS_WEEK_MON_TODAY', 'LAST_WEEK', 'LAST_14_DAYS', 'LAST_30_DAYS',
        // 'LAST_WEEK', 'LAST_BUSINESS_WEEK', 'LAST_WEEK_SUN_SAT', 'THIS_MONTH', 'LAST_MONTH', 'ALL_TIME'
        switch (timespan) {
            case 'TODAY': {
                let dateString = new Date().toISOString().split('T')[0];
                return { start: dateString, end: dateString }
            }

            case 'YESTERDAY': {
                let date = new Date();
                date.setDate(date.getDate() - 1);
                let dateString = date.toISOString().split('T')[0];
                return { start: dateString, end: new Date().toISOString().split('T')[0] }
            }

            case 'LAST_7_DAYS': {
                let date = new Date();
                date.setDate(date.getDate() - 7);
                let dateString = date.toISOString().split('T')[0];
                return { start: dateString, end: new Date().toISOString().split('T')[0] }
            }

            case 'LAST_MONTH':
                {
                    let date = new Date();
                    date.setDate(date.getDate() - 30);
                    let dateString = date.toISOString().split('T')[0];
                    return { start: dateString, end: new Date().toISOString().split('T')[0] }
                }


        }
    }

    static processTemplate(script_id, group_id, embed_id) {
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

        return function_code;
    }

    static generateVariables(variables: any[]) {
        return [
            'var SkriboEnv =  {',
            ...variables.map((item) => {
                switch (item.type) {
                    case 'number':
                        return `"${item.name}":${item.value},`;
                    case 'string':
                        return `"${item.name}":"${item.value}",`;
                    case 'date':
                        return `"${item.name}":"${item.value}",`;
                    case 'date-span':
                        return `"${item.name}":${JSON.stringify(this.timespanToRange(item.value))},`;
                }

            }),
            '};'
        ].join('\n');
    }
    
    @Method(Verbs.Get, '/serve/:script_id/:group_id/:embed_id')
    public static async get(@Param('script_id') script_id: string, @Param("group_id") group_id: string, @Param('embed_id') embed_id: string): Promise<MethodResult<string>> {
        try {
            const codeResult = await ScriptModel.query(new DataQuery(ScriptModel).filter({ 'ScriptId': script_id }));
            if (codeResult.length > 0) {
                let code = codeResult[0].Code;
                const InstanceScript = (await new DataQuery(EmbedModel).filter({ GroupId: group_id, ScriptId: script_id, EmbedId: embed_id }).run());
                if (InstanceScript.length > 0) {
                    let variables = InstanceScript[0].Variables || [];
                    if (typeof variables === 'string') {
                        variables = JSON.parse(variables);
                    }
                    let preCode = this.generateVariables(variables);
                    let function_code: string = this.processTemplate(script_id, group_id, embed_id);
                    console.log('complete script', preCode)
                    return new MethodResult(preCode + function_code + code);
                }
            }
            throw (new MethodError('not found', 404));
        }
        catch (error) {
            console.error(error);
        }
    }
}