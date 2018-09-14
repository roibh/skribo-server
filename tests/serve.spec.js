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
let TestsOfServe = class TestsOfServe {
    serve_get(ScriptId, GroupId, EmbedId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield controllers_1.Serve.get(ScriptId, GroupId, EmbedId);
            alsatian_1.Expect(result).toBeDefined();
        });
    }
};
__decorate([
    alsatian_1.AsyncTest('serve_get'),
    alsatian_1.TestCase(global.User.ScriptId, global.User.GroupId, global.User.EmbedId),
    alsatian_1.TestCase(null, global.User.GroupId, global.User.EmbedId),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TestsOfServe.prototype, "serve_get", null);
TestsOfServe = __decorate([
    alsatian_1.TestFixture('Test Serve')
], TestsOfServe);
exports.TestsOfServe = TestsOfServe;
//# sourceMappingURL=serve.spec.js.map