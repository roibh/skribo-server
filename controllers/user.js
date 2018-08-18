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
const Raven = require('raven');
const uuidv1 = require('uuid/v1');
let User = class User {
    static get(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const groupResult = yield client.query(`SELECT "Name", user_groups."GroupId", "Status"
            FROM user_groups INNER JOIN groups ON (user_groups."GroupId" = groups."GroupId") WHERE  "UserId"=$1;`, [user_id], 0 /* Single */);
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
    static getGroups(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const groupResult = yield client.query(`SELECT "Name", user_groups."GroupId", "Status"
            FROM user_groups INNER JOIN groups ON (user_groups."GroupId" = groups."GroupId") WHERE  "UserId"=$1;`, [user_id]);
                return new server_1.MethodResult(groupResult);
            }
            catch (error) {
                throw (error);
            }
        });
    }
    static attachToGroup(user_id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const group_id = userData.GroupId;
                //validate group
                const groupValidationResult = yield client.query(`SELECT "Name", "GroupId" from public.groups WHERE "GroupId"=$1`, [group_id]);
                if (groupValidationResult.length === 0) {
                    //are there groups for this user?
                    const groupResult = yield client.query(`SELECT * FROM  public.user_groups  WHERE  "UserId" = $1; `, [user_id]);
                    if (groupResult.length === 0) {
                        const insertResult = yield client.query(`INSERT INTO public.groups("Name", "Date", "GroupId") VALUES($1, $2, $3)  RETURNING "GroupId"`, [userData.Name, new Date(), uuidv1()]);
                        if (insertResult.length > 0) {
                            const attachResult = yield client.query(`INSERT INTO public.user_groups("GroupId", "UserId") VALUES($1, $2)  RETURNING "GroupId"`, [insertResult[0].GroupId, user_id]);
                            return new server_1.MethodResult(attachResult[0]);
                        }
                    }
                    else {
                        return new server_1.MethodResult(groupResult[0]);
                    }
                }
                const groupResult = yield client.query(`SELECT "Name", public.user_groups."GroupId", "Status"
            FROM public.user_groups INNER JOIN public.groups ON(public.user_groups."GroupId" = public.groups."GroupId") WHERE  "UserId" = $1 AND public.user_groups."GroupId"=$2; `, [user_id, group_id]);
                if (groupResult.length === 0) {
                    //const insertResult = await client.query(`INSERT INTO public.groups("Name", "Date", "GroupId") VALUES($1, $2, $3)  RETURNING "GroupId"`, [userData.Name, new Date(), uuidv1()]);
                    // if (insertResult.rowCount > 0) {
                    const attachResult = yield client.query(`INSERT INTO public.user_groups("GroupId", "UserId") VALUES($1, $2)  RETURNING "GroupId"`, [group_id, user_id]);
                    return new server_1.MethodResult(attachResult[0]);
                    //}
                }
            }
            catch (error) {
                throw (error);
            }
        });
    }
    static delete(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const deleteResult = yield client.query(`DELETE from user_groups WHERE "UserId"=$1`, [user_id]);
                return new server_1.MethodResult(deleteResult);
            }
            catch (error) {
                throw (error);
            }
        });
    }
    static deleteGroup(group_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const deleteResult = yield client.query(`DELETE from groups WHERE "GroupId"=$1`, [group_id]);
                return new server_1.MethodResult(deleteResult);
            }
            catch (error) {
                throw (error);
            }
        });
    }
};
__decorate([
    server_1.Method("GET" /* Get */, '/user/:user_id/'),
    __param(0, server_1.Param("user_id")),
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
    __param(0, server_1.Param("user_id")), __param(1, server_1.Body('data', 'object')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], User, "attachToGroup", null);
__decorate([
    server_1.Method("DELETE" /* Delete */, '/user/:user_id/'),
    __param(0, server_1.Param("user_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], User, "delete", null);
__decorate([
    server_1.Method("DELETE" /* Delete */, '/group/:group_id/'),
    __param(0, server_1.Param("group_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], User, "deleteGroup", null);
User = __decorate([
    server_1.MethodConfig('User')
], User);
exports.User = User;
//# sourceMappingURL=user.js.map