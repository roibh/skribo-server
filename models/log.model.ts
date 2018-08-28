import { Field, Model, Repo } from '@methodus/data';

@Model('Log')
export class LogModel extends Repo<LogModel>{
    constructor(copyData?: any) {
        super(copyData, LogModel);
    }

    @Field()
    ID?: number;
    @Field()
    Log: any;
    @Field()
    ScriptId: string;
    @Field()
    EmbedId: string;
    @Field()
    GroupId: string;

}