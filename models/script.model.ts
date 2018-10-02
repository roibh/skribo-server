import { Field, Model, Repo } from '@methodus/data';
import { VariableModel } from '../';
/*start custom*/
import { ResultsDescriptor } from './index';
/*end custom*/
@Model('Scripts')
export class ScriptModel extends Repo<ScriptModel> {

    @Field()
    public ScriptId?: string;
    @Field()
    public Variables?: VariableModel[];
    @Field()
    public Code?: string;
    @Field()
    public Name?: string;
    @Field()
    public Description?: string;
    @Field()
    public GroupId?: string;
    @Field()
    public ResultsDescriptor?: ResultsDescriptor;

    constructor(copyData?: any) {
        super(copyData, ScriptModel);
    }
}
