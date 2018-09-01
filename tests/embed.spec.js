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
const models_1 = require("../models");
const data_1 = require("@methodus/data");
data_1.DBHandler.config = {
    connections: {
        'default': {
            server: 'mongodb://localhost:27017',
            db: 'test',
            poolSize: 10,
            ssl: false,
            exchanges: ['event-bus', 'cache-bus'],
            readPreference: 'primaryPreferred'
        }
    }
};
let TestsOEmbeds = class TestsOEmbeds {
    embed_create() {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new models_1.EmbedModel({
                GroupId: Data.User.GroupId, Name: 'Test embed', ScriptId: Data.User.ScriptId, Page: 'https://www.google.com', Variables: [
                    {
                        type: 'number',
                        name: 'limit',
                        value: '5'
                    },
                    {
                        type: 'string',
                        name: 'keyValue',
                        value: 'a fancy key'
                    }
                ]
            });
            const result = (yield controllers_1.Embed.create(embed, Data.User.ScriptId, Data.User.GroupId)).result;
            Data.User.EmbedId = result.EmbedId;
            alsatian_1.Expect(result).toBeDefined();
        });
    }
    embed_update() {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new models_1.EmbedModel({
                Name: 'Test embed', ScriptId: Data.User.ScriptId, Page: 'https://www.google.com', Variables: [{
                        type: 'number',
                        name: 'limit',
                        value: '5'
                    },
                    {
                        type: 'string',
                        name: 'keyValue',
                        value: 'a fancy key'
                    }]
            });
            const result = yield controllers_1.Embed.update(embed, Data.User.ScriptId, Data.User.GroupId, Data.User.EmbedId);
            alsatian_1.Expect(result).toBeDefined();
        });
    }
    embed_list() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield controllers_1.Embed.list(Data.User.ScriptId, Data.User.GroupId);
            alsatian_1.Expect(result).toBeDefined();
        });
    }
    embed_get() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield controllers_1.Embed.get(Data.User.ScriptId, Data.User.GroupId, Data.User.EmbedId);
            alsatian_1.Expect(result).toBeDefined();
        });
    }
    embed_delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield controllers_1.Embed.delete(Data.User.ScriptId, Data.User.GroupId, Data.User.EmbedId);
            alsatian_1.Expect(result).toBeDefined();
        });
    }
};
__decorate([
    alsatian_1.AsyncTest('embed_create'),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOEmbeds.prototype, "embed_create", null);
__decorate([
    alsatian_1.AsyncTest('embed_update'),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOEmbeds.prototype, "embed_update", null);
__decorate([
    alsatian_1.AsyncTest('embed_list'),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOEmbeds.prototype, "embed_list", null);
__decorate([
    alsatian_1.AsyncTest('embed_get'),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOEmbeds.prototype, "embed_get", null);
__decorate([
    alsatian_1.AsyncTest('embed_delete'),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestsOEmbeds.prototype, "embed_delete", null);
TestsOEmbeds = __decorate([
    alsatian_1.TestFixture('Test Embeds')
], TestsOEmbeds);
exports.TestsOEmbeds = TestsOEmbeds;
//# sourceMappingURL=embed.spec.js.map