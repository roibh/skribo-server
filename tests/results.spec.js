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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const alsatian_1 = require("alsatian");
const Data = require("./data");
const results_1 = require("../controllers/results");
let TestsOfResults = class TestsOfResults {
    create(resultMutation) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield results_1.Results.create(Data.User.GroupId, Data.User.ScriptId, Data.User.EmbedId, resultMutation)).result;
            Data.User.ResultId = result.ResultId;
            alsatian_1.Expect(result).toBeDefined();
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield results_1.Results.list(Data.User.GroupId, Data.User.ScriptId, Data.User.EmbedId);
            alsatian_1.Expect(result).toBeDefined();
        });
    }
    listByScript() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield results_1.Results.listByScript(Data.User.GroupId, Data.User.ScriptId);
            alsatian_1.Expect(result).toBeDefined();
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield results_1.Results.get(Data.User.GroupId, Data.User.ScriptId, Data.User.EmbedId, Data.User.ResultId);
            alsatian_1.Expect(result).toBeDefined();
        });
    }
};
__decorate([
    alsatian_1.AsyncTest('create'),
    alsatian_1.TestCase(Data.ReportResult),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestsOfResults.prototype, "create", null);
__decorate([
    alsatian_1.AsyncTest('list'),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfResults.prototype, "list", null);
__decorate([
    alsatian_1.AsyncTest('listByScript'),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfResults.prototype, "listByScript", null);
__decorate([
    alsatian_1.AsyncTest('get'),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfResults.prototype, "get", null);
TestsOfResults = __decorate([
    alsatian_1.TestFixture('Test Results')
], TestsOfResults);
exports.TestsOfResults = TestsOfResults;
//# sourceMappingURL=results.spec.js.map