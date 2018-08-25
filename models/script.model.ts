import { VariableModel } from "../";

export interface ScriptModel {
    ScriptId?: string;
    Variables?: VariableModel[];
    Code?: string;
    Name?: string;
    Description?: string;
    GroupId?: string;
    ResultsDescriptor?: object;
}

