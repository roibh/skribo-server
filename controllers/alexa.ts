/*

____ _  _ ____ _ ___  ____
[__  |_/  |__/ | |__] |  |
___] | \_ |  \ | |__] |__|

*/

import { Body, Method, MethodConfig, Param, Query, Verbs, MethodResult } from '@methodus/server';
import { ElectionModel } from '../models/election.model';
import { Query as QueryModel, ObjectId } from '@methodus/data';


@MethodConfig('Alexa')
export class Alexa {
    @Method(Verbs.Post, '/alexa/commands/argue')
    public static async argue(
        @Body() body: any): Promise<MethodResult<any>> {
        return new MethodResult({});
    }

    @Method(Verbs.Get, '/election/users/all')
    public static async election_users(): Promise<MethodResult> {

        const query = new QueryModel(ElectionModel).filter({});
        const result = await query.run();
        return new MethodResult(result);
    }

    @Method(Verbs.Get, '/election/users/userid/:userid')
    public static async election_users_update(
        @Param('userid') id: string, @Query('checked') checked: string): Promise<MethodResult> {

        const result = await ElectionModel.update({ _id: id }, { Checked: (checked === 'true') });
        return new MethodResult(result);
    }
}
