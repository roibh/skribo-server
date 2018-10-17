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
const __1 = require("../");
const logelas_1 = require("logelas");
const data_1 = require("@methodus/data");
let Sync = class Sync {
    static post_accounts(groupId, accounts) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield __1.UserAccountModel.delete({ GroupId: groupId }, __1.UserAccountModel, false);
                const accountsList = JSON.parse(accounts.accounts);
                accountsList.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const account = new __1.UserAccountModel({
                        AccountKey: element.id,
                        AccountName: element.name,
                        GroupId: groupId,
                    });
                    yield account.save();
                }));
                return new server_1.MethodResult(true);
            }
            catch (error) {
                logelas_1.AutoLogger.error(error);
            }
        });
    }
    static get_accounts(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = new data_1.Query(__1.UserAccountModel);
                query.filter({ GroupId: groupId });
                const results = yield query.run();
                return new server_1.MethodResult(results);
            }
            catch (error) {
                logelas_1.AutoLogger.error(error);
            }
        });
    }
};
__decorate([
    server_1.Method("POST" /* Post */, '/sync/:group_id/accounts'),
    __param(0, server_1.Param('group_id')),
    __param(1, server_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], Sync, "post_accounts", null);
__decorate([
    server_1.Method("GET" /* Get */, '/sync/:group_id/accounts'),
    __param(0, server_1.Param('group_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Sync, "get_accounts", null);
Sync = __decorate([
    server_1.MethodConfig('Sync')
], Sync);
exports.Sync = Sync;
//# sourceMappingURL=sync.js.map