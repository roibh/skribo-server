import { Field, Model, Repo } from '@methodus/data';

@Model('Results')
export class ResultsModel extends Repo<ResultsModel> {

    @Field()
    public ResultId?: string;
    @Field()
    public GroupId?: string;
    @Field()
    public ScriptId?: string;
    @Field()
    public EmbedId?: string;
    @Field()
    public Template?: string;
    @Field()
    public Variables?: any;
    @Field()
    public Date?: Date;
    @Field()
    public Data?: any;
    @Field()
    public TableName?: string;
    constructor(copyData?: any) {
        super(copyData, ResultsModel);
    }
}
