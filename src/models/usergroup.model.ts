import { Repo, Field, Model, ObjectId } from '@methodus/data';

@Model('UserGroups')
export class UserGroupModel extends Repo<UserGroupModel> {
    @ObjectId()
    @Field()
    public _id?: string;
    @Field()
    public UserId?: string;
    @Field()
    public GroupId?: string;
    constructor(copyData?: any) {
        super(copyData, UserGroupModel);
    }
}
