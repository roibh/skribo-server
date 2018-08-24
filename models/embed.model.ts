import { Variable } from "./script.model";

export interface EmbedModel {
    ID?: number;
    GroupId?: any;
    ScriptId?: string;
    EmbedId?: string;
    Variables?: Variable[];
    Name?: string;
    Page?: string;
}