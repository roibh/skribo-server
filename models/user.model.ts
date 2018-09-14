import { Repo, Field, Model } from '@methodus/data';
@Model('User')
export class UserModel extends Repo<UserModel> {

    @Field()
    public ID?: number;
    @Field()
    public GroupId?: any;
    @Field()
    public FirstName?: string;
    @Field()
    public LastName?: string;
    constructor(copyData?: any) {
        super(copyData, UserModel);
    }
}
