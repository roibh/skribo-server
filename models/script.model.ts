
export interface ScriptModel {
    ScriptId?: string;
    Variables?: Variable[];
    Code?: string;
    Name?: string;
    Description?: string;
    GroupId?: string;
    ResultsDescriptor?: object;
}

export interface Variable {
    type: string;
    name: string;
    value: any;


}