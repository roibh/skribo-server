/*

____ _  _ ____ _ ___  ____
[__  |_/  |__/ | |__] |  |
___] | \_ |  \ | |__] |__|

*/
import { Query as DataQuery } from '@methodus/data';
import { Method, MethodConfig, MethodError, MethodResult, Param, Verbs } from '@methodus/server';
import * as FS from 'fs';
import { AutoLogger } from 'logelas';
import { EmbedModel } from '../models/embed.model';
import { ScriptModel } from '../models/script.model';
@MethodConfig('Serve')
export class Serve {

    @Method(Verbs.Get, '/serve/:script_id/:group_id/:embed_id')
    public static async get(
        @Param('script_id') scriptId: string,
        @Param('group_id') groupId: string,
        @Param('embed_id') embedId: string): Promise<MethodResult<string>> {
        const codeResult = await ScriptModel.query(new DataQuery(ScriptModel).filter({ ScriptId: scriptId }));
        if (codeResult.length > 0) {

            const InstanceScript = (await new DataQuery(EmbedModel).filter({
                EmbedId: embedId, GroupId: groupId, ScriptId: scriptId,
            }).run());
            if (InstanceScript.length > 0) {
                let variables = InstanceScript[0].Variables || [];
                if (typeof variables === 'string') {
                    variables = JSON.parse(variables);
                }
                const preCode = this.generateVariables(variables);
                const code = codeResult[0].Code;
                const functionCode: string = this.processTemplate(scriptId, groupId, embedId);
                return new MethodResult(preCode + functionCode + code);
            }
        }
        throw (new MethodError('not found', 404));
    }

    private static generateVariables(variables: any[]) {
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
            '};',
        ].join('\n');
    }

    private static timespanToRange(timespan) {
        // 'TODAY', 'YESTERDAY', 'LAST_7_DAYS', 'THIS_WEEK_SUN_TODAY',
        // 'THIS_WEEK_MON_TODAY', 'LAST_WEEK', 'LAST_14_DAYS', 'LAST_30_DAYS',
        // 'LAST_WEEK', 'LAST_BUSINESS_WEEK', 'LAST_WEEK_SUN_SAT', 'THIS_MONTH', 'LAST_MONTH', 'ALL_TIME'
        switch (timespan) {
            case 'TODAY': {
                const dateString = this.rangeBack(0);
                return { start: dateString, end: dateString };
            }

            case 'YESTERDAY': {
                const date = new Date();
                date.setDate(date.getDate() - 1);
                const dateString = this.rangeBack(1);
                return { start: dateString, end: this.rangeBack(0) };
            }
            case 'LAST_7_DAYS': {
                const dateString = this.rangeBack(7);
                return { start: dateString, end: this.rangeBack(0) };
            }
            case 'LAST_MONTH':
                {
                    const dateString = this.rangeBack(30);
                    return { start: dateString, end: this.rangeBack(0) };
                }
        }
    }

    private static processTemplate(scriptId: string, groupId: string, embedId: string): string {
        let functionCode: string = FS.readFileSync('./content/pipe_functions.js', { encoding: 'utf-8' });
        const dataUrl = scriptId + '/' + groupId + '/' + embedId;
        functionCode = functionCode.replace(/\$SCRIPTURL\$/g, `serve/${dataUrl}`);
        functionCode = functionCode.replace(/\$LOGURL\$/g, `log/${dataUrl}`);
        functionCode = functionCode.replace(/\$RESULTURL\$/g, `results/${dataUrl}/`);
        functionCode = functionCode.replace(/\$SERVERURL\$/g, `https://skribo.herokuapp.com/`);
        functionCode = functionCode.replace(/\$SYNCURL\$/g, `sync/${groupId}/`);
        functionCode = functionCode.replace(/\$SKRIBODATA\$/g, `'` + JSON.stringify({
            base_url: 'https://skribo.herokuapp.com',
            group_id: groupId,
        }) + `'`);

        return functionCode;
    }
    private static rangeBack(days) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date.toISOString().split('T')[0];
    }
}
