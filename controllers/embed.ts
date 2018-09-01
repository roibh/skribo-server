/*

____ _  _ ____ _ ___  ____ 
[__  |_/  |__/ | |__] |  | 
___] | \_ |  \ | |__] |__| 
                           

*/

import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';
import { Query as DataQuery, ReturnType } from '@methodus/data';
import { DB, ResultType } from '../db';
import { AutoLogger } from 'logelas';
import { ScriptModel } from '../models/script.model';
import { EmbedModel } from '../models/embed.model';
const uuidv1 = require('uuid/v1');

@MethodConfig('Embed')
export class Embed {

    @Method(Verbs.Put, '/embed/:script_id/:group_id/:embed_id')
    public static async update(@Body('embed') embed: EmbedModel, @Param('script_id') script_id: string, @Param("group_id") group_id: string, @Param('embed_id') embed_id: string): Promise<MethodResult<ScriptModel>> {
        try {
            const updateResults = await EmbedModel.update({ ScriptId: script_id, GroupId: group_id, EmbedId: embed_id }, embed);
            return new MethodResult(updateResults)
        }
        catch (error) {
            AutoLogger.error(error);
        }
    }

    @Method(Verbs.Get, '/embed/:script_id/:group_id/:embed_id')
    public static async get(@Param('script_id') script_id: string, @Param("group_id") group_id: string, @Param("embed_id") embed_id: string): Promise<MethodResult<ScriptModel>> {
        try {
            const listResults = await EmbedModel.query(new DataQuery(EmbedModel).filter({ ScriptId: script_id, GroupId: group_id, EmbedId: embed_id }));
            return new MethodResult(listResults);
        }
        catch (error) {
            AutoLogger.error(error);
        }
    }

    @Method(Verbs.Get, '/embed/:script_id/:group_id/')
    public static async list(@Param('script_id') script_id: string, @Param("group_id") group_id: string): Promise<MethodResult<EmbedModel[]>> {
        try {
            const pred = new DataQuery(EmbedModel).filter({ ScriptId: script_id, GroupId: group_id });
            const InstanceScript = await pred.run();
            return new MethodResult(InstanceScript);
        }
        catch (error) {
            AutoLogger.error(error);
        }
    }

    @Method(Verbs.Delete, '/embed/:script_id/:group_id/:embed_id')
    public static async delete(@Param('script_id') script_id: string, @Param("group_id") group_id: string, @Param("embed_id") embed_id: string): Promise<MethodResult<boolean>> {
        try {

            const pred = new DataQuery(EmbedModel).filter({ ScriptId: script_id, GroupId: group_id, EmbedId: embed_id });
            const InstanceScript = await pred.run()
            return new MethodResult(InstanceScript);
        }
        catch (error) {
            AutoLogger.error(error);
        }
    }

    @Method(Verbs.Post, '/embed/:script_id/:group_id')
    public static async create(@Body('embed') embed: EmbedModel, @Param('script_id') script_id: string, @Param("group_id") group_id: string): Promise<MethodResult<ScriptModel>> {
        try {

            embed.EmbedId = uuidv1();
            const createdObject = await EmbedModel.insert(embed);
            if (createdObject) {
                return new MethodResult(createdObject);

            } else {
                throw (new Error('failed to create the embed'))
            }
        }
        catch (error) {
            throw (new MethodError(error))
        }
    }

}