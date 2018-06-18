/*

____ _  _ ____ _ ___  ____ 
[__  |_/  |__/ | |__] |  | 
___] | \_ |  \ | |__] |__| 
                           

*/

import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';

import { DB } from '../db';
import { ScriptModel } from '../models/script.model';
import { EmbedModel } from '../models/embed.model';
const uuidv1 = require('uuid/v1');

@MethodConfig('Embed')
export class Embed {

    @Method(Verbs.Put, '/embed/:script_id/:user_id/:embed_id')
    public static async update(@Body('embed') embed: EmbedModel, @Param('script_id') script_id: string, @Param("user_id") user_id: string, @Param('embed_id') embed_id: string): Promise<MethodResult<ScriptModel>> {
        try {
            const client = await DB();
            const updateObject = await client.query(`UPDATE public.embeds SET "Name"=$1, "Variables"=$2 WHERE "EmbedId"=$3 and "ScriptId"=$4 and "UserId"=$5;`, [embed.Name, JSON.stringify(embed.Variables), embed_id, script_id, user_id])
            if (updateObject.rowCount > 0) {
                const InstanceScript = await client.query('SELECT * FROM public.embeds WHERE "ScriptId"=$1 and "UserId"=$2 and "EmbedId"=$3', [script_id, user_id, embed_id]);
                return new MethodResult(InstanceScript.rows[0])
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
            const RawScript = await client.query('SELECT * FROM public.scripts WHERE "ID"=$1', [script_id]);
            return new MethodResult(InstanceScript.rows);
        }
        catch (error) {
            console.error(error);
        }
    }

    @Method(Verbs.Get, '/embed/:script_id/:user_id/')
    public static async list(@Param('script_id') script_id: string, @Param("user_id") user_id: string): Promise<MethodResult<EmbedModel[]>> {
        try {
            const client = await DB();
            const InstanceScript = await client.query('SELECT * FROM public.embeds WHERE "ScriptId"=$1 and "UserId"=$2', [script_id, user_id]);
            return new MethodResult(InstanceScript.rows);
        }
        catch (error) {
            console.error(error);
        }
    }

    @Method(Verbs.Delete, '/embed/:script_id/:user_id/:embed_id')
    public static async delete(@Param('script_id') script_id: string, @Param("user_id") user_id: string, @Param("embed_id") embed_id: string): Promise<MethodResult<boolean>> {
        try {
            const client = await DB();
            const InstanceScript = await client.query('DELETE FROM public.embeds WHERE "ScriptId"=$1 and "UserId"=$2 and "EmbedId"=$3', [script_id, user_id, embed_id]);
            return new MethodResult(InstanceScript.rowCount);
        }
        catch (error) {
            console.error(error);
        }
    }

    @Method(Verbs.Post, '/embed/:script_id/:user_id')
    public static async create(@Body('embed') embed: EmbedModel, @Param('script_id') script_id: string, @Param("user_id") user_id: string): Promise<MethodResult<ScriptModel>> {
        try {
            const client = await DB();
            const createdObject = await client.query('INSERT INTO public.embeds("Name", "ScriptId", "UserId", "Variables", "EmbedId") VALUES($1,$2,$3, $4,$5) RETURNING "EmbedId"', [embed.Name, script_id, user_id, JSON.stringify(embed.Variables), uuidv1()])
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