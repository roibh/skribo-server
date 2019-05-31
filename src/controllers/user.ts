/*

____ _  _ ____ _ ___  ____
[__  |_/  |__/ | |__] |  |
___] | \_ |  \ | |__] |__|

*/

import { Body, Method, MethodConfig, Param, Query, Verbs, MethodError, MethodResult } from '@methodus/server';
import { Query as DataQuery } from '@methodus/data';
import * as uuidv1 from 'uuid/v1';
import { GroupModel, UserGroupModel } from '../models';

@MethodConfig('User')
export class User {
    @Method(Verbs.Get, '/user/:user_id/groups')
    public static async getGroups(@Param('user_id') userId: string): Promise<MethodResult<any>> {
        try {
            const userquery = await User.getUserGroup(userId);
            const groupResult = (await new DataQuery(GroupModel).filter(User.getGroupParams(userquery)).run());
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
            const groupResult: any = await User.getUserGroup(userId);

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
            const UserGroupRepo = UserGroupModel;
            const deleteResult = await UserGroupRepo.delete({ UserId: userId });
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

    private static async  getUserGroup(userId) {
        return await UserGroupModel.query(new DataQuery(UserGroupModel).filter({ UserId: userId }));
    }

    private static async getGroupParams(userquery) {
        return { GroupId: { $in: userquery.map((item) => item.GroupId) } };
    }
}
