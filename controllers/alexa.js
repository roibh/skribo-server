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
const election_model_1 = require("../models/election.model");
const data_1 = require("@methodus/data");
let Alexa = class Alexa {
    static argue(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new server_1.MethodResult({});
        });
    }
    static election_users() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new data_1.Query(election_model_1.ElectionModel).filter({});
            const result = yield query.run();
            return new server_1.MethodResult(result);
        });
    }
    static election_users_update(id, checked) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield election_model_1.ElectionModel.update({ ID: id }, { Checked: (checked === 'true') });
            return new server_1.MethodResult(result);
        });
    }
};
__decorate([
    server_1.Method("POST" /* Post */, '/alexa/commands/argue'),
    __param(0, server_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Alexa, "argue", null);
__decorate([
    server_1.Method("GET" /* Get */, '/election/users/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Alexa, "election_users", null);
__decorate([
    server_1.Method("GET" /* Get */, '/election/users/userid/:userid'),
    __param(0, server_1.Param('userid')), __param(1, server_1.Query('checked')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], Alexa, "election_users_update", null);
Alexa = __decorate([
    server_1.MethodConfig('Alexa')
], Alexa);
exports.Alexa = Alexa;
//# sourceMappingURL=alexa.js.map