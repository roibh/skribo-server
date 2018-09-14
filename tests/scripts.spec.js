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
const controllers_1 = require("../controllers");
const models_1 = require("../models");
let TestsOfScripts = class TestsOfScripts {
    scripts_create() {
        return __awaiter(this, void 0, void 0, function* () {
            const script = new models_1.ScriptModel({
                Name: 'Test script', Description: 'Test description', ResultsDescriptor: {}, GroupId: global.User.GroupId, Code: '', Variables: [{
                        "type": "number",
                        "name": "namedd",
                        "value": "1"
                    }]
            });
            const result = (yield controllers_1.Scripts.create(global.User.GroupId, script)).result;
            global.User.ScriptId = result.ScriptId;
            alsatian_1.Expect(result.ScriptId).toBeDefined();
        });
    }
    scripts_update() {
        return __awaiter(this, void 0, void 0, function* () {
            const script = new models_1.ScriptModel({
                Name: 'Test script', Description: 'Test description updated', ResultsDescriptor: {}, GroupId: global.User.GroupId, Code: '', Variables: [{
                        "type": "number",
                        "name": "namedd",
                        "value": "1"
                    }]
            });
            const result = (yield controllers_1.Scripts.update(global.User.GroupId, global.User.ScriptId, script)).result;
            global.User.ScriptId = result.ScriptId;
            alsatian_1.Expect(result.ScriptId).toBeDefined();
        });
    }
    scripts_list() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield controllers_1.Scripts.list(global.User.GroupId)).result;
            alsatian_1.Expect(result).toBeDefined();
        });
    }
    scripts_get() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield controllers_1.Scripts.get(global.User.GroupId, global.User.ScriptId)).result;
            alsatian_1.Expect(result).toBeDefined();
        });
    }
};
__decorate([
    alsatian_1.AsyncTest('scripts_create'),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfScripts.prototype, "scripts_create", null);
__decorate([
    alsatian_1.AsyncTest('scripts_update'),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfScripts.prototype, "scripts_update", null);
__decorate([
    alsatian_1.AsyncTest('scripts_list'),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfScripts.prototype, "scripts_list", null);
__decorate([
    alsatian_1.AsyncTest('scripts_get'),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfScripts.prototype, "scripts_get", null);
TestsOfScripts = __decorate([
    alsatian_1.TestFixture('Test Scripts')
], TestsOfScripts);
exports.TestsOfScripts = TestsOfScripts;
//# sourceMappingURL=scripts.spec.js.map