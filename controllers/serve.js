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
/*

____ _  _ ____ _ ___  ____
[__  |_/  |__/ | |__] |  |
___] | \_ |  \ | |__] |__|

*/
const data_1 = require("@methodus/data");
const server_1 = require("@methodus/server");
const FS = require("fs");
const embed_model_1 = require("../models/embed.model");
const script_model_1 = require("../models/script.model");
let Serve = class Serve {
    static get(scriptId, groupId, embedId) {
        return __awaiter(this, void 0, void 0, function* () {
            const codeResult = yield script_model_1.ScriptModel.query(new data_1.Query(script_model_1.ScriptModel).filter({ ScriptId: scriptId }));
            if (codeResult.length > 0) {
                const InstanceScript = (yield new data_1.Query(embed_model_1.EmbedModel).filter({
                    EmbedId: embedId, GroupId: groupId, ScriptId: scriptId,
                }).run());
                if (InstanceScript.length > 0) {
                    return this.generateCode(InstanceScript, codeResult, scriptId, groupId, embedId);
                }
            }
            else {
                throw (new server_1.MethodError('not found', 404));
            }
        });
    }
    static generateCode(InstanceScript, codeResult, scriptId, groupId, embedId) {
        let variables = InstanceScript[0].Variables || [];
        if (typeof variables === 'string') {
            variables = JSON.parse(variables);
        }
        const preCode = this.generateVariables(variables);
        const code = codeResult[0].Code;
        const functionCode = this.processTemplate(scriptId, groupId, embedId);
        return new server_1.MethodResult(preCode + functionCode + code);
    }
    static generateVariables(variables) {
        return [
            'var SkriboEnv =  {',
            ...variables.map((item) => {
                switch (item.type) {
                    case 'number':
                        return `"${item.name}":${item.value},`;
                    case 'string':
                        return `"${item.name}":"${item.value}",`;
                    case 'date':
                        return `"${item.name}":"${item.value}",`;
                    case 'date-span':
                        return `"${item.name}":"${item.value}",`;
                    case 'date-range':
                        return `"${item.name}":${JSON.stringify(this.timespanToRange(item.value))},`;
                    case 'account':
                        return `"${item.name}": ${JSON.stringify(item.value)},`;
                }
            }),
            '};',
        ].join('\n');
    }
    static timespanToRange(timespan) {
        // 'TODAY', 'YESTERDAY', 'LAST_7_DAYS', 'THIS_WEEK_SUN_TODAY',
        // 'THIS_WEEK_MON_TODAY', 'LAST_WEEK', 'LAST_14_DAYS', 'LAST_30_DAYS',
        // 'LAST_WEEK', 'LAST_BUSINESS_WEEK', 'LAST_WEEK_SUN_SAT', 'THIS_MONTH', 'LAST_MONTH', 'ALL_TIME'
        switch (timespan) {
            case 'TODAY': {
                const dateString = this.rangeBack(0);
                return { start: dateString, end: dateString };
            }
            case 'YESTERDAY': {
                const date = new Date();
                date.setDate(date.getDate() - 1);
                const dateString = this.rangeBack(1);
                return { start: dateString, end: this.rangeBack(0) };
            }
            case 'LAST_7_DAYS': {
                const dateString = this.rangeBack(7);
                return { start: dateString, end: this.rangeBack(0) };
            }
            case 'LAST_14_DAYS': {
                const dateString = this.rangeBack(14);
                return { start: dateString, end: this.rangeBack(0) };
            }
            case 'LAST_MONTH':
            case 'LAST_30_DAYS': {
                const dateString = this.rangeBack(30);
                return { start: dateString, end: this.rangeBack(0) };
            }
        }
    }
    static processTemplate(scriptId, groupId, embedId) {
        let functionCode = FS.readFileSync('./content/pipe_functions.js', { encoding: 'utf-8' });
        const dataUrl = scriptId + '/' + groupId + '/' + embedId;
        functionCode = functionCode.replace(/\$SCRIPTURL\$/g, `serve/${dataUrl}`);
        functionCode = functionCode.replace(/\$LOGURL\$/g, `log/${dataUrl}`);
        functionCode = functionCode.replace(/\$RESULTURL\$/g, `results/${dataUrl}/`);
        functionCode = functionCode.replace(/\$SERVERURL\$/g, `https://skribo.herokuapp.com/`);
        functionCode = functionCode.replace(/\$SYNCURL\$/g, `sync/${groupId}/`);
        functionCode = functionCode.replace(/\$SKRIBODATA\$/g, `'` + JSON.stringify({
            base_url: 'https://skribo.herokuapp.com',
            group_id: groupId,
        }) + `'`);
        return functionCode;
    }
    static rangeBack(days) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date.toISOString().split('T')[0];
    }
};
__decorate([
    server_1.Method("GET" /* Get */, '/serve/:script_id/:group_id/:embed_id'),
    __param(0, server_1.Param('script_id')), __param(1, server_1.Param('group_id')), __param(2, server_1.Param('embed_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], Serve, "get", null);
Serve = __decorate([
    server_1.MethodConfig('Serve')
], Serve);
exports.Serve = Serve;
//# sourceMappingURL=serve.js.map