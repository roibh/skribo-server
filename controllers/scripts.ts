/*

____ _  _ ____ _ ___  ____ 
[__  |_/  |__/ | |__] |  | 
___] | \_ |  \ | |__] |__| 
                           

*/

import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';
import { DB } from '../db';
import { ScriptModel } from '../models/script.model';
const uuidv1 = require('uuid/v1');


@MethodConfig('Scripts')
export class Scripts {


    /**
     * @param  {} Verbs.Get
     * @param  {group_id/list'} '/scripts/
     */
    @Method(Verbs.Get, '/scripts/:group_id/list')
    public static async list(@Param('group_id') group_id: string): Promise<MethodResult<ScriptModel>> {
        try {
            const client = await DB();
            const res = await client.query('SELECT * FROM public.scripts WHERE "GroupId"=$1 ORDER BY "ID" ASC', [group_id]);
            return new MethodResult(res.rows);
        }
        catch (error) {
            console.error(error);
        }
    }

    @Method(Verbs.Get, '/scripts/:group_id/script_id/:script_id')
    public static async get(@Param('group_id') group_id: string, @Param('script_id') script_id: number): Promise<MethodResult<ScriptModel>> {
        const client = await DB();
        try {
            const script: any = await client.query('SELECT * FROM public.scripts WHERE "ScriptId"=$1 AND "GroupId"=$2', [script_id, group_id]);
            if (script.rows.length) {
                return new MethodResult(script.rows[0] as ScriptModel);
            } else {
                throw (new MethodError('not found', 404));
            }
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
        const client = await DB();
        try {
            const script: ScriptModel = await client.query('DELETE FROM public.scripts WHERE "ScriptId"=$1 AND "GroupId"=$2', [script_id, group_id]);
            return new MethodResult(true);
        }
        catch (error) {
            console.error(error);
        }
    }

    @Method(Verbs.Post, '/scripts/:group_id')
    public static async create(@Param('group_id') group_id: string, @Body() script: ScriptModel): Promise<MethodResult<ScriptModel>> {
        const client = await DB();
        if (!script.Variables)
            script.Variables = {};
        try {

            const createdObject = await client.query('INSERT INTO public.scripts("Name", "Code", "Variables", "Description", "GroupId", "ScriptId","ResultsDescriptor") VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING "ScriptId"', [script.Name, script.Code, JSON.stringify(script.Variables), script.Description, group_id, uuidv1(), script.ResultsDescriptor])
            return new MethodResult(createdObject.rows[0]);
        }
        catch (error) {
            console.error(error);
        }
    }

    @Method(Verbs.Put, '/scripts/:group_id/script_id/:script_id')
    public static async update(@Param('group_id') group_id: string, @Param('script_id') script_id: number, @Body() script: ScriptModel): Promise<MethodResult<ScriptModel>> {
        const client = await DB();
        if (!script.Variables)
            script.Variables = {};
        try {

            const updateObject = await client.query(`UPDATE public.scripts SET "Name"=$1, "Code"=$2, "Variables"=$3, "Description"=$4 ,"ScriptId"=$5,"ResultsDescriptor"=$6  WHERE "ScriptId"=$6 AND "GroupId"=$7 RETURNING "Name", "Code", "Variables", "Description","ResultsDescriptor";`, [script.Name, script.Code, JSON.stringify(script.Variables), script.Description, script_id, script_id, group_id,  JSON.stringify(script.ResultsDescriptor)])
            if (updateObject.rows.length) {
                return new MethodResult(updateObject.rows[0])
            } else {
                throw (new MethodError('not found', 404));
            }


        }
        catch (error) {
            console.error(error);
        }
    }
}