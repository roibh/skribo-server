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
const _1 = require("../models/");
const data_1 = require("@methodus/data");
const hash_1 = require("../db/hash");
const uuidv1 = require('uuid/v1');
let Results = class Results {
    static create(group_id, script_id, embed_id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('typeof', typeof body === 'string');
                if (typeof body === 'string') {
                    body = JSON.parse(body);
                }
                let results = body.results;
                if (typeof results === 'string') {
                    results = JSON.parse(results);
                }
                const db = yield data_1.DBHandler.getConnection();
                const tableName = 'RESULTS_' + hash_1.hashCode(group_id + script_id);
                const result_id = uuidv1();
                const resultObject = new _1.ResultsModel({ Date: new Date(), GroupId: group_id, ScriptId: script_id, EmbedId: embed_id, ResultId: result_id });
                resultObject.Data = results;
                yield resultObject.save();
                if (Array.isArray(results)) {
                    for (let i = 0; i < results.length; i++) {
                        const rowObject = results[i];
                        try {
                            rowObject.ResultId = result_id;
                            const insertResult = yield db.collection(tableName).insertOne(rowObject);
                        }
                        catch (error) {
                            console.error(error);
                        }
                    }
                }
                else {
                    Object.keys(results).forEach((item) => __awaiter(this, void 0, void 0, function* () {
                        for (let i = 0; i < results[item].length; i++) {
                            const rowObject = results[item][i];
                            try {
                                rowObject.ResultId = result_id;
                                const insertResult = yield db.collection(tableName).insertOne(rowObject);
                            }
                            catch (error) {
                                console.error(error);
                            }
                        }
                    }));
                }
                return new server_1.MethodResult(resultObject);
            }
            catch (error) {
                console.error(error);
                throw (new server_1.MethodError(error));
            }
        });
    }
    catch(error) {
        throw (new server_1.MethodError(error));
    }
    static listByScript(group_id, script_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = (yield new data_1.Query(_1.ResultsModel).filter({ GroupId: group_id, ScriptId: script_id }).run());
                if (results.length > 0) {
                    return new server_1.MethodResult(results);
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
                const results = (yield new data_1.Query(_1.ResultsModel).filter({ GroupId: group_id, ScriptId: script_id, EmbedId: embed_id }).run());
                if (results.length > 0) {
                    return new server_1.MethodResult(results);
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
                const results = (yield new data_1.Query(_1.ResultsModel).filter({ GroupId: group_id, ScriptId: script_id, EmbedId: embed_id, ResultId: result_id }).run());
                if (results[0].Data) {
                    return new server_1.MethodResult(results[0].Data);
                }
                if (results.length > 0) {
                    const db = yield data_1.DBHandler.getConnection();
                    const tableName = 'RESULTS_' + hash_1.hashCode(group_id + script_id);
                    let reportResults = yield db.collection(tableName).find({ ResultId: result_id }).toArray();
                    reportResults = reportResults.map((item) => {
                        delete item._id;
                        delete item.ResultId;
                        return item;
                    });
                    const returnObject = Object.assign({}, results[0], { Data: reportResults });
                    return new server_1.MethodResult(returnObject);
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
                const deleteResult = yield _1.ResultsModel.delete({ GroupId: group_id, ScriptId: script_id, EmbedId: embed_id, ID: result_id });
                return new server_1.MethodResult(deleteResult);
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