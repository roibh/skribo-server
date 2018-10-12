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
const data_1 = require("@methodus/data");
/*start custom*/
/*end custom*/
let ScriptModel = ScriptModel_1 = class ScriptModel extends data_1.Repo {
    constructor(copyData) {
        super(copyData, ScriptModel_1);
    }
};
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], ScriptModel.prototype, "ScriptId", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", Array)
], ScriptModel.prototype, "Variables", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], ScriptModel.prototype, "Code", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], ScriptModel.prototype, "Name", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], ScriptModel.prototype, "Description", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], ScriptModel.prototype, "GroupId", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", Object)
], ScriptModel.prototype, "ResultsDescriptor", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", Date)
], ScriptModel.prototype, "LastRunDate", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], ScriptModel.prototype, "LastResultId", void 0);
ScriptModel = ScriptModel_1 = __decorate([
    data_1.Model('Scripts'),
    __metadata("design:paramtypes", [Object])
], ScriptModel);
exports.ScriptModel = ScriptModel;
var ScriptModel_1;
//# sourceMappingURL=script.model.js.map