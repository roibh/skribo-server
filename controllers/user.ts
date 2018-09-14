/*

____ _  _ ____ _ ___  ____
[__  |_/  |__/ | |__] |  |
___] | \_ |  \ | |__] |__|

*/

import { Body, Method, MethodConfig, Param, Query, Verbs, MethodError, MethodResult } from '@methodus/server';
import { Query as DataQuery } from '@methodus/data';
import * as uuidv1 from 'uuid/v1';
import { GroupModel, UserGroupModel, UserModel } from '../models';

@MethodConfig('User')
export class User {
    @Method(Verbs.Get, '/user/:user_id/')
    public static async get(@Param('user_id') userId: string): Promise<MethodResult<any>> {
        try {
            const userquery = (await new DataQuery(UserModel).filter({ UserId: userId }).run());
            const groupResult = (await new DataQuery(UserModel).filter({
                GroupId: { $in: userquery.map((item) => item.GroupId) },
            }).run());

            if (groupResult) {
                return new MethodResult(groupResult);
            }
            throw (new MethodError('not found', 404));
        } catch (error) {
            throw (error);
        }
    }
    @Method(Verbs.Get, '/user/:user_id/groups')
    public static async getGroups(@Param('user_id') userId: string): Promise<MethodResult<any>> {
        try {
            const userquery = (await new DataQuery(UserGroupModel).filter({ UserId: userId }).run());
            const groupResult = (await new DataQuery(GroupModel).filter({
                GroupId: { $in: userquery.map((item) => item.GroupId) },
            }).run());

            if (groupResult) {
                return new MethodResult(groupResult);
            }
        } catch (error) {
            throw (error);
        }
    }

    @Method(Verbs.Post, '/user/:user_id/group')
    public static async attachToGroup(
        @Param('user_id') userId: string,
        @Body('data', 'object') userData: any): Promise<MethodResult<string>> {
        try {
            const groupResult = await UserGroupModel.query(new DataQuery(UserGroupModel).filter({ UserId: userId }));
            if (groupResult.length === 0) {
                const groupModel = new GroupModel({ Name: userData.Name, Date: new Date(), GroupId: uuidv1() });
                const insertResult: GroupModel = await groupModel.save();
                if (insertResult) {
                    const userGroupModel = new UserGroupModel({ GroupId: insertResult.GroupId, UserId: userId });
                    const attachResult = await userGroupModel.save();
                    return new MethodResult(attachResult);
                }
            } else {
                return new MethodResult(groupResult[0]);
            }
        } catch (error) {
            throw (error);
        }
    }

    @Method(Verbs.Delete, '/user/:user_id/')
    public static async delete(@Param('user_id') userId: string): Promise<MethodResult<string>> {
        try {
            const deleteResult = await UserGroupModel.delete({ UserId: userId });
            return new MethodResult(deleteResult);
        } catch (error) {
            throw (error);
        }
    }

    @Method(Verbs.Delete, '/group/:group_id/')
    public static async deleteGroup(@Param('group_id') groupId: string): Promise<MethodResult<string>> {
        try {
            const deleteResult = await GroupModel.delete({ GroupId: groupId });
            return new MethodResult(deleteResult);
        } catch (error) {
            throw (error);
        }
    }
}
