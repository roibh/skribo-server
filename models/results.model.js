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
let ResultsModel = ResultsModel_1 = class ResultsModel extends data_1.Repo {
    constructor(copyData) {
        super(copyData, ResultsModel_1);
    }
};
__decorate([
    data_1.Field(),
    __metadata("design:type", Number)
], ResultsModel.prototype, "ID", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", Object)
], ResultsModel.prototype, "GroupId", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], ResultsModel.prototype, "ScriptId", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], ResultsModel.prototype, "EmbedId", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", Array)
], ResultsModel.prototype, "Variables", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", Date)
], ResultsModel.prototype, "Date", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", Object)
], ResultsModel.prototype, "Data", void 0);
ResultsModel = ResultsModel_1 = __decorate([
    data_1.Model('Results'),
    __metadata("design:paramtypes", [Object])
], ResultsModel);
exports.ResultsModel = ResultsModel;
var ResultsModel_1;
//# sourceMappingURL=results.model.js.map