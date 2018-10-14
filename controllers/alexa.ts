/*

____ _  _ ____ _ ___  ____
[__  |_/  |__/ | |__] |  |
___] | \_ |  \ | |__] |__|

*/

import { Body, Method, MethodConfig, Param, Query, Verbs, MethodResult } from '@methodus/server';
@MethodConfig('Alexa')
export class Alexa {
    @Method(Verbs.Post, '/alexa/commands/argue')
    public static async argue(
        @Body() body: any): Promise<MethodResult<any>> {
        console.log('alexa');
        console.log(body);
        return new MethodResult({});
    }

}
