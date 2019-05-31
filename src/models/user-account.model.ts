import { Repo, Field, Model } from '@methodus/data';
@Model('UserAccount')
export class UserAccountModel extends Repo<UserAccountModel> {
    @Field()
    public AccountKey?: string;
    @Field()
    public GroupId?: string;
    @Field()
    public AccountName?: string;
    constructor(copyData?: any) {
        super(copyData, UserAccountModel);
    }
}
