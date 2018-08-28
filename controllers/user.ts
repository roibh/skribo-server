/*

____ _  _ ____ _ ___  ____ 
[__  |_/  |__/ | |__] |  | 
___] | \_ |  \ | |__] |__| 
                           

*/

import { Body, Method, MethodConfig, MethodType, Param, Response, Query, Verbs, MethodError, MethodResult } from '@methodus/server';
import { DB, ResultType } from '../db';
import { ScriptModel } from '../models/script.model';
import { EmbedModel } from '../models/embed.model';
import { Repo, Query as DataQuery } from '@methodus/data';
import * as FS from 'fs';
import { GroupModel, UserGroupModel, UserModel } from '../models';
const Raven = require('raven');
const uuidv1 = require('uuid/v1');

@MethodConfig('User')
export class User {

    @Method(Verbs.Get, '/user/:user_id/')
    public static async get(@Param("user_id") user_id: string): Promise<MethodResult<any>> {
        try {


            const userquery = (await new DataQuery(UserModel).filter({ UserId: user_id }).run());
            const groupResult = (await new DataQuery(UserModel).filter({ GroupId: { $in: userquery.map(item => item.GroupId) } }).run());


            if (groupResult) {
                return new MethodResult(groupResult);
            }
            throw (new MethodError('not found', 404));

        }
        catch (error) {
            throw (error);
        }
    }
    @Method(Verbs.Get, '/user/:user_id/groups')
    public static async getGroups(@Param('user_id') user_id: string): Promise<MethodResult<any>> {
        try {
            const userquery = (await new DataQuery(UserGroupModel).filter({ UserId: user_id }).run());
            const groupResult = (await new DataQuery(GroupModel).filter({ GroupId: { $in: userquery.map(item => item.GroupId) } }).run());


            if (groupResult) {
                return new MethodResult(groupResult);
            }


            // const client = await DB();
            // const groupResult = await client.query(`SELECT "Name", user_groups."GroupId", "Status"
            // FROM user_groups INNER JOIN groups ON (user_groups."GroupId" = groups."GroupId") WHERE  "UserId"=$1;`, [user_id]);

            // return new MethodResult(groupResult);


        }
        catch (error) {
            throw (error);
        }
    }
    @Method(Verbs.Post, '/user/:user_id/group')
    public static async attachToGroup(@Param("user_id") user_id: string, @Body('data', 'object') userData: any): Promise<MethodResult<string>> {
        try {
            const group_id = userData.GroupId;
            //const groupValidationResult = await GroupModel.query(new DataQuery(GroupModel).filter({ GroupId: group_id }));
            //if (groupValidationResult.length === 0 ) {
            const groupResult = await UserGroupModel.query(new DataQuery(UserGroupModel).filter({ UserId: user_id }));
            //are there groups for this user?
            if (groupResult.length === 0) {
                const groupModel = new GroupModel({ Name: userData.Name, Date: new Date(), GroupId: uuidv1() });
                const insertResult: GroupModel = await groupModel.save();
                if (insertResult) {
                    const userGroupModel = new UserGroupModel({ GroupId: insertResult.GroupId, UserId: user_id });
                    const attachResult = await userGroupModel.save();
                    return new MethodResult(attachResult);
                }
            } else {
                return new MethodResult(groupResult[0]);
            }
            //}

            // const groupResult = await client.query(`SELECT "Name", public.user_groups."GroupId", "Status"
            // FROM public.user_groups INNER JOIN public.groups ON(public.user_groups."GroupId" = public.groups."GroupId") WHERE  "UserId" = $1 AND public.user_groups."GroupId"=$2; `, [user_id, group_id]);

            // if (groupResult.length === 0) {
            //     //const insertResult = await client.query(`INSERT INTO public.groups("Name", "Date", "GroupId") VALUES($1, $2, $3)  RETURNING "GroupId"`, [userData.Name, new Date(), uuidv1()]);
            //     // if (insertResult.rowCount > 0) {
            //     const attachResult = await client.query(`INSERT INTO public.user_groups("GroupId", "UserId") VALUES($1, $2)  RETURNING "GroupId"`, [group_id, user_id]);

            //     return new MethodResult(attachResult[0]);
            //     //}

            // }


        }
        catch (error) {
            throw (error);
        }
    }

    @Method(Verbs.Delete, '/user/:user_id/')
    public static async delete(@Param("user_id") user_id: string): Promise<MethodResult<string>> {
        try {
            const client = await DB();
            const deleteResult = await client.query(`DELETE from user_groups WHERE "UserId"=$1`, [user_id]);
            return new MethodResult(deleteResult);
        }
        catch (error) {
            throw (error);
        }
    }

    @Method(Verbs.Delete, '/group/:group_id/')
    public static async deleteGroup(@Param("group_id") group_id: string): Promise<MethodResult<string>> {
        try {
            const client = await DB();
            const deleteResult = await client.query(`DELETE from groups WHERE "GroupId"=$1`, [group_id]);
            return new MethodResult(deleteResult);
        }
        catch (error) {
            throw (error);
        }
    }




}