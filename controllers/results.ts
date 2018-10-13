/*

____ _  _ ____ _ ___  ____
[__  |_/  |__/ | |__] |  |
___] | \_ |  \ | |__] |__|

*/

import { DBHandler, Query as DataQuery, Repo } from '@methodus/data';
import { Body, Method, MethodConfig, MethodError, MethodResult, Param, Query, Verbs } from '@methodus/server';
import { AutoLogger } from 'logelas';
import * as uuidv1 from 'uuid/v1';
import * as hash from 'object-hash';

import { ResultsModel, ScriptModel } from '../models/';
@MethodConfig('Results')
export class Results {

    @Method(Verbs.Post, '/results/:script_id/:group_id/:embed_id')
    public static async create(
        @Param('group_id') groupId: string,
        @Param('script_id') scriptId: string,
        @Param('embed_id') embedId: string,
        @Body() body: any): Promise<MethodResult<ResultsModel>> {
        try {
            const results = this.verifyBody(body);
            const resultId = uuidv1();
            const resultObject = new ResultsModel({
                Date: new Date(),
                EmbedId: embedId,
                GroupId: groupId,
                ResultId: resultId,
                ScriptId: scriptId,
            });
            if (results.reportType === 'embeded') {
                resultObject.Data = results;
            } else {
                const tableName = 'RESULTS_' + hash(groupId + scriptId);
                resultObject.TableName = tableName;
                this.storeResults(results, tableName, resultId);
            }

            await resultObject.save();

            try {
                await ScriptModel.update({ ScriptId: scriptId },
                    { LastRunDate: new Date(), LastResultId: resultId });

            } catch (error) {
                console.error(error);
            }


            return new MethodResult(resultObject);
        } catch (error) {
            throw (new MethodError(error));
        }
    }

    @Method(Verbs.Get, '/results/:script_id/:group_id')
    public static async listByScript(@Param('group_id') groupId: string, @Param('script_id') scriptId: string):
        Promise<MethodResult<ResultsModel[]>> {
        const results = (await new DataQuery(ResultsModel).filter({ GroupId: groupId, ScriptId: scriptId }).run());
        return new MethodResult(results);
    }

    @Method(Verbs.Get, '/results/:script_id/:group_id/:embed_id')
    public static async list(
        @Param('group_id') groupId: string,
        @Param('script_id') scriptId: string,
        @Param('embed_id') embedId: string): Promise<MethodResult<ResultsModel[]>> {
        try {
            const results = (await new DataQuery(ResultsModel).filter({
                EmbedId: embedId,
                GroupId: groupId,
                ScriptId: scriptId,
            }).run());
            if (results.length > 0) {
                return new MethodResult(results);
            }
        } catch (error) {
            throw (new MethodError(error));
        }
    }

    @Method(Verbs.Get, '/results/:script_id/:group_id/:embed_id/:result_id')
    public static async get(
        @Param('group_id') groupId: string,
        @Param('script_id') scriptId: string,
        @Param('embed_id') embedId: string,
        @Param('result_id') resultId: any): Promise<MethodResult<ResultsModel>> {
        try {
            const results = (await new DataQuery(ResultsModel).filter({
                EmbedId: embedId,
                GroupId: groupId,
                ResultId: resultId,
                ScriptId: scriptId,
            }).run());

            if (results[0].Data) {
                return new MethodResult(results[0]);
            }
            if (results.length > 0) {
                const db = await DBHandler.getConnection();
                const tableName = 'RESULTS_' + hash(groupId + scriptId);
                let reportResults = await db.collection(tableName).find({ ResultId: resultId }).toArray();

                reportResults = reportResults.map((item) => {
                    delete item._id;
                    delete item.ResultId;
                    return item;
                });
                const returnObject = Object.assign({}, results[0], { Data: reportResults });
                return new MethodResult(returnObject);
            }
        } catch (error) {
            throw (new MethodError(error));
        }
    }

    @Method(Verbs.Get, '/results-sample/:script_id/:group_id/')
    public static async getSample(
        @Param('group_id') groupId: string,
        @Param('script_id') scriptId: string,
    ): Promise<MethodResult<any>> {

        try {
            const db = await DBHandler.getConnection();
            const tableName = 'RESULTS_' + hash(groupId + scriptId);
            const reportResults = await db.collection(tableName).find({}).limit(1).toArray();
            return new MethodResult(reportResults);
        } catch (error) {
            throw (new MethodError(error));
        }
    }

    @Method(Verbs.Delete, '/results/:script_id/:group_id/:embed_id/:result_id')
    public static async delete(
        @Param('group_id') groupId: string,
        @Param('script_id') scriptId: string,
        @Param('embed_id') embedId: string,
        @Param('result_id') resultId: string): Promise<MethodResult<boolean>> {
        try {
            const deleteResult = await ResultsModel.delete({
                EmbedId: embedId,
                GroupId: groupId,
                ResultId: resultId,
                ScriptId: scriptId,
            });
            const db = await DBHandler.getConnection();
            const tableName = 'RESULTS_' + hash(groupId + scriptId);
            const tableDelete = await db.collection(tableName).deleteMany({ ResultId: resultId });
            return new MethodResult(deleteResult);
        } catch (error) {
            throw (new MethodError(error));
        }
    }

    private static verifyBody(body: any) {
        if (typeof body === 'string') {
            body = JSON.parse(body);
        }
        let results = body.results;
        if (typeof results === 'string') {
            results = JSON.parse(results);
        }
        return results;
    }

    private static async insertToDB(rowObject, tableName, resultId) {
        const db = await DBHandler.getConnection();
        try {
            rowObject.ResultId = resultId;
            const insertResult = await db.collection(tableName).insertOne(rowObject);
        } catch (error) {
            AutoLogger.error(error);
        }
    }
    private static async storeResults(results, tableName: string, resultId: string) {
        if (Array.isArray(results)) {
            results.forEach(async (rowObject) => {
                this.insertToDB(rowObject, tableName, resultId);
            });
        } else {
            Object.keys(results).forEach(async (item) => {
                results[item].forEach(async (rowObject) => {
                    rowObject.accountName = item;
                    this.insertToDB(rowObject, tableName, resultId);
                });
            });
        }
    }
}
