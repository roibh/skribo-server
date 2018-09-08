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
let UserAccountModel = UserAccountModel_1 = class UserAccountModel extends data_1.Repo {
    constructor(copyData) {
        super(copyData, UserAccountModel_1);
    }
};
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], UserAccountModel.prototype, "AccountKey", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], UserAccountModel.prototype, "GroupId", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], UserAccountModel.prototype, "AccountName", void 0);
UserAccountModel = UserAccountModel_1 = __decorate([
    data_1.Model('UserAccount'),
    __metadata("design:paramtypes", [Object])
], UserAccountModel);
exports.UserAccountModel = UserAccountModel;
var UserAccountModel_1;
//# sourceMappingURL=user-account.model.js.map