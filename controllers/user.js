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
const uuidv1 = require("uuid/v1");
const models_1 = require("../models");
let User = class User {
    static get(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userquery = (yield new data_1.Query(models_1.UserModel).filter({ UserId: userId }).run());
                const groupResult = (yield new data_1.Query(models_1.UserModel).filter({
                    GroupId: { $in: userquery.map((item) => item.GroupId) },
                }).run());
                if (groupResult) {
                    return new server_1.MethodResult(groupResult);
                }
                throw (new server_1.MethodError('not found', 404));
            }
            catch (error) {
                throw (error);
            }
        });
    }
    static getGroups(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userquery = yield this.getUserGroup(userId);
                const groupResult = (yield new data_1.Query(models_1.GroupModel).filter({
                    GroupId: { $in: userquery.map((item) => item.GroupId) },
                }).run());
                if (groupResult) {
                    return new server_1.MethodResult(groupResult);
                }
            }
            catch (error) {
                throw (error);
            }
        });
    }
    static attachToGroup(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupResult = yield this.getUserGroup(userId);
                if (groupResult.length === 0) {
                    const groupModel = new models_1.GroupModel({ Name: userData.Name, Date: new Date(), GroupId: uuidv1() });
                    const insertResult = yield groupModel.save();
                    if (insertResult) {
                        const userGroupModel = new models_1.UserGroupModel({ GroupId: insertResult.GroupId, UserId: userId });
                        const attachResult = yield userGroupModel.save();
                        return new server_1.MethodResult(attachResult);
                    }
                }
                else {
                    return new server_1.MethodResult(groupResult[0]);
                }
            }
            catch (error) {
                throw (error);
            }
        });
    }
    static delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteResult = yield models_1.UserGroupModel.delete({ UserId: userId });
                return new server_1.MethodResult(deleteResult);
            }
            catch (error) {
                throw (error);
            }
        });
    }
    static deleteGroup(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteResult = yield models_1.GroupModel.delete({ GroupId: groupId });
                return new server_1.MethodResult(deleteResult);
            }
            catch (error) {
                throw (error);
            }
        });
    }
    static getUserGroup(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_1.UserGroupModel.query(new data_1.Query(models_1.UserGroupModel).filter({ UserId: userId }));
        });
    }
};
__decorate([
    server_1.Method("GET" /* Get */, '/user/:user_id/'),
    __param(0, server_1.Param('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], User, "get", null);
__decorate([
    server_1.Method("GET" /* Get */, '/user/:user_id/groups'),
    __param(0, server_1.Param('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], User, "getGroups", null);
__decorate([
    server_1.Method("POST" /* Post */, '/user/:user_id/group'),
    __param(0, server_1.Param('user_id')),
    __param(1, server_1.Body('data', 'object')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], User, "attachToGroup", null);
__decorate([
    server_1.Method("DELETE" /* Delete */, '/user/:user_id/'),
    __param(0, server_1.Param('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], User, "delete", null);
__decorate([
    server_1.Method("DELETE" /* Delete */, '/group/:group_id/'),
    __param(0, server_1.Param('group_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], User, "deleteGroup", null);
User = __decorate([
    server_1.MethodConfig('User')
], User);
exports.User = User;
//# sourceMappingURL=user.js.map