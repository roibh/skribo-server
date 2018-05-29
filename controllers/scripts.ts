import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';

import { DB } from '../db';
import { ScriptModel } from '../models/script.model';

@MethodConfig('Scripts')
export class Scripts {
    @Method(Verbs.Get, '/scripts/list')
    public static async list(): Promise<MethodResult<ScriptModel>> {
        try {
            const client = await DB();
            const res = await client.query('SELECT * FROM public.scripts ORDER BY "ID" ASC');
            if (res.rows) {
                console.log(res.rows[0].message) // Hello world!
            }
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
            const script: ScriptModel = await client.query('SELECT * FROM public.scripts WHERE "ID"=$1', [id]);
            return new MethodResult(script);
        }
        catch (error) {
            console.error(error);
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
            await client.connect()
            const createdObject = await client.query('INSERT INTO public.scripts("Name", "Code", "Variables", "Decription") VALUES($1,$2,$3) RETURNING "ID"', [script.Name, script.Code, script.Variables, script.Description])
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
            await client.connect()
            const updateObject = await client.query(`UPDATE public.scripts SET "Name"=$1, "Code"=$2, "Variables"=$3, "Decription"=$4) WHERE "ID"=$5`, [script.Name, script.Code, script.Variables, script.Description, id])
            return new MethodResult(updateObject)
        }
        catch (error) {
            console.error(error);
        }
    }
}