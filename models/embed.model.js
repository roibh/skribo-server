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
Object.defineProperty(exports, "__esModule", { value: true });
var EmbedModel_1;
const data_1 = require("@methodus/data");
let EmbedModel = EmbedModel_1 = class EmbedModel extends data_1.Repo {
    constructor(copyData) {
        super(copyData, EmbedModel_1);
    }
};
__decorate([
    data_1.Field(),
    __metadata("design:type", Number)
], EmbedModel.prototype, "ID", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", Object)
], EmbedModel.prototype, "GroupId", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], EmbedModel.prototype, "ScriptId", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], EmbedModel.prototype, "EmbedId", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", Array)
], EmbedModel.prototype, "Variables", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], EmbedModel.prototype, "Name", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], EmbedModel.prototype, "Page", void 0);
EmbedModel = EmbedModel_1 = __decorate([
    data_1.Model('Embed'),
    __metadata("design:paramtypes", [Object])
], EmbedModel);
exports.EmbedModel = EmbedModel;
//# sourceMappingURL=embed.model.js.map