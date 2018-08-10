"use strict";
/*

____ _  _ ____ _ ___  ____
[__  |_/  |__/ | |__] |  |
___] | \_ |  \ | |__] |__|
                           

*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@methodus/server");
const db_1 = require("../db");
const uuidv1 = require('uuid/v1');
let Embed = class Embed {
    static update(embed, script_id, group_id, embed_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const updateObject = yield client.query(`UPDATE public.embeds SET "Name"=$1, "Variables"=$2 , "Page"=$6 WHERE "EmbedId"=$3 and "ScriptId"=$4 and "GroupId"=$5;`, [embed.Name, JSON.stringify(embed.Variables), embed_id, script_id, group_id, embed.Page]);
                if (updateObject.rowCount > 0) {
                    const InstanceScript = yield client.query('SELECT * FROM public.embeds WHERE "ScriptId"=$1 and "GroupId"=$2 and "EmbedId"=$3', [script_id, group_id, embed_id]);
                    return new server_1.MethodResult(InstanceScript.rows[0]);
                }
                else {
                    throw (new server_1.MethodError('not found', 404));
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static get(script_id, group_id, embed_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const InstanceScript = yield client.query('SELECT * FROM public.embeds WHERE "ScriptId"=$1 and "GroupId"=$2 and "EmbedId"=$3', [script_id, group_id, embed_id]);
                const RawScript = yield client.query('SELECT * FROM public.scripts WHERE "ID"=$1', [script_id]);
                return new server_1.MethodResult(InstanceScript.rows);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static list(script_id, group_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const InstanceScript = yield client.query('SELECT * FROM public.embeds WHERE "ScriptId"=$1 and "GroupId"=$2', [script_id, group_id]);
                return new server_1.MethodResult(InstanceScript.rows);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static delete(script_id, group_id, embed_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const InstanceScript = yield client.query('DELETE FROM public.embeds WHERE "ScriptId"=$1 and "GroupId"=$2 and "EmbedId"=$3', [script_id, group_id, embed_id]);
                return new server_1.MethodResult(InstanceScript.rowCount);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static create(embed, script_id, group_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const createdObject = yield client.query('INSERT INTO public.embeds("Name", "ScriptId", "GroupId", "Variables", "EmbedId", "Page") VALUES($1,$2,$3, $4,$5,$6) RETURNING "EmbedId"', [embed.Name, script_id, group_id, JSON.stringify(embed.Variables), uuidv1(), embed.Page]);
                if (createdObject.rows && createdObject.rows.length > 0) {
                    return new server_1.MethodResult(createdObject.rows[0]);
                }
                else {
                    throw (new Error('failed to create the embed'));
                }
            }
            catch (error) {
                throw (new server_1.MethodError(error));
            }
        });
    }
};
__decorate([
    server_1.Method("PUT" /* Put */, '/embed/:script_id/:group_id/:embed_id'),
    __param(0, server_1.Body('embed')), __param(1, server_1.Param('script_id')), __param(2, server_1.Param("group_id")), __param(3, server_1.Param('embed_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], Embed, "update", null);
__decorate([
    server_1.Method("GET" /* Get */, '/embed/:script_id/:group_id/:embed_id'),
    __param(0, server_1.Param('script_id')), __param(1, server_1.Param("group_id")), __param(2, server_1.Param("embed_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], Embed, "get", null);
__decorate([
    server_1.Method("GET" /* Get */, '/embed/:script_id/:group_id/'),
    __param(0, server_1.Param('script_id')), __param(1, server_1.Param("group_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], Embed, "list", null);
__decorate([
    server_1.Method("DELETE" /* Delete */, '/embed/:script_id/:group_id/:embed_id'),
    __param(0, server_1.Param('script_id')), __param(1, server_1.Param("group_id")), __param(2, server_1.Param("embed_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], Embed, "delete", null);
__decorate([
    server_1.Method("POST" /* Post */, '/embed/:script_id/:group_id'),
    __param(0, server_1.Body('embed')), __param(1, server_1.Param('script_id')), __param(2, server_1.Param("group_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], Embed, "create", null);
Embed = __decorate([
    server_1.MethodConfig('Embed')
], Embed);
exports.Embed = Embed;
//# sourceMappingURL=embed.js.map