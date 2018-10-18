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
const data_1 = require("@methodus/data");
const server_1 = require("@methodus/server");
const logelas_1 = require("logelas");
const uuidv1 = require("uuid/v1");
const hash = require("object-hash");
const models_1 = require("../models/");
const embed_1 = require("./embed");
let Results = class Results {
    static create(groupId, scriptId, embedId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = this.verifyBody(body);
                const resultId = uuidv1();
                const resultObject = new models_1.ResultsModel({
                    Date: new Date(),
                    EmbedId: embedId,
                    GroupId: groupId,
                    ResultId: resultId,
                    ScriptId: scriptId,
                });
                // load embed variables
                const embed = (yield embed_1.Embed.get(scriptId, groupId, embedId)).result;
                console.warn(embed);
                resultObject.Variables = embed.Variables;
                if (results.reportType === 'embeded') {
                    resultObject.Data = results;
                }
                else {
                    const tableName = 'RESULTS_' + hash(groupId + scriptId);
                    resultObject.TableName = tableName;
                    this.storeResults(results, tableName, resultId);
                }
                yield resultObject.save();
                try {
                    yield models_1.ScriptModel.update({ ScriptId: scriptId }, { LastRunDate: new Date(), LastResultId: resultId });
                }
                catch (error) {
                    console.error(error);
                }
                return new server_1.MethodResult(resultObject);
            }
            catch (error) {
                throw (new server_1.MethodError(error));
            }
        });
    }
    static listByScript(groupId, scriptId) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = (yield new data_1.Query(models_1.ResultsModel).filter({ GroupId: groupId, ScriptId: scriptId }).run());
            return new server_1.MethodResult(results);
        });
    }
    static list(groupId, scriptId, embedId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = (yield new data_1.Query(models_1.ResultsModel).filter({
                    EmbedId: embedId,
                    GroupId: groupId,
                    ScriptId: scriptId,
                }).run());
                if (results.length > 0) {
                    return new server_1.MethodResult(results);
                }
            }
            catch (error) {
                throw (new server_1.MethodError(error));
            }
        });
    }
    static get(groupId, scriptId, embedId, resultId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = (yield new data_1.Query(models_1.ResultsModel).filter({
                    EmbedId: embedId,
                    GroupId: groupId,
                    ResultId: resultId,
                    ScriptId: scriptId,
                }).run());
                if (results[0].Data) {
                    return new server_1.MethodResult(results[0]);
                }
                if (results.length > 0) {
                    const db = yield data_1.DBHandler.getConnection();
                    const tableName = 'RESULTS_' + hash(groupId + scriptId);
                    let reportResults = yield db.collection(tableName).find({ ResultId: resultId }).toArray();
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
    static getSample(groupId, scriptId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield data_1.DBHandler.getConnection();
                const tableName = 'RESULTS_' + hash(groupId + scriptId);
                const reportResults = yield db.collection(tableName).find({}).limit(1).toArray();
                return new server_1.MethodResult(reportResults);
            }
            catch (error) {
                throw (new server_1.MethodError(error));
            }
        });
    }
    static delete(groupId, scriptId, embedId, resultId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteResult = yield models_1.ResultsModel.delete({
                    EmbedId: embedId,
                    GroupId: groupId,
                    ResultId: resultId,
                    ScriptId: scriptId,
                });
                const db = yield data_1.DBHandler.getConnection();
                const tableName = 'RESULTS_' + hash(groupId + scriptId);
                const tableDelete = yield db.collection(tableName).deleteMany({ ResultId: resultId });
                return new server_1.MethodResult(deleteResult);
            }
            catch (error) {
                throw (new server_1.MethodError(error));
            }
        });
    }
    static verifyBody(body) {
        if (typeof body === 'string') {
            body = JSON.parse(body);
        }
        let results = body.results;
        if (typeof results === 'string') {
            results = JSON.parse(results);
        }
        return results;
    }
    static insertToDB(rowObject, tableName, resultId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield data_1.DBHandler.getConnection();
            try {
                rowObject.ResultId = resultId;
                const insertResult = yield db.collection(tableName).insertOne(rowObject);
            }
            catch (error) {
                logelas_1.AutoLogger.error(error);
            }
        });
    }
    static storeResults(results, tableName, resultId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(results)) {
                results.forEach((rowObject) => __awaiter(this, void 0, void 0, function* () {
                    this.insertToDB(rowObject, tableName, resultId);
                }));
            }
            else {
                Object.keys(results).forEach((item) => __awaiter(this, void 0, void 0, function* () {
                    results[item].forEach((rowObject) => __awaiter(this, void 0, void 0, function* () {
                        rowObject.accountName = item;
                        this.insertToDB(rowObject, tableName, resultId);
                    }));
                }));
            }
        });
    }
};
__decorate([
    server_1.Method("POST" /* Post */, '/results/:script_id/:group_id/:embed_id'),
    __param(0, server_1.Param('group_id')),
    __param(1, server_1.Param('script_id')),
    __param(2, server_1.Param('embed_id')),
    __param(3, server_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], Results, "create", null);
__decorate([
    server_1.Method("GET" /* Get */, '/results/:script_id/:group_id'),
    __param(0, server_1.Param('group_id')), __param(1, server_1.Param('script_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], Results, "listByScript", null);
__decorate([
    server_1.Method("GET" /* Get */, '/results/:script_id/:group_id/:embed_id'),
    __param(0, server_1.Param('group_id')),
    __param(1, server_1.Param('script_id')),
    __param(2, server_1.Param('embed_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], Results, "list", null);
__decorate([
    server_1.Method("GET" /* Get */, '/results/:script_id/:group_id/:embed_id/:result_id'),
    __param(0, server_1.Param('group_id')),
    __param(1, server_1.Param('script_id')),
    __param(2, server_1.Param('embed_id')),
    __param(3, server_1.Param('result_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], Results, "get", null);
__decorate([
    server_1.Method("GET" /* Get */, '/results-sample/:script_id/:group_id/'),
    __param(0, server_1.Param('group_id')),
    __param(1, server_1.Param('script_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], Results, "getSample", null);
__decorate([
    server_1.Method("DELETE" /* Delete */, '/results/:script_id/:group_id/:embed_id/:result_id'),
    __param(0, server_1.Param('group_id')),
    __param(1, server_1.Param('script_id')),
    __param(2, server_1.Param('embed_id')),
    __param(3, server_1.Param('result_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], Results, "delete", null);
Results = __decorate([
    server_1.MethodConfig('Results')
], Results);
exports.Results = Results;
//# sourceMappingURL=results.js.map