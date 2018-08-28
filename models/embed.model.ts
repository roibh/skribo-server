import { Repo, Field, Model } from '@methodus/data'
import { VariableModel } from './variable.model';


@Model('Embed')
export class EmbedModel extends Repo<EmbedModel>{
    constructor(copyData?: any) {
        super(copyData, EmbedModel);
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
    Variables?: VariableModel[];
    @Field()
    Name?: string;
    @Field()
    Page?: string;
}
