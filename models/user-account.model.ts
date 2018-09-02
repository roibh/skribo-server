import { Repo, Field, Model } from '@methodus/data'



@Model('UserAccount')
export class UserAccountModel extends Repo<UserAccountModel>{
    constructor(copyData?: any) {
        super(copyData, UserAccountModel);
    }
    @Field()
    AccountKey?: string;
    @Field()
    GroupId?: string;
    @Field()
    AccountName?: string;
}
