import { Repo, Field, Model, ObjectId } from '@methodus/data'



@Model('UserGroups')
export class UserGroupModel extends Repo<UserGroupModel>{
    constructor(copyData?: any) {
        super(copyData, UserGroupModel);
    }

    @ObjectId()
    @Field()
    _id?: string;
    @Field()
    UserId?: string;
    @Field()
    GroupId?: string;
}
