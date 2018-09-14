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
const uuidv1 = require("uuid/v1");
const script_model_1 = require("../models/script.model");
const data_1 = require("@methodus/data");
const logelas_1 = require("logelas");
let Scripts = class Scripts {
    /**
     * @param  {} Verbs.Get
     * @param  {group_id/list'} '/scripts/
     */
    static list(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const scripts = (yield new data_1.Query(script_model_1.ScriptModel).filter({ GroupId: groupId }).run());
                return new server_1.MethodResult(scripts);
            }
            catch (error) {
                logelas_1.AutoLogger.error(error);
            }
        });
    }
    static get(groupId, scriptId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const script = (yield new data_1.Query(script_model_1.ScriptModel).filter({
                    GroupId: groupId,
                    ScriptId: scriptId,
                }).run(data_1.ReturnType.Single));
                return new server_1.MethodResult(script);
            }
            catch (error) {
                if (error.statusCode) {
                    throw (error);
                }
                else {
                    throw new server_1.MethodError(error);
                }
            }
        });
    }
    static remove(groupId, scriptId) {
        return __awaiter(this, void 0, void 0, function* () {
            const script = (yield script_model_1.ScriptModel.delete({ ScriptId: scriptId, GroupId: groupId }));
            return new server_1.MethodResult(script);
        });
    }
    static create(groupId, script) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                script.ScriptId = uuidv1();
                const createdObject = yield script_model_1.ScriptModel.save(script);
                return new server_1.MethodResult(createdObject);
            }
            catch (error) {
                logelas_1.AutoLogger.error(error);
            }
        });
    }
    static update(groupId, scriptId, script) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateResult = yield script_model_1.ScriptModel.update({ ScriptId: scriptId, GroupId: groupId }, script);
                if (updateResult) {
                    return new server_1.MethodResult(updateResult);
                }
                else {
                    throw (new server_1.MethodError('not found', 404));
                }
            }
            catch (error) {
                logelas_1.AutoLogger.error(error);
            }
        });
    }
};
__decorate([
    server_1.Method("GET" /* Get */, '/scripts/:group_id/list'),
    __param(0, server_1.Param('group_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Scripts, "list", null);
__decorate([
    server_1.Method("GET" /* Get */, '/scripts/:group_id/script_id/:script_id'),
    __param(0, server_1.Param('group_id')),
    __param(1, server_1.Param('script_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], Scripts, "get", null);
__decorate([
    server_1.Method("DELETE" /* Delete */, '/scripts/:group_id/script_id/:script_id'),
    __param(0, server_1.Param('group_id')),
    __param(1, server_1.Param('script_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], Scripts, "remove", null);
__decorate([
    server_1.Method("POST" /* Post */, '/scripts/:group_id'),
    __param(0, server_1.Param('group_id')),
    __param(1, server_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, script_model_1.ScriptModel]),
    __metadata("design:returntype", Promise)
], Scripts, "create", null);
__decorate([
    server_1.Method("PUT" /* Put */, '/scripts/:group_id/script_id/:script_id'),
    __param(0, server_1.Param('group_id')),
    __param(1, server_1.Param('script_id')),
    __param(2, server_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, script_model_1.ScriptModel]),
    __metadata("design:returntype", Promise)
], Scripts, "update", null);
Scripts = __decorate([
    server_1.MethodConfig('Scripts')
], Scripts);
exports.Scripts = Scripts;
//# sourceMappingURL=scripts.js.map