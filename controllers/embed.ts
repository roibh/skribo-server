/*

____ _  _ ____ _ ___  ____
[__  |_/  |__/ | |__] |  |
___] | \_ |  \ | |__] |__|
*/

import { Body, Method, MethodConfig, Param, Query, Verbs, MethodError, MethodResult } from '@methodus/server';
import { Query as DataQuery } from '@methodus/data';
import * as uuidv1 from 'uuid/v1';
import { AutoLogger } from 'logelas';
import { ScriptModel } from '../models/script.model';
import { EmbedModel } from '../models/embed.model';

@MethodConfig('Embed')
export class Embed {
    @Method(Verbs.Put, '/embed/:script_id/:group_id/:embed_id')
    public static async update(
        @Body('embed') embed: EmbedModel,
        @Param('script_id') scriptId: string,
        @Param('group_id') groupId: string,
        @Param('embed_id') embedId: string):
        Promise<MethodResult<ScriptModel>> {

        try {
            if (!embed.ScriptId) {
                throw (new MethodError('no data'));
            }

            delete embed._id;
            delete embed.ScriptId;
            delete embed.GroupId;
            delete embed.EmbedId;
            const updateResults = await EmbedModel.update({
                EmbedId: embedId,
                GroupId: groupId,
                ScriptId: scriptId,
            }, embed);
            return new MethodResult(updateResults);
        } catch (error) {
            AutoLogger.error(error);
        }
    }

    @Method(Verbs.Get, '/embed/:script_id/:group_id/:embed_id')
    public static async get(
        @Param('script_id') scriptId: string,
        @Param('group_id') groupId: string,
        @Param('embed_id') embedId: string):
        Promise<MethodResult<ScriptModel>> {
        try {
            const listResults = await EmbedModel.query(new DataQuery(EmbedModel).filter({
                EmbedId: embedId,
                GroupId: groupId,
                ScriptId: scriptId,
            }));
            return new MethodResult(listResults);
        } catch (error) {
            AutoLogger.error(error);
        }
    }

    @Method(Verbs.Get, '/embed/:script_id/:group_id/')
    public static async list(
        @Param('script_id') scriptId: string,
        @Param('group_id') groupId: string):
        Promise<MethodResult<EmbedModel[]>> {
        try {
            const pred = new DataQuery(EmbedModel).filter({ ScriptId: scriptId, GroupId: groupId });
            const InstanceScript = await pred.run();
            return new MethodResult(InstanceScript);
        } catch (error) {
            AutoLogger.error(error);
        }
    }

    @Method(Verbs.Delete, '/embed/:script_id/:group_id/:embed_id')
    public static async delete(
        @Param('script_id') scriptId: string,
        @Param('group_id') groupId: string,
        @Param('embed_id') embedId: string): Promise<MethodResult<boolean>> {
        try {
            const InstanceScript = await EmbedModel.delete({ ScriptId: scriptId, GroupId: groupId, EmbedId: embedId });
            return new MethodResult(InstanceScript);
        } catch (error) {
            AutoLogger.error(error);
        }
    }

    @Method(Verbs.Post, '/embed/:script_id/:group_id')
    public static async create(
        @Body('embed') embed: EmbedModel,
        @Param('script_id') scriptId: string,
        @Param('group_id') groupId: string): Promise<MethodResult<ScriptModel>> {

        // if (!embed.ScriptId) {
        //     throw (new MethodError('bad request', 400));
        // }
        try {
            embed.ScriptId = scriptId;
            embed.GroupId = groupId;
            embed.EmbedId = uuidv1();

            const createdObject = await EmbedModel.insert(embed);
            if (createdObject) {
                return new MethodResult(createdObject);

            } else {
                throw (new Error('failed to create the embed'));
            }
        } catch (error) {
            throw (new MethodError(error));
        }
    }

}
