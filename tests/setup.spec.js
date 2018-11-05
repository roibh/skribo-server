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
const user_1 = require("../controllers/user");
const userId = '000000000000000000';
let TestsOfResults = class TestsOfResults {
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const userResult = (yield user_1.User.attachToGroup(userId, global.User)).result;
            global.User.GroupId = userResult.GroupId;
        });
    }
    // @AsyncTest('user_get')
    // @Timeout(10000)
    // public async user_get() {
    //     const user = await User.get(global.User.UserId);
    //     Expect(user).toBeDefined();
    // }
    user_getGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            const groups = yield user_1.User.getGroups(userId);
            alsatian_1.Expect(groups).toBeDefined();
        });
    }
};
__decorate([
    alsatian_1.AsyncSetupFixture,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfResults.prototype, "setup", null);
__decorate([
    alsatian_1.AsyncTest('user_getGroups'),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfResults.prototype, "user_getGroups", null);
TestsOfResults = __decorate([
    alsatian_1.TestFixture('Test Setup')
], TestsOfResults);
exports.TestsOfResults = TestsOfResults;
//# sourceMappingURL=setup.spec.js.map