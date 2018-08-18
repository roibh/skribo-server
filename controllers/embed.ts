/*

____ _  _ ____ _ ___  ____ 
[__  |_/  |__/ | |__] |  | 
___] | \_ |  \ | |__] |__| 
                           

*/

import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';

import { DB, ResultType } from '../db';
import { ScriptModel } from '../models/script.model';
import { EmbedModel } from '../models/embed.model';
const uuidv1 = require('uuid/v1');

@MethodConfig('Embed')
export class Embed {

    @Method(Verbs.Put, '/embed/:script_id/:group_id/:embed_id')
    public static async update(@Body('embed') embed: EmbedModel, @Param('script_id') script_id: string, @Param("group_id") group_id: string, @Param('embed_id') embed_id: string): Promise<MethodResult<ScriptModel>> {
        try {
            const client = await DB();
            const updateObject = await client.query(`UPDATE public.embeds SET "Name"=$1, "Variables"=$2 , "Page"=$6 WHERE "EmbedId"=$3 and "ScriptId"=$4 and "GroupId"=$5;`, [embed.Name, embed.Variables, embed_id, script_id, group_id, embed.Page])
            const InstanceScript = await client.query('SELECT * FROM public.embeds WHERE "ScriptId"=$1 and "GroupId"=$2 and "EmbedId"=$3', [script_id, group_id, embed_id], ResultType.Single);
            return new MethodResult(InstanceScript)
        }
        catch (error) {
            console.error(error);
        }
    }

    @Method(Verbs.Get, '/embed/:script_id/:group_id/:embed_id')
    public static async get(@Param('script_id') script_id: string, @Param("group_id") group_id: string, @Param("embed_id") embed_id: string): Promise<MethodResult<ScriptModel>> {
        try {
            const client = await DB();
            const InstanceScript = await client.query('SELECT * FROM public.embeds WHERE "ScriptId"=$1 and "GroupId"=$2 and "EmbedId"=$3', [script_id, group_id, embed_id]);
            const RawScript = await client.query('SELECT * FROM public.scripts WHERE "ID"=$1', [script_id]);
            return new MethodResult(InstanceScript);
        }
        catch (error) {
            console.error(error);
        }
    }

    @Method(Verbs.Get, '/embed/:script_id/:group_id/')
    public static async list(@Param('script_id') script_id: string, @Param("group_id") group_id: string): Promise<MethodResult<EmbedModel[]>> {
        try {
            const client = await DB();
            const InstanceScript = await client.query('SELECT * FROM public.embeds WHERE "ScriptId"=$1 and "GroupId"=$2', [script_id, group_id]);
            return new MethodResult(InstanceScript);
        }
        catch (error) {
            console.error(error);
        }
    }

    @Method(Verbs.Delete, '/embed/:script_id/:group_id/:embed_id')
    public static async delete(@Param('script_id') script_id: string, @Param("group_id") group_id: string, @Param("embed_id") embed_id: string): Promise<MethodResult<boolean>> {
        try {
            const client = await DB();
            const InstanceScript = await client.query('DELETE FROM public.embeds WHERE "ScriptId"=$1 and "GroupId"=$2 and "EmbedId"=$3', [script_id, group_id, embed_id]);
            return new MethodResult(InstanceScript.length);
        }
        catch (error) {
            console.error(error);
        }
    }

    @Method(Verbs.Post, '/embed/:script_id/:group_id')
    public static async create(@Body('embed') embed: EmbedModel, @Param('script_id') script_id: string, @Param("group_id") group_id: string): Promise<MethodResult<ScriptModel>> {
        try {
            const client = await DB();
            const createdObject = await client.query('INSERT INTO public.embeds("Name", "ScriptId", "GroupId", "Variables", "EmbedId", "Page") VALUES($1,$2,$3, $4,$5,$6) RETURNING "EmbedId"', [embed.Name, script_id, group_id, embed.Variables, uuidv1(), embed.Page])
            if (createdObject.length > 0) {
                return new MethodResult(createdObject[0]);

            } else {
                throw (new Error('failed to create the embed'))
            }
        }
        catch (error) {
            throw (new MethodError(error))
        }
    }

}