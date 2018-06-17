import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';

import { DB } from '../db';
import { ResultsModel } from '../models/';

@MethodConfig('Results')
export class Results {


    @Method(Verbs.Get, '/results/:user_id/:script_id/')
    public static async listByScript(@Param("user_id") user_id: string, @Param("script_id") script_id: string): Promise<MethodResult<ResultsModel[]>> {
        try {
            const client = await DB();
            const resultObject = await client.query('SELECT "Date", "ID" from  public.results WHERE "UserId"=$1 AND "ScriptId"=$2  ', [user_id, script_id])
            if (resultObject.rows.length > 0) {
                return new MethodResult(resultObject.rows);
            }
        }
        catch (error) {
            console.error(error);
        }
    }


    @Method(Verbs.Get, '/results/:user_id/:script_id/:embed_id/')
    public static async list(@Param("user_id") user_id: string, @Param("script_id") script_id: string, @Param("embed_id") embed_id: string): Promise<MethodResult<ResultsModel[]>> {
        try {
            const client = await DB();
            const resultObject = await client.query('SELECT "Date", "ID" from  public.results WHERE "UserId"=$1 AND "ScriptId"=$2 and "EmbedId"=$3  ', [user_id, script_id, embed_id])
            if (resultObject.rows.length > 0) {
                return new MethodResult(resultObject.rows);
            }
        }
        catch (error) {
            console.error(error);
        }
    }



    @Method(Verbs.Get, '/results/:user_id/:script_id/:embed_id/:result_id')
    public static async get(@Param("user_id") user_id: string, @Param("script_id") script_id: string, @Param("embed_id") embed_id: string, @Param("result_id") result_id: any): Promise<MethodResult<ResultsModel>> {
        try {
            const client = await DB();
            const resultObject = await client.query('SELECT * from  public.results WHERE "UserId"=$1 AND "ScriptId"=$2 and "EmbedId"=$3 AND "ID"=$4 ', [user_id, script_id, embed_id, result_id])
            if (resultObject.rows.length > 0) {
                return new MethodResult(resultObject.rows[0]);
            }
        }
        catch (error) {
            console.error(error);
        }
    }


    @Method(Verbs.Post, '/results/:user_id/:script_id/:embed_id')
    public static async results(@Param("user_id") user_id: string, @Param("script_id") script_id: string, @Param("embed_id") embed_id: string, @Body() results: any): Promise<MethodResult<boolean>> {
        try {
            const client = await DB();
            const createdObject = await client.query('INSERT INTO public.results("UserId", "ScriptId", "EmbedId", "Data", "Date") VALUES($1,$2,$3,$4,$5) RETURNING "ID"', [user_id, script_id, embed_id, JSON.stringify(results), new Date()])
            return new MethodResult(createdObject);
        }
        catch (error) {
            console.error(error);
        }
    }


}