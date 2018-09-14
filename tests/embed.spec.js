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
        default: {
            db: 'test',
            exchanges: ['event-bus', 'cache-bus'],
            poolSize: 10,
            readPreference: 'primaryPreferred',
            server: 'mongodb://localhost:27017',
            ssl: false,
        },
    },
};
let TestsOEmbeds = class TestsOEmbeds {
    embed_create(embedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new models_1.EmbedModel(embedData);
            try {
                const result = (yield controllers_1.Embed.create(embed, global.User.ScriptId, global.User.GroupId)).result;
                global.User.EmbedId = result.EmbedId;
                alsatian_1.Expect(result).toBeDefined();
            }
            catch (ex) {
                alsatian_1.Expect(embedData).toBe(null);
            }
        });
    }
    embed_update(embedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new models_1.EmbedModel(embedData);
            try {
                const result = yield controllers_1.Embed.update(embed, global.User.ScriptId, global.User.GroupId, global.User.EmbedId);
                alsatian_1.Expect(result).toBeDefined();
            }
            catch (ex) {
                alsatian_1.Expect(embedData).toBe(null);
            }
        });
    }
    embed_list() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield controllers_1.Embed.list(global.User.ScriptId, global.User.GroupId);
            alsatian_1.Expect(result).toBeDefined();
        });
    }
    embed_get() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield controllers_1.Embed.get(global.User.ScriptId, global.User.GroupId, global.User.EmbedId);
            alsatian_1.Expect(result).toBeDefined();
        });
    }
};
__decorate([
    alsatian_1.AsyncTest('embed_create'),
    alsatian_1.TestCase(Data.Embed),
    alsatian_1.TestCase(null),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestsOEmbeds.prototype, "embed_create", null);
__decorate([
    alsatian_1.AsyncTest('embed_update'),
    alsatian_1.TestCase(Data.Embed),
    alsatian_1.TestCase(null),
    alsatian_1.Timeout(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
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
TestsOEmbeds = __decorate([
    alsatian_1.TestFixture('Test Embeds')
], TestsOEmbeds);
exports.TestsOEmbeds = TestsOEmbeds;
//# sourceMappingURL=embed.spec.js.map