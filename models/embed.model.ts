import { VariableModel } from "../";

 
export interface EmbedModel {
    ID?: number;
    GroupId?: any;
    ScriptId?: string;
    EmbedId?: string;
    Variables?: VariableModel[];
    Name?: string;
    Page?: string;
}