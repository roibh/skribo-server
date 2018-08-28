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
var UserModel_1;
const data_1 = require("@methodus/data");
let UserModel = UserModel_1 = class UserModel extends data_1.Repo {
    constructor(copyData) {
        super(copyData, UserModel_1);
    }
};
__decorate([
    data_1.Field(),
    __metadata("design:type", Number)
], UserModel.prototype, "ID", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", Object)
], UserModel.prototype, "GroupId", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], UserModel.prototype, "FirstName", void 0);
__decorate([
    data_1.Field(),
    __metadata("design:type", String)
], UserModel.prototype, "LastName", void 0);
UserModel = UserModel_1 = __decorate([
    data_1.Model('User'),
    __metadata("design:paramtypes", [Object])
], UserModel);
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map