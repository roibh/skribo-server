import { Field, Model, Repo } from '@methodus/data';

@Model('Log')
export class LogModel extends Repo<LogModel> {

    @Field()
    public ID?: number;
    @Field()
    public Log: any;
    @Field()
    public ScriptId: string;
    @Field()
    public EmbedId: string;
    @Field()
    public GroupId: string;
    constructor(copyData?: any) {
        super(copyData, LogModel);
    }
}
