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
const models_1 = require("../models");
const uuidv1 = require('uuid/v1');
let Log = class Log {
    static log(log, script_id, group_id, embed_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdObject = yield models_1.LogModel.insert({
                    Log: log,
                    GroupId: group_id,
                    EmbedId: embed_id,
                    ScriptId: script_id,
                });
                return new server_1.MethodResult(true);
            }
            catch (error) {
                console.error(error);
            }
            return new server_1.MethodResult(true);
        });
    }
};
__decorate([
    server_1.Method("POST" /* Post */, '/log/:script_id/:group_id/:embed_id'),
    __param(0, server_1.Body()), __param(1, server_1.Param('script_id')), __param(2, server_1.Param("group_id")), __param(3, server_1.Param('embed_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], Log, "log", null);
Log = __decorate([
    server_1.MethodConfig('Log')
], Log);
exports.Log = Log;
//# sourceMappingURL=log.js.map