import { Field, Model, Repo } from '@methodus/data';
import { VariableModel } from '../';
/*start custom*/

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
    public ResultsDescriptor?: any;

    constructor(copyData?: any) {
        super(copyData, ScriptModel);
    }
}
