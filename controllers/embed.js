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
const data_1 = require("@methodus/data");
const logelas_1 = require("logelas");
const embed_model_1 = require("../models/embed.model");
const uuidv1 = require('uuid/v1');
let Embed = class Embed {
    static update(embed, script_id, group_id, embed_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete embed._id;
                const updateResults = yield embed_model_1.EmbedModel.update({ ScriptId: script_id, GroupId: group_id, EmbedId: embed_id }, embed);
                return new server_1.MethodResult(updateResults);
            }
            catch (error) {
                logelas_1.AutoLogger.error(error);
            }
        });
    }
    static get(script_id, group_id, embed_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listResults = yield embed_model_1.EmbedModel.query(new data_1.Query(embed_model_1.EmbedModel).filter({ ScriptId: script_id, GroupId: group_id, EmbedId: embed_id }));
                return new server_1.MethodResult(listResults);
            }
            catch (error) {
                logelas_1.AutoLogger.error(error);
            }
        });
    }
    static list(script_id, group_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pred = new data_1.Query(embed_model_1.EmbedModel).filter({ ScriptId: script_id, GroupId: group_id });
                const InstanceScript = yield pred.run();
                return new server_1.MethodResult(InstanceScript);
            }
            catch (error) {
                logelas_1.AutoLogger.error(error);
            }
        });
    }
    static delete(script_id, group_id, embed_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const InstanceScript = yield embed_model_1.EmbedModel.delete({ ScriptId: script_id, GroupId: group_id, EmbedId: embed_id });
                return new server_1.MethodResult(InstanceScript);
            }
            catch (error) {
                logelas_1.AutoLogger.error(error);
            }
        });
    }
    static create(embed, script_id, group_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                embed.ScriptId = script_id;
                embed.GroupId = group_id;
                embed.EmbedId = uuidv1();
                const createdObject = yield embed_model_1.EmbedModel.insert(embed);
                if (createdObject) {
                    return new server_1.MethodResult(createdObject);
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
    __metadata("design:paramtypes", [embed_model_1.EmbedModel, String, String, String]),
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
    __metadata("design:paramtypes", [embed_model_1.EmbedModel, String, String]),
    __metadata("design:returntype", Promise)
], Embed, "create", null);
Embed = __decorate([
    server_1.MethodConfig('Embed')
], Embed);
exports.Embed = Embed;
//# sourceMappingURL=embed.js.map