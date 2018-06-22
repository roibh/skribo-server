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
let Scripts = class Scripts {
    static list(group_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const res = yield client.query('SELECT * FROM public.scripts WHERE "GroupId"=$1 ORDER BY "ID" ASC', [group_id]);
                return new server_1.MethodResult(res.rows);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield db_1.DB();
            try {
                const script = yield client.query('SELECT * FROM public.scripts WHERE "ID"=$1', [id]);
                if (script.rows.length) {
                    return new server_1.MethodResult(script.rows[0]);
                }
                else {
                    throw (new server_1.MethodError('not found', 404));
                }
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
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield db_1.DB();
            try {
                const script = yield client.query('DELETE FROM public.scripts WHERE "ID"=$1', [id]);
                return new server_1.MethodResult(true);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static create(script) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield db_1.DB();
            if (!script.Variables)
                script.Variables = {};
            try {
                const createdObject = yield client.query('INSERT INTO public.scripts("Name", "Code", "Variables", "Description", "GroupId") VALUES($1,$2,$3,$4,$5) RETURNING "ID"', [script.Name, script.Code, JSON.stringify(script.Variables), script.Description, script.GroupId]);
                return new server_1.MethodResult(createdObject);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static update(id, script) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield db_1.DB();
            if (!script.Variables)
                script.Variables = {};
            try {
                const updateObject = yield client.query(`UPDATE public.scripts SET "Name"=$1, "Code"=$2, "Variables"=$3, "Description"=$4 "ScriptId"=$5 WHERE "ID"=$6 RETURNING "Name", "Code", "Variables", "Description";`, [script.Name, script.Code, JSON.stringify(script.Variables), script.Description, uuidv1(), id]);
                if (updateObject.rows.length) {
                    return new server_1.MethodResult(updateObject.rows[0]);
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
    __param(0, server_1.Param("group_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Scripts, "list", null);
__decorate([
    server_1.Method("GET" /* Get */, '/scripts/:id'),
    __param(0, server_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Scripts, "get", null);
__decorate([
    server_1.Method("DELETE" /* Delete */, '/scripts/:id'),
    __param(0, server_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Scripts, "remove", null);
__decorate([
    server_1.Method("POST" /* Post */, '/scripts/'),
    __param(0, server_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Scripts, "create", null);
__decorate([
    server_1.Method("PUT" /* Put */, '/scripts/:id'),
    __param(0, server_1.Param('id')), __param(1, server_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], Scripts, "update", null);
Scripts = __decorate([
    server_1.MethodConfig('Scripts')
], Scripts);
exports.Scripts = Scripts;
//# sourceMappingURL=scripts.js.map