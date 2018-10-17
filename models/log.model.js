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
var LogModel_1;
const data_1 = require("@methodus/data");
let LogModel = LogModel_1 = class LogModel extends data_1.Repo {
    constructor(copyData) {
        super(copyData, LogModel_1);
    }
};
__decorate([
    data_1.Field(),
    __metadata("design:type", Number)
], LogModel.prototype, "ID", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", Object)
], LogModel.prototype, "Log", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], LogModel.prototype, "ScriptId", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], LogModel.prototype, "EmbedId", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], LogModel.prototype, "GroupId", void 0);
LogModel = LogModel_1 = __decorate([
    data_1.Model('Log'),
    __metadata("design:paramtypes", [Object])
], LogModel);
exports.LogModel = LogModel;
//# sourceMappingURL=log.model.js.map