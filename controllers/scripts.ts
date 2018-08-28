/*

____ _  _ ____ _ ___  ____ 
[__  |_/  |__/ | |__] |  | 
___] | \_ |  \ | |__] |__| 
                           

*/

import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';

import { ScriptModel } from '../models/script.model';
import { Query as DataQuery, ReturnType } from '@methodus/data';
import { ResultType } from '../db';
const uuidv1 = require('uuid/v1');


@MethodConfig('Scripts')
export class Scripts {


    /**
     * @param  {} Verbs.Get
     * @param  {group_id/list'} '/scripts/
     */
    @Method(Verbs.Get, '/scripts/:group_id/list')
    public static async list(@Param('group_id') group_id: string): Promise<MethodResult<ScriptModel[]>> {
        try {
            const scripts = (await new DataQuery(ScriptModel).filter({ GroupId: group_id }).run())
            return new MethodResult(scripts);
        }
        catch (error) {
            console.error(error);
        }
    }

    @Method(Verbs.Get, '/scripts/:group_id/script_id/:script_id')
    public static async get(@Param('group_id') group_id: string, @Param('script_id') script_id: number): Promise<MethodResult<ScriptModel>> {

        try {
            const script = (await new DataQuery(ScriptModel).filter({ ScriptId: script_id, GroupId: group_id }).run(ReturnType.Single))
            return new MethodResult(script);

            // const script: any = await client.query('SELECT * FROM public.scripts WHERE "ScriptId"=$1 AND "GroupId"=$2', [script_id, group_id]);
            // if (script.length) {
            //     return new MethodResult(script[0] as ScriptModel);
            // } else {
            //     throw (new MethodError('not found', 404));
            // }
        }
        catch (error) {
            if (error.statusCode) {
                throw (error);
            } else {
                throw new MethodError(error);
            }

        }
    }

    @Method(Verbs.Delete, '/scripts/:group_id/script_id/:script_id')
    public static async remove(@Param('group_id') group_id: string, @Param('script_id') script_id: number): Promise<MethodResult<boolean>> {
        const script = (await ScriptModel.delete({ ScriptId: script_id, GroupId: group_id }))
        return new MethodResult(script);
    }

    @Method(Verbs.Post, '/scripts/:group_id')
    public static async create(@Param('group_id') group_id: string, @Body() script: ScriptModel): Promise<MethodResult<ScriptModel>> {
        try {
            script.ScriptId = uuidv1();
            const createdObject = await ScriptModel.save(script);
            //script.Name, script.Code, JSON.stringify(script.Variables), script.Description, group_id, uuidv1(), script.ResultsDescriptor
            //const createdObject = await client.query('INSERT INTO public.scripts("Name", "Code", "Variables", "Description", "GroupId", "ScriptId","ResultsDescriptor") VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING "ScriptId"', [])
            return new MethodResult(createdObject);
        }
        catch (error) {
            console.error(error);
        }
    }

    @Method(Verbs.Put, '/scripts/:group_id/script_id/:script_id')
    public static async update(@Param('group_id') group_id: string, @Param('script_id') script_id: number, @Body() script: ScriptModel): Promise<MethodResult<ScriptModel>> {

        try {

            const updateResult = await ScriptModel.update({ ScriptId: script_id, GroupId: group_id }, script);

            if (updateResult) {
                return new MethodResult(updateResult)
            } else {
                throw (new MethodError('not found', 404));
            }


        }
        catch (error) {
            console.error(error);
        }
    }
}