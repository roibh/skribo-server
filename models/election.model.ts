import { Repo, Field, Model } from '@methodus/data';
@Model('Election')
export class ElectionModel extends Repo<ElectionModel> {

    @Field()
    public ID?: number;
    @Field()
    public FirstName?: string;
    @Field()
    public LastName?: string;
    @Field()
    public FatherName?: string;
    @Field()
    public Phone?: string;
    @Field()
    public Checked?: boolean;
    constructor(copyData?: any) {
        super(copyData, ElectionModel);
    }
}
