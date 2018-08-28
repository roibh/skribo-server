import { Field, Model, Repo } from '@methodus/data';
import { VariableModel } from "../";


@Model('Scripts')
export class ScriptModel extends Repo<ScriptModel>{
    constructor(copyData?: any) {
        super(copyData, ScriptModel);
    }
    @Field()
    ScriptId?: string;
    @Field()
    Variables?: VariableModel[];
    @Field()
    Code?: string;
    @Field()
    Name?: string;
    @Field()
    Description?: string;
    @Field()
    GroupId?: string;
    @Field()
    ResultsDescriptor?: object;

}

