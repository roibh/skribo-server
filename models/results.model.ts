

import { Field, Model, Repo } from '@methodus/data';

@Model('Results')
export class ResultsModel extends Repo<ResultsModel>{
    constructor(copyData?: any) {
        super(copyData, ResultsModel);
    }

    @Field()
    ID?: number;
    @Field()
    GroupId?: any;
    @Field()
    ScriptId?: string;
    @Field()
    EmbedId?: string;
    @Field()
    Variables?: string[];
    @Field()
    Date?: Date;
    @Field()
    Data?: any;

}