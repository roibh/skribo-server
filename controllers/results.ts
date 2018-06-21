/*

____ _  _ ____ _ ___  ____ 
[__  |_/  |__/ | |__] |  | 
___] | \_ |  \ | |__] |__| 
                           

*/

import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';
import { DB } from '../db';
import { ResultsModel } from '../models/';

@MethodConfig('Results')
export class Results {


    @Method(Verbs.Get, '/results/:script_id/:group_id')
    public static async listByScript(@Param("group_id") group_id: string, @Param("script_id") script_id: string): Promise<MethodResult<ResultsModel[]>> {
        try {
            const client = await DB();
            const resultObject = await client.query('SELECT "ScriptId", "EmbedId", "Date", "ID" from  public.results WHERE "GroupId"=$1 AND "ScriptId"=$2  ', [group_id, script_id])
            if (resultObject.rows.length > 0) {
                return new MethodResult(resultObject.rows);
            }
        }
        catch (error) {
            console.error(error);
        }
    }


    @Method(Verbs.Get, '/results/:script_id/:group_id/:embed_id')
    public static async list(@Param("group_id") group_id: string, @Param("script_id") script_id: string, @Param("embed_id") embed_id: string): Promise<MethodResult<ResultsModel[]>> {
        try {
            const client = await DB();
            const resultObject = await client.query('SELECT "Date", "ID" from  public.results WHERE "GroupId"=$1 AND "ScriptId"=$2 and "EmbedId"=$3  ', [group_id, script_id, embed_id])
            if (resultObject.rows.length > 0) {
                return new MethodResult(resultObject.rows);
            }
        }
        catch (error) {
            console.error(error);
        }
    }



    @Method(Verbs.Get, '/results/:script_id/:group_id/:embed_id/:result_id')
    public static async get(@Param("group_id") group_id: string, @Param("script_id") script_id: string, @Param("embed_id") embed_id: string, @Param("result_id") result_id: any): Promise<MethodResult<ResultsModel>> {
        try {
            const client = await DB();
            const resultObject = await client.query('SELECT * from  public.results WHERE "GroupId"=$1 AND "ScriptId"=$2 and "EmbedId"=$3 AND "ID"=$4 ', [group_id, script_id, embed_id, result_id])
            if (resultObject.rows.length > 0) {
                return new MethodResult(resultObject.rows[0]);
            }
        }
        catch (error) {
            console.error(error);
        }
    }


    @Method(Verbs.Post, '/results/:script_id/:group_id/:embed_id')
    public static async results(@Param("group_id") group_id: string, @Param("script_id") script_id: string, @Param("embed_id") embed_id: string, @Body() results: any): Promise<MethodResult<boolean>> {
        try {
            const client = await DB();
            const createdObject = await client.query('INSERT INTO public.results("GroupId", "ScriptId", "EmbedId", "Data", "Date") VALUES($1,$2,$3,$4,$5) RETURNING "ID"', [group_id, script_id, embed_id, JSON.stringify(results), new Date()])
            return new MethodResult(createdObject);
        }
        catch (error) {
            console.error(error);
        }
    }


}