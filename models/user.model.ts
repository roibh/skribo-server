import { Repo, Field, Model } from '@methodus/data'
 


@Model('User')
export class UserModel extends Repo<UserModel>{
    constructor(copyData?: any) {
        super(copyData, UserModel);
    }
    @Field()
    ID?: number;
    @Field()
    GroupId?: any;
    @Field()
    FirstName?: string;
    @Field()
    LastName?: string;
  
  
}
