/*

____ _  _ ____ _ ___  ____ 
[__  |_/  |__/ | |__] |  | 
___] | \_ |  \ | |__] |__| 
                           

*/

import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';
import { DB, ResultType } from '../db';
import { ResultsModel } from '../models/';
const uuidv1 = require('uuid/v1');

@MethodConfig('Results')
export class Results {

    @Method(Verbs.Post, '/results/:script_id/:group_id/:embed_id')
    public static async create(@Param("group_id") group_id: string, @Param("script_id") script_id: string, @Param("embed_id") embed_id: string, @Body() results: any[]): Promise<MethodResult<boolean>> {
        try {
            if (typeof results === 'string') {
                results = JSON.parse(results);
            }

            console.log(results);
            const client = await DB();

            const tableName = 'RESULTS_' + client.hashCode(group_id + script_id);

            try {
                const tableQuery = await client.query('SELECT EXISTS (SELECT 1 FROM   pg_tables WHERE  "schemaname"=$1 AND "tablename"=$2)',
                    ['public', tableName], ResultType.Single);



                const fields = Object.keys(results[0]).map((item) => {
                    if (!results[0][item])
                        return null;
                    let strType: string = typeof results[0][item];
                    if (strType === 'object' && Array.isArray(results[0][item])) {
                        strType = 'array';
                    }
                    if (strType === 'number' && results[0][item].toString().indexOf('.') > -1) {
                        strType = 'double precision';
                    }
                    return {
                        type: strType,
                        name: item
                    }
                });
                fields.push({ type: 'string', name: 'ResultId' });
                console.log(fields);
                console.log(tableQuery);
                if (!tableQuery.exists) {
                    console.log('creating table');
                    await client.createTable('public', tableName, fields);
                }

                console.log('table created');
                const result_id = uuidv1();
                const insertResultStr = `INSERT INTO public."results"("GroupId", "ScriptId", "EmbedId", "ResultId") 
                VALUES ($1,$2,$3,$4)`;

                await client.query(insertResultStr, [group_id, script_id, embed_id, result_id]);

                if (Array.isArray(results)) {
                    for (let i = 0; i < results.length; i++) {
                        const rowObject = results[i];
                        const insertStr = `INSERT INTO public."${tableName}"( ${fields.map(item => `"${item.name}"`).join(',')}) 
                    VALUES(${fields.map((item, index) => `$${index + 1}`).join(',')})
                    RETURNING "ID"`;

                        try {
                            rowObject.ResultId = result_id
                            const insertResult = await client.query(insertStr, Object.values(rowObject));

                        } catch (error) {
                            console.error(error);
                        }


                    }
                }
                return new MethodResult(true);
            } catch (error) {
                console.error(error);
                throw (new MethodError(error));
            }

        }
        catch (error) {
            throw (new MethodError(error));
        }
    }
    @Method(Verbs.Get, '/results/:script_id/:group_id')
    public static async listByScript(@Param("group_id") group_id: string, @Param("script_id") script_id: string): Promise<MethodResult<ResultsModel[]>> {
        try {
            const client = await DB();
            const resultObject = await client.query('SELECT "ScriptId", "EmbedId", "Date", "ID" from  public.results WHERE "GroupId"=$1 AND "ScriptId"=$2  ', [group_id, script_id])
            if (resultObject.length > 0) {
                return new MethodResult(resultObject);
            }
        }
        catch (error) {
            throw (new MethodError(error));
        }
    }


    @Method(Verbs.Get, '/results/:script_id/:group_id/:embed_id')
    public static async list(@Param("group_id") group_id: string, @Param("script_id") script_id: string, @Param("embed_id") embed_id: string): Promise<MethodResult<ResultsModel[]>> {
        try {
            const client = await DB();
            const resultObject = await client.query('SELECT "Date", "ID" from  public.results WHERE "GroupId"=$1 AND "ScriptId"=$2 and "EmbedId"=$3 Order by "Date" desc  ', [group_id, script_id, embed_id])
            if (resultObject.length > 0) {
                return new MethodResult(resultObject);
            }
        }
        catch (error) {
            throw (new MethodError(error));
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
            throw (new MethodError(error));
        }
    }





    @Method(Verbs.Delete, '/results/:script_id/:group_id/:embed_id/:result_id')
    public static async delete(@Param("group_id") group_id: string, @Param("script_id") script_id: string, @Param("embed_id") embed_id: string, @Param("result_id") result_id: string): Promise<MethodResult<boolean>> {
        try {
            const client = await DB();
            const createdObject = await client.query('DELETE FROM public.results WHERE "GroupId"=$1 AND "ScriptId"=$2 and "EmbedId"=$3 AND "ID"=$4  ', [group_id, script_id, embed_id, result_id]);
            return new MethodResult(createdObject);
        }
        catch (error) {
            throw (new MethodError(error));

        }
    }
}