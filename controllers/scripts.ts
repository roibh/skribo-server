import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';

import { DB } from '../db';
import { ScriptModel } from '../models/script.model';

@MethodConfig('Scripts')
export class Scripts {
    @Method(Verbs.Get, '/scripts/:user_id/list')
    public static async list(@Param("user_id") user_id: string): Promise<MethodResult<ScriptModel>> {
        try {
            const client = await DB();
            const res = await client.query('SELECT * FROM public.scripts WHERE "Owner"=$1 ORDER BY "ID" ASC', [user_id]);
            return new MethodResult(res.rows);
        }
        catch (error) {
            console.error(error);
        }
    }

    @Method(Verbs.Get, '/scripts/:id')
    public static async get(@Param('id') id: number): Promise<MethodResult<ScriptModel>> {
        const client = await DB();
        try {
            const script: any = await client.query('SELECT * FROM public.scripts WHERE "ID"=$1', [id]);
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

    @Method(Verbs.Delete, '/scripts/:id')
    public static async remove(@Param('id') id: number): Promise<MethodResult<boolean>> {
        const client = await DB();
        try {
            const script: ScriptModel = await client.query('DELETE FROM public.scripts WHERE "ID"=$1', [id]);
            return new MethodResult(true);
        }
        catch (error) {
            console.error(error);
        }
    }

    @Method(Verbs.Post, '/scripts/')
    public static async create(@Body() script: ScriptModel): Promise<MethodResult<ScriptModel>> {
        const client = await DB();
        if (!script.Variables)
            script.Variables = {};
        try {

            const createdObject = await client.query('INSERT INTO public.scripts("Name", "Code", "Variables", "Description") VALUES($1,$2,$3,$4) RETURNING "ID"', [script.Name, script.Code, JSON.stringify(script.Variables), script.Description])
            return new MethodResult(createdObject);
        }
        catch (error) {
            console.error(error);
        }
    }

    @Method(Verbs.Put, '/scripts/:id')
    public static async update(@Param('id') id: number, @Body() script: ScriptModel): Promise<MethodResult<ScriptModel>> {
        const client = await DB();
        if (!script.Variables)
            script.Variables = {};
        try {

            const updateObject = await client.query(`UPDATE public.scripts SET "Name"=$1, "Code"=$2, "Variables"=$3, "Description"=$4 WHERE "ID"=$5 RETURNING "Name", "Code", "Variables", "Description";`, [script.Name, script.Code, JSON.stringify(script.Variables), script.Description, id])
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