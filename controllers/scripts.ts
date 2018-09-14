/*
____ _  _ ____ _ ___  ____
[__  |_/  |__/ | |__] |  |
___] | \_ |  \ | |__] |__|

*/

import { Body, Method, MethodConfig, Param, Query, Verbs, MethodError, MethodResult } from '@methodus/server';
import * as uuidv1 from 'uuid/v1';
import { ScriptModel } from '../models/script.model';
import { Query as DataQuery, ReturnType } from '@methodus/data';
import { AutoLogger } from 'logelas';
@MethodConfig('Scripts')
export class Scripts {
    /**
     * @param  {} Verbs.Get
     * @param  {group_id/list'} '/scripts/
     */
    @Method(Verbs.Get, '/scripts/:group_id/list')
    public static async list(@Param('group_id') groupId: string): Promise<MethodResult<ScriptModel[]>> {
        try {
            const scripts = (await new DataQuery(ScriptModel).filter({ GroupId: groupId }).run());
            return new MethodResult(scripts);
        } catch (error) {
            AutoLogger.error(error);
        }
    }

    @Method(Verbs.Get, '/scripts/:group_id/script_id/:script_id')
    public static async get(
        @Param('group_id') groupId: string,
        @Param('script_id') scriptId: string):
        Promise<MethodResult<ScriptModel>> {

        try {
            const script = (await new DataQuery(ScriptModel).filter({
                GroupId: groupId,
                ScriptId: scriptId,
            }).run(ReturnType.Single));
            return new MethodResult(script);
        } catch (error) {
            if (error.statusCode) {
                throw (error);
            } else {
                throw new MethodError(error);
            }
        }
    }

    @Method(Verbs.Delete, '/scripts/:group_id/script_id/:script_id')
    public static async remove(
        @Param('group_id') groupId: string,
        @Param('script_id') scriptId: string): Promise<MethodResult<boolean>> {
        const script = (await ScriptModel.delete({ ScriptId: scriptId, GroupId: groupId }));
        return new MethodResult(script);
    }

    @Method(Verbs.Post, '/scripts/:group_id')
    public static async create(
        @Param('group_id') groupId: string,
        @Body() script: ScriptModel): Promise<MethodResult<ScriptModel>> {
        try {
            script.ScriptId = uuidv1();
            const createdObject = await ScriptModel.save(script);
            return new MethodResult(createdObject);
        } catch (error) {
            AutoLogger.error(error);
        }
    }

    @Method(Verbs.Put, '/scripts/:group_id/script_id/:script_id')
    public static async update(
        @Param('group_id') groupId: string,
        @Param('script_id') scriptId: string,
        @Body() script: ScriptModel): Promise<MethodResult<ScriptModel>> {
        try {
            const updateResult = await ScriptModel.update({ ScriptId: scriptId, GroupId: groupId }, script);
            if (updateResult) {
                return new MethodResult(updateResult);
            } else {
                throw (new MethodError('not found', 404));
            }
        } catch (error) {
            AutoLogger.error(error);
        }
    }
}
