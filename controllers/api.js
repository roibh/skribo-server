"use strict";
/*

____ _  _ ____ _ ___  ____
[__  |_/  |__/ | |__] |  |
___] | \_ |  \ | |__] |__|
                           

*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const server_1 = require("@methodus/server");
const AdwordsUser = require('node-adwords').AdwordsUser;
var auth = require('../auth/adwords-auth');
const AdwordsConstants = require('node-adwords').AdwordsConstants;
const clientId = '255821801347-ej0uipmjrq93ottab7obbj0vgeqbshv8.apps.googleusercontent.com';
const clientSecret = 'I3xfM4IYsZ6DbsHTPIGeh6ep';
const redirectUri = 'http://localhost:8020/api/auth';
let userInfo = {
    developerToken: '97z8AFCZpBu1yEHFliaOyg',
    userAgent: 'AllJobs MCC',
    clientCustomerId: '675-699-7184',
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: undefined,
    auth: undefined,
    redirect_url: redirectUri
};
function authMiddleware(req, res, next) {
    // userInfo.redirect_url = userInfo.redirect_url ||  redirectUri + encodeURIComponent(req.url);
    debugger;
    if (!userInfo.auth) {
        userInfo.auth = 'tempauth';
        return auth.getTokens(clientId, clientSecret, userInfo.redirect_url, function (err, tokens) {
            if (err)
                throw err;
            userInfo.auth = tokens;
            next();
        });
    }
    else {
        console.log(userInfo.redirect_url);
        next();
    }
}
exports.authMiddleware = authMiddleware;
function refreshTokens() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                if (userInfo.refresh_token) {
                    clearInterval(interval);
                    resolve();
                }
                if (userInfo.auth) {
                    auth.getRefresTokens(clientId, clientSecret, userInfo.redirect_url, userInfo.auth, (err, tokens) => {
                        tokens = JSON.parse(tokens);
                        if (!tokens)
                            userInfo.auth = null;
                        clearInterval(interval);
                        userInfo.refresh_token = tokens.refresh_token;
                        resolve();
                    });
                }
            }, 1000);
        });
    });
}
let Api = class Api {
    static auth(code, returnto, res) {
        return __awaiter(this, void 0, void 0, function* () {
            userInfo.auth = code;
            if (!userInfo.refresh_token) {
                yield refreshTokens();
            }
            res.redirect(302, returnto);
        });
    }
    static listClients() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userInfo.refresh_token) {
                yield refreshTokens();
            }
            let user = new AdwordsUser(userInfo);
            let campaignService = user.getService('CampaignService', 'v201802');
            //create selector
            let selector = {
                fields: ['Id', 'Name'],
                ordering: [{ field: 'Name', sortOrder: 'ASCENDING' }],
                paging: { startIndex: 0, numberResults: AdwordsConstants.RECOMMENDED_PAGE_SIZE }
            };
            const result = yield new Promise((resolve, reject) => {
                campaignService.get({ serviceSelector: selector }, (error, result) => {
                    resolve(result);
                });
            });
            return new server_1.MethodResult(result);
        });
    }
    static listAdGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userInfo.refresh_token) {
                yield refreshTokens();
            }
            let user = new AdwordsUser(userInfo);
            let adGroupService = user.getService('AdGroupService', 'v201802');
            //create selector
            let selector = {
                fields: ['Id', 'Name'],
                //ordering: [{ field: 'Name', sortOrder: 'ASCENDING' }],
                paging: { startIndex: 0, numberResults: AdwordsConstants.RECOMMENDED_PAGE_SIZE }
            };
            const result = yield new Promise((resolve, reject) => {
                adGroupService.get({ serviceSelector: selector }, (error, result) => {
                    resolve(result);
                });
            });
            return new server_1.MethodResult(result);
        });
    }
    static listAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userInfo.refresh_token) {
                yield refreshTokens();
            }
            let user = new AdwordsUser(userInfo);
            let adGroupService = user.getService('AccountLabelService', 'v201802');
            //create selector
            let selector = {
                fields: ['Id', 'Name'],
                //ordering: [{ field: 'Name', sortOrder: 'ASCENDING' }],
                paging: { startIndex: 0, numberResults: AdwordsConstants.RECOMMENDED_PAGE_SIZE }
            };
            const result = yield new Promise((resolve, reject) => {
                adGroupService.get({ serviceSelector: selector }, (error, result) => {
                    resolve(result);
                });
            });
            return new server_1.MethodResult(result);
        });
    }
};
__decorate([
    server_1.Method("GET" /* Get */, '/api/auth'),
    __param(0, server_1.Query('code')), __param(1, server_1.Query('returnto')), __param(2, server_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], Api, "auth", null);
__decorate([
    server_1.Method("GET" /* Get */, '/api/clients', [authMiddleware]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Api, "listClients", null);
__decorate([
    server_1.Method("GET" /* Get */, '/api/adgroups', [authMiddleware]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Api, "listAdGroups", null);
__decorate([
    server_1.Method("GET" /* Get */, '/api/accounts', [authMiddleware]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Api, "listAccounts", null);
Api = __decorate([
    server_1.MethodConfig('Api')
], Api);
exports.Api = Api;
//# sourceMappingURL=api.js.map