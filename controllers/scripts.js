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
const script_model_1 = require("../models/script.model");
const data_1 = require("@methodus/data");
const uuidv1 = require('uuid/v1');
let Scripts = class Scripts {
    /**
     * @param  {} Verbs.Get
     * @param  {group_id/list'} '/scripts/
     */
    static list(group_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const scripts = (yield new data_1.Query(script_model_1.ScriptModel).filter({ GroupId: group_id }).run());
                return new server_1.MethodResult(scripts);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static get(group_id, script_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const script = (yield new data_1.Query(script_model_1.ScriptModel).filter({ ScriptId: script_id, GroupId: group_id }).run(data_1.ReturnType.Single));
                return new server_1.MethodResult(script);
                // const script: any = await client.query('SELECT * FROM public.scripts WHERE "ScriptId"=$1 AND "GroupId"=$2', [script_id, group_id]);
                // if (script.length) {
                //     return new MethodResult(script[0] as ScriptModel);
                // } else {
                //     throw (new MethodError('not found', 404));
                // }
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
    static remove(group_id, script_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const script = (yield script_model_1.ScriptModel.delete({ ScriptId: script_id, GroupId: group_id }));
            return new server_1.MethodResult(script);
        });
    }
    static create(group_id, script) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                script.ScriptId = uuidv1();
                const createdObject = yield script_model_1.ScriptModel.save(script);
                //script.Name, script.Code, JSON.stringify(script.Variables), script.Description, group_id, uuidv1(), script.ResultsDescriptor
                //const createdObject = await client.query('INSERT INTO public.scripts("Name", "Code", "Variables", "Description", "GroupId", "ScriptId","ResultsDescriptor") VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING "ScriptId"', [])
                return new server_1.MethodResult(createdObject);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static update(group_id, script_id, script) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateResult = yield script_model_1.ScriptModel.update({ ScriptId: script_id, GroupId: group_id }, script);
                if (updateResult) {
                    return new server_1.MethodResult(updateResult);
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
    __param(0, server_1.Param('group_id')), __param(1, server_1.Param('script_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], Scripts, "get", null);
__decorate([
    server_1.Method("DELETE" /* Delete */, '/scripts/:group_id/script_id/:script_id'),
    __param(0, server_1.Param('group_id')), __param(1, server_1.Param('script_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], Scripts, "remove", null);
__decorate([
    server_1.Method("POST" /* Post */, '/scripts/:group_id'),
    __param(0, server_1.Param('group_id')), __param(1, server_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, script_model_1.ScriptModel]),
    __metadata("design:returntype", Promise)
], Scripts, "create", null);
__decorate([
    server_1.Method("PUT" /* Put */, '/scripts/:group_id/script_id/:script_id'),
    __param(0, server_1.Param('group_id')), __param(1, server_1.Param('script_id')), __param(2, server_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, script_model_1.ScriptModel]),
    __metadata("design:returntype", Promise)
], Scripts, "update", null);
Scripts = __decorate([
    server_1.MethodConfig('Scripts')
], Scripts);
exports.Scripts = Scripts;
//# sourceMappingURL=scripts.js.map