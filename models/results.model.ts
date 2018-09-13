

import { Field, Model, Repo } from '@methodus/data';

@Model('Results')
export class ResultsModel extends Repo<ResultsModel>{
    constructor(copyData?: any) {
        super(copyData, ResultsModel);
    }

    @Field()
    ResultId?: string;
    @Field()
    GroupId?: string;
    @Field()
    ScriptId?: string;
    @Field()
    EmbedId?: string;
    @Field()
    Template?: string;
    @Field()
    Variables?: string[];
    @Field()
    Date?: Date;
    @Field()
    Data?: any;
    @Field()
    TableName?: string;

}