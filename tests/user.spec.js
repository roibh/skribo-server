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
const user_1 = require("../controllers/user");
const db_1 = require("../db");
function mutate(source, mutation) {
    const obj = JSON.parse(JSON.stringify(source));
    switch (mutation) {
        case 0 /* UID */:
            delete obj.uid;
            break;
        case 1 /* COMPANY */:
            delete obj._company_id;
            delete obj.company_id;
            break;
        case 2 /* ID */:
            obj.id = guid();
            break;
        case 3 /* FILE_ID */:
            obj.file_id = guid();
            break;
        case 4 /* CASE_ID */:
            obj.case_id = guid();
            break;
    }
    return obj;
}
function guid() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
const user_id = '000000000000000000';
const group_id = '000000000000000000';
const script_id = '000000000000000000';
const embed_id = '000000000000000000';
let TestsOfResults = class TestsOfResults {
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const userResult = (yield user_1.User.attachToGroup(user_id, Data.User)).result;
            Data.User.GroupId = userResult.GroupId;
        });
    }
    user_get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.get(Data.User.UserId);
                alsatian_1.Expect(user).toBeDefined();
            }
            catch (error) {
                debugger;
                console.log(error);
            }
        });
    }
    user_getGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = yield user_1.User.getGroups(user_id);
                alsatian_1.Expect(groups).toBeDefined();
            }
            catch (error) {
                debugger;
                console.error(error);
            }
        });
    }
    create(resultMutation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield results_1.Results.create(Data.User.GroupId, script_id, embed_id, resultMutation);
                alsatian_1.Expect(result).toBeDefined();
            }
            catch (error) {
                debugger;
                console.error(error);
            }
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield results_1.Results.list(Data.User.GroupId, script_id, embed_id);
                alsatian_1.Expect(result).toBeDefined();
            }
            catch (error) {
                debugger;
                console.error(error);
            }
        });
    }
    listByScript() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield results_1.Results.listByScript(Data.User.GroupId, script_id);
                alsatian_1.Expect(result).toBeDefined();
            }
            catch (error) {
                debugger;
                console.error(error);
            }
        });
    }
    CleanUp() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                // const tableName = 'RESULTS_' + client.hashCode(Data.User.GroupId + script_id);
                // await client.query(`DROP TABLE public."${tableName}"`, []);
                // await client.query(`DROP SEQUENCE public."${tableName}_ID_seq"`, []);
                yield user_1.User.deleteGroup(Data.User.GroupId);
                yield user_1.User.delete(user_id);
            }
            catch (error) {
                debugger;
                console.error(error);
            }
            // var query = "DELETE * FROM Users WHERE Email=@Email";
            // const deleteResult = await dal.query(query, {
            //     "Email": Data.newUserNew.Email
            // });
            // Expect(deleteResult.result.ok).toBe(1);
            // const db = await DBHandler.getConnection('default');
            // const result = await db.collection('Message').remove({ 'TEST': true });
            // Expect(result).toBeDefined();
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
    alsatian_1.AsyncTest('user_get'),
    alsatian_1.TestCase(),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfResults.prototype, "user_get", null);
__decorate([
    alsatian_1.AsyncTest('user_getGroups'),
    alsatian_1.TestCase(),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfResults.prototype, "user_getGroups", null);
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
    alsatian_1.TestCase(),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfResults.prototype, "list", null);
__decorate([
    alsatian_1.AsyncTest('listByScript'),
    alsatian_1.TestCase(),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfResults.prototype, "listByScript", null);
__decorate([
    alsatian_1.AsyncTeardownFixture,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOfResults.prototype, "CleanUp", null);
TestsOfResults = __decorate([
    alsatian_1.TestFixture('Test Results')
], TestsOfResults);
exports.TestsOfResults = TestsOfResults;
//# sourceMappingURL=user.spec.js.map