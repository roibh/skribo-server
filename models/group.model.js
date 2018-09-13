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
var GroupModel_1;
const data_1 = require("@methodus/data");
let GroupModel = GroupModel_1 = class GroupModel extends data_1.Repo {
    constructor(copyData) {
        super(copyData, GroupModel_1);
    }
};
__decorate([
    data_1.ObjectId(),
    data_1.Field(),
    __metadata("design:type", String)
], GroupModel.prototype, "_id", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], GroupModel.prototype, "Name", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], GroupModel.prototype, "GroupId", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", Date)
], GroupModel.prototype, "Date", void 0);
GroupModel = GroupModel_1 = __decorate([
    data_1.Model('Group'),
    __metadata("design:paramtypes", [Object])
], GroupModel);
exports.GroupModel = GroupModel;
//# sourceMappingURL=group.model.js.map