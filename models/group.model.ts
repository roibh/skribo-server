import { Repo, Field, Model, ObjectId } from '@methodus/data';
@Model('Group')
export class GroupModel extends Repo<GroupModel> {

    @ObjectId()
    @Field()
    public _id?: string;
    @Field()
    public Name?: string;
    @Field()
    public GroupId?: string;
    @Field()
    public Date?: Date;
    constructor(copyData?: any) {
        super(copyData, GroupModel);
    }

}
