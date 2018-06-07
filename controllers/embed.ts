import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';

import { DB } from '../db';
import { ScriptModel } from '../models/script.model';
const uuidv1 = require('uuid/v1');

@MethodConfig('Embed')
export class Embed {

    @Method(Verbs.Put, '/embed/:script_id/:user_id/:embed_id')
    public static async update(@Body() variables: any, @Param('script_id') script_id: string, @Param("user_id") user_id: string, @Param('embed_id') embed_id: string): Promise<MethodResult<ScriptModel>> {
        try {



            const client = await DB();
            const updateObject = await client.query(`UPDATE public.embeds SET "Variables"=$1 WHERE "ID"=$2 and "ScriptId"=$3 and "UserId"=$4  RETURNING   "Variables";`, [JSON.stringify(variables), embed_id, script_id, user_id])
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

    @Method(Verbs.Get, '/embed/:script_id/:user_id/:embed_id')
    public static async get(@Param('script_id') script_id: string, @Param("user_id") user_id: string, @Param("embed_id") embed_id: string): Promise<MethodResult<ScriptModel>> {
        try {
            const client = await DB();
            const InstanceScript = await client.query('SELECT * FROM public.embeds WHERE "ScriptId"=$1 and "UserId"=$2 and "EmbedId"=$3', [script_id, user_id, embed_id]);

            const RawScript = await client.query('SELECT * FROM public.scripts WHERE "ScriptId"=$1', [script_id]);



            return new MethodResult(InstanceScript.rows);
        }
        catch (error) {
            console.error(error);
        }
    }

    @Method(Verbs.Get, '/embed/:script_id/:user_id/')
    public static async list(@Param('script_id') script_id: string, @Param("user_id") user_id: string): Promise<MethodResult<ScriptModel[]>> {
        try {
            const client = await DB();
            const InstanceScript = await client.query('SELECT * FROM public.embeds WHERE "ScriptId"=$1 and "UserId"=$2', [script_id, user_id]);
            return new MethodResult(InstanceScript.rows);
        }
        catch (error) {
            console.error(error);
        }
    }

    @Method(Verbs.Post, '/embed/:script_id/:user_id')
    public static async create(@Body() variables: any, @Param('script_id') script_id: string, @Param("user_id") user_id: string): Promise<MethodResult<ScriptModel>> {
        try {



            const client = await DB();
            const createdObject = await client.query('INSERT INTO public.embeds("ScriptId", "UserId", "Variables", "EmbedId") VALUES($1,$2,$3, $4) RETURNING "EmbedId"', [script_id, user_id, JSON.stringify(variables), uuidv1()])
            if (createdObject.rows && createdObject.rows.length > 0) {
                return new MethodResult(createdObject.rows[0]);

            } else {
                throw (new Error('failed to create the embed'))
            }



        }
        catch (error) {
            throw (new MethodError(error))
        }
    }

}