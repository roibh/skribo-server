import { Repo, Field, Model, ObjectId } from '@methodus/data'



@Model('Group')
export class GroupModel extends Repo<GroupModel>{
    constructor(copyData?: any) {
        super(copyData, GroupModel);
    }

    @ObjectId()
    @Field()
    _id?: string;
    @Field()
    Name?: string;
    @Field()
    GroupId?: string;
    @Field()
    Date?: Date;
}
