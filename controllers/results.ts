/*

____ _  _ ____ _ ___  ____ 
[__  |_/  |__/ | |__] |  | 
___] | \_ |  \ | |__] |__| 
                           

*/

import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';

import { ResultsModel } from '../models/';
import { DBHandler, Query as DataQuery } from '@methodus/data';
import { hashCode } from '../db/hash';
const uuidv1 = require('uuid/v1');

@MethodConfig('Results')
export class Results {

    @Method(Verbs.Post, '/results/:script_id/:group_id/:embed_id')
    public static async create(@Param("group_id") group_id: string, @Param("script_id") script_id: string, @Param("embed_id") embed_id: string, @Body() body: any): Promise<MethodResult<ResultsModel>> {
        try {
            console.log('typeof', typeof body === 'string');
            if (typeof body === 'string') {
                body = JSON.parse(body);
            }
            let results = body.results;
            if (typeof results === 'string') {
                results = JSON.parse(results);
            }
            const db = await DBHandler.getConnection();
            const tableName = 'RESULTS_' + hashCode(group_id + script_id);

            const result_id = uuidv1();
            const resultObject = new ResultsModel({ Date: new Date(), GroupId: group_id, ScriptId: script_id, EmbedId: embed_id, ResultId: result_id });
            await resultObject.save();
            if (Array.isArray(results)) {
                for (let i = 0; i < results.length; i++) {
                    const rowObject = results[i];
                    try {
                        rowObject.ResultId = result_id
                        const insertResult = await db.collection(tableName).insertOne(rowObject);
                    } catch (error) {
                        console.error(error);
                    }
                }
            } else {
                Object.keys(results).forEach(async (item) => {
                    for (let i = 0; i < results[item].length; i++) {
                        const rowObject = results[item][i];

                        try {
                            rowObject.ResultId = result_id
                            const insertResult = await db.collection(tableName).insertOne(rowObject);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                })

            }
            return new MethodResult(resultObject);
        } catch (error) {
            console.error(error);
            throw (new MethodError(error));
        }

    }
    catch(error) {
        throw (new MethodError(error));
    }




    @Method(Verbs.Get, '/results/:script_id/:group_id')
    public static async listByScript(@Param("group_id") group_id: string, @Param("script_id") script_id: string): Promise<MethodResult<ResultsModel[]>> {
        try {
            const results = (await new DataQuery(ResultsModel).filter({ GroupId: group_id, ScriptId: script_id }).run());
            if (results.length > 0) {
                return new MethodResult(results);
            }
        }
        catch (error) {
            throw (new MethodError(error));
        }
    }


    @Method(Verbs.Get, '/results/:script_id/:group_id/:embed_id')
    public static async list(@Param("group_id") group_id: string, @Param("script_id") script_id: string, @Param("embed_id") embed_id: string): Promise<MethodResult<ResultsModel[]>> {
        try {

            const results = (await new DataQuery(ResultsModel).filter({ GroupId: group_id, ScriptId: script_id, EmbedId: embed_id }).run());
            if (results.length > 0) {
                return new MethodResult(results);
            }


        }
        catch (error) {
            throw (new MethodError(error));
        }
    }



    @Method(Verbs.Get, '/results/:script_id/:group_id/:embed_id/:result_id')
    public static async get(@Param("group_id") group_id: string, @Param("script_id") script_id: string, @Param("embed_id") embed_id: string, @Param("result_id") result_id: any): Promise<MethodResult<ResultsModel>> {
        try {
            const results = (await new DataQuery(ResultsModel).filter({ GroupId: group_id, ScriptId: script_id, EmbedId: embed_id, ResultId: result_id }).run());
            if (results.length > 0) {
                return new MethodResult(results);
            }


        }
        catch (error) {
            throw (new MethodError(error));
        }
    }





    @Method(Verbs.Delete, '/results/:script_id/:group_id/:embed_id/:result_id')
    public static async delete(@Param("group_id") group_id: string, @Param("script_id") script_id: string, @Param("embed_id") embed_id: string, @Param("result_id") result_id: string): Promise<MethodResult<boolean>> {
        try {
            const deleteResult = await ResultsModel.delete({ GroupId: group_id, ScriptId: script_id, EmbedId: embed_id, ID: result_id });
            return new MethodResult(deleteResult);
        }
        catch (error) {
            throw (new MethodError(error));

        }
    }
}