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
const controllers_1 = require("../controllers");
let TestsOfServe = class TestsOfServe {
    embed_delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield controllers_1.Embed.delete(Data.User.ScriptId, Data.User.GroupId, Data.User.EmbedId);
            alsatian_1.Expect(result).toBeDefined();
        });
    }
    script_delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield controllers_1.Scripts.remove(Data.User.GroupId, Data.User.ScriptId);
            alsatian_1.Expect(result).toBeDefined();
        });
    }
    result_delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield controllers_1.Results.delete(Data.User.GroupId, Data.User.ScriptId, Data.User.EmbedId, Data.User.ResultId);
            alsatian_1.Expect(result).toBeDefined();
        });
    }
    user_delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield controllers_1.User.delete(Data.User.UserId);
            alsatian_1.Expect(result).toBeDefined();
        });
    }
    group_delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield controllers_1.User.deleteGroup(Data.User.GroupId);
            alsatian_1.Expect(result).toBeDefined();
        });
    }
};
__decorate([
    alsatian_1.AsyncTest('embed_delete'),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfServe.prototype, "embed_delete", null);
__decorate([
    alsatian_1.AsyncTest('script_delete'),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfServe.prototype, "script_delete", null);
__decorate([
    alsatian_1.AsyncTest('result_delete'),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfServe.prototype, "result_delete", null);
__decorate([
    alsatian_1.AsyncTest('user_delete'),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfServe.prototype, "user_delete", null);
__decorate([
    alsatian_1.AsyncTest('group_delete'),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfServe.prototype, "group_delete", null);
TestsOfServe = __decorate([
    alsatian_1.TestFixture('Test finals')
], TestsOfServe);
exports.TestsOfServe = TestsOfServe;
//# sourceMappingURL=final.spec.js.map