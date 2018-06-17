"use strict";
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
let Results = class Results {
    static listByScript(user_id, script_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const resultObject = yield client.query('SELECT "Date", "ID" from  public.results WHERE "UserId"=$1 AND "ScriptId"=$2  ', [user_id, script_id]);
                if (resultObject.rows.length > 0) {
                    return new server_1.MethodResult(resultObject.rows);
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static list(user_id, script_id, embed_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const resultObject = yield client.query('SELECT "Date", "ID" from  public.results WHERE "UserId"=$1 AND "ScriptId"=$2 and "EmbedId"=$3  ', [user_id, script_id, embed_id]);
                if (resultObject.rows.length > 0) {
                    return new server_1.MethodResult(resultObject.rows);
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static get(user_id, script_id, embed_id, result_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const resultObject = yield client.query('SELECT * from  public.results WHERE "UserId"=$1 AND "ScriptId"=$2 and "EmbedId"=$3 AND "ID"=$4 ', [user_id, script_id, embed_id, result_id]);
                if (resultObject.rows.length > 0) {
                    return new server_1.MethodResult(resultObject.rows[0]);
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static results(user_id, script_id, embed_id, results) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const createdObject = yield client.query('INSERT INTO public.results("UserId", "ScriptId", "EmbedId", "Data", "Date") VALUES($1,$2,$3,$4,$5) RETURNING "ID"', [user_id, script_id, embed_id, JSON.stringify(results), new Date()]);
                return new server_1.MethodResult(createdObject);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
};
__decorate([
    server_1.Method("GET" /* Get */, '/results/:user_id/:script_id/'),
    __param(0, server_1.Param("user_id")), __param(1, server_1.Param("script_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], Results, "listByScript", null);
__decorate([
    server_1.Method("GET" /* Get */, '/results/:user_id/:script_id/:embed_id/'),
    __param(0, server_1.Param("user_id")), __param(1, server_1.Param("script_id")), __param(2, server_1.Param("embed_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], Results, "list", null);
__decorate([
    server_1.Method("GET" /* Get */, '/results/:user_id/:script_id/:embed_id/:result_id'),
    __param(0, server_1.Param("user_id")), __param(1, server_1.Param("script_id")), __param(2, server_1.Param("embed_id")), __param(3, server_1.Param("result_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], Results, "get", null);
__decorate([
    server_1.Method("POST" /* Post */, '/results/:user_id/:script_id/:embed_id'),
    __param(0, server_1.Param("user_id")), __param(1, server_1.Param("script_id")), __param(2, server_1.Param("embed_id")), __param(3, server_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], Results, "results", null);
Results = __decorate([
    server_1.MethodConfig('Results')
], Results);
exports.Results = Results;
//# sourceMappingURL=results.js.map