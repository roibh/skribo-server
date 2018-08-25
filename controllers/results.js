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
let Results = class Results {
    static create(group_id, script_id, embed_id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('typeof', typeof body === 'string');
                if (typeof body === 'string') {
                    body = JSON.parse(body);
                }
                const results = body.results;
                console.log('results', results);
                console.log('results', results[0]);
                const client = yield db_1.DB();
                const tableName = 'RESULTS_' + client.hashCode(group_id + script_id);
                try {
                    const tableQuery = yield client.query('SELECT EXISTS (SELECT 1 FROM   pg_tables WHERE  "schemaname"=$1 AND "tablename"=$2)', ['public', tableName], 0 /* Single */);
                    const fields = Object.keys(results[0]).map((item) => {
                        if (!results[0][item])
                            return null;
                        let strType = typeof results[0][item];
                        if (strType === 'object' && Array.isArray(results[0][item])) {
                            strType = 'array';
                        }
                        if (strType === 'number' && results[0][item].toString().indexOf('.') > -1) {
                            strType = 'double precision';
                        }
                        return {
                            type: strType,
                            name: item
                        };
                    });
                    fields.push({ type: 'string', name: 'ResultId' });
                    console.log(fields);
                    console.log(tableQuery);
                    if (!tableQuery.exists) {
                        console.log('creating table');
                        yield client.createTable('public', tableName, fields);
                    }
                    console.log('table created');
                    const result_id = uuidv1();
                    const insertResultStr = `INSERT INTO public."results"("GroupId", "ScriptId", "EmbedId", "ResultId") 
                VALUES ($1,$2,$3,$4)`;
                    yield client.query(insertResultStr, [group_id, script_id, embed_id, result_id]);
                    if (Array.isArray(results)) {
                        for (let i = 0; i < results.length; i++) {
                            const rowObject = results[i];
                            const insertStr = `INSERT INTO public."${tableName}"( ${fields.map(item => `"${item.name}"`).join(',')}) 
                    VALUES(${fields.map((item, index) => `$${index + 1}`).join(',')})
                    RETURNING "ID"`;
                            try {
                                rowObject.ResultId = result_id;
                                const insertResult = yield client.query(insertStr, Object.values(rowObject));
                            }
                            catch (error) {
                                console.error(error);
                            }
                        }
                    }
                    return new server_1.MethodResult(true);
                }
                catch (error) {
                    console.error(error);
                    throw (new server_1.MethodError(error));
                }
            }
            catch (error) {
                throw (new server_1.MethodError(error));
            }
        });
    }
    static listByScript(group_id, script_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const resultObject = yield client.query('SELECT "ScriptId", "EmbedId", "Date", "ID" from  public.results WHERE "GroupId"=$1 AND "ScriptId"=$2  ', [group_id, script_id]);
                if (resultObject.length > 0) {
                    return new server_1.MethodResult(resultObject);
                }
            }
            catch (error) {
                throw (new server_1.MethodError(error));
            }
        });
    }
    static list(group_id, script_id, embed_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const resultObject = yield client.query('SELECT "Date", "ID" from  public.results WHERE "GroupId"=$1 AND "ScriptId"=$2 and "EmbedId"=$3 Order by "Date" desc  ', [group_id, script_id, embed_id]);
                if (resultObject.length > 0) {
                    return new server_1.MethodResult(resultObject);
                }
            }
            catch (error) {
                throw (new server_1.MethodError(error));
            }
        });
    }
    static get(group_id, script_id, embed_id, result_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const resultObject = yield client.query('SELECT * from  public.results WHERE "GroupId"=$1 AND "ScriptId"=$2 and "EmbedId"=$3 AND "ID"=$4 ', [group_id, script_id, embed_id, result_id]);
                if (resultObject.rows.length > 0) {
                    return new server_1.MethodResult(resultObject.rows[0]);
                }
            }
            catch (error) {
                throw (new server_1.MethodError(error));
            }
        });
    }
    static delete(group_id, script_id, embed_id, result_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const createdObject = yield client.query('DELETE FROM public.results WHERE "GroupId"=$1 AND "ScriptId"=$2 and "EmbedId"=$3 AND "ID"=$4  ', [group_id, script_id, embed_id, result_id]);
                return new server_1.MethodResult(createdObject);
            }
            catch (error) {
                throw (new server_1.MethodError(error));
            }
        });
    }
};
__decorate([
    server_1.Method("POST" /* Post */, '/results/:script_id/:group_id/:embed_id'),
    __param(0, server_1.Param("group_id")), __param(1, server_1.Param("script_id")), __param(2, server_1.Param("embed_id")), __param(3, server_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], Results, "create", null);
__decorate([
    server_1.Method("GET" /* Get */, '/results/:script_id/:group_id'),
    __param(0, server_1.Param("group_id")), __param(1, server_1.Param("script_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], Results, "listByScript", null);
__decorate([
    server_1.Method("GET" /* Get */, '/results/:script_id/:group_id/:embed_id'),
    __param(0, server_1.Param("group_id")), __param(1, server_1.Param("script_id")), __param(2, server_1.Param("embed_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], Results, "list", null);
__decorate([
    server_1.Method("GET" /* Get */, '/results/:script_id/:group_id/:embed_id/:result_id'),
    __param(0, server_1.Param("group_id")), __param(1, server_1.Param("script_id")), __param(2, server_1.Param("embed_id")), __param(3, server_1.Param("result_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], Results, "get", null);
__decorate([
    server_1.Method("DELETE" /* Delete */, '/results/:script_id/:group_id/:embed_id/:result_id'),
    __param(0, server_1.Param("group_id")), __param(1, server_1.Param("script_id")), __param(2, server_1.Param("embed_id")), __param(3, server_1.Param("result_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], Results, "delete", null);
Results = __decorate([
    server_1.MethodConfig('Results')
], Results);
exports.Results = Results;
//# sourceMappingURL=results.js.map