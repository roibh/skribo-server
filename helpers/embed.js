"use strict";
/*

____ _  _ ____ _ ___  ____
[__  |_/  |__/ | |__] |  |
___] | \_ |  \ | |__] |__|
                           

*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models/");
const uuidv1 = require('uuid/v1');
class EmbedHelper {
    static update(embed, script_id, group_id, embed_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedDocument = yield models_1.EmbedModel.save(embed);
            return updatedDocument;
            // try {
            //     const client = await DB();
            //     const updateObject = await client.query(`UPDATE public.embeds SET "Name"=$1, "Variables"=$2 , "Page"=$6 WHERE "EmbedId"=$3 and "ScriptId"=$4 and "GroupId"=$5;`, [embed.Name, JSON.stringify(embed.Variables), embed_id, script_id, group_id, embed.Page])
            //     const InstanceScript = await client.query('SELECT * FROM public.embeds WHERE "ScriptId"=$1 and "GroupId"=$2 and "EmbedId"=$3', [script_id, group_id, embed_id], ResultType.Single);
            //     return new MethodResult(InstanceScript)
            // }
            // catch (error) {
            //     console.error(error);
            // }
        });
    }
    static get(script_id, group_id, embed_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            //     const client = await DB();
            //     const InstanceScript = await client.query('SELECT * FROM public.embeds WHERE "ScriptId"=$1 and "GroupId"=$2 and "EmbedId"=$3', [script_id, group_id, embed_id]);
            //     const RawScript = await client.query('SELECT * FROM public.scripts WHERE "ID"=$1', [script_id]);
            //     return new MethodResult(InstanceScript);
            // }
            // catch (error) {
            //     console.error(error);
            // }
        });
    }
    static list(script_id, group_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            //     const client = await DB();
            //     const InstanceScript = await client.query('SELECT * FROM public.embeds WHERE "ScriptId"=$1 and "GroupId"=$2', [script_id, group_id]);
            //     return new MethodResult(InstanceScript);
            // }
            // catch (error) {
            //     console.error(error);
            // }
        });
    }
    static delete(script_id, group_id, embed_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            //     const client = await DB();
            //     const InstanceScript = await client.query('DELETE FROM public.embeds WHERE "ScriptId"=$1 and "GroupId"=$2 and "EmbedId"=$3', [script_id, group_id, embed_id]);
            //     return new MethodResult(InstanceScript.length);
            // }
            // catch (error) {
            //     console.error(error);
            // }
        });
    }
    static create(embed, script_id, group_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            //     const client = await DB();
            //     const createdObject = await client.query('INSERT INTO public.embeds("Name", "ScriptId", "GroupId", "Variables", "EmbedId", "Page") VALUES($1,$2,$3, $4,$5,$6) RETURNING "EmbedId"', [embed.Name, script_id, group_id, JSON.stringify(embed.Variables), uuidv1(), embed.Page])
            //     if (createdObject.length > 0) {
            //         return new MethodResult(createdObject[0]);
            //     } else {
            //         throw (new Error('failed to create the embed'))
            //     }
            // }
            // catch (error) {
            //     throw (new MethodError(error))
            // }
        });
    }
}
exports.EmbedHelper = EmbedHelper;
//# sourceMappingURL=embed.js.map