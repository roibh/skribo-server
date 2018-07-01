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
const db_1 = require("../db");
const FS = require("fs");
const uuidv1 = require('uuid/v1');
let Serve = class Serve {
    static get(script_id, group_id, embed_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_1.DB();
                const codeResult = yield client.query(`SELECT * FROM public.scripts SET   WHERE  "ScriptId"=$1;`, [script_id]);
                if (codeResult.rowCount > 0) {
                    let code = codeResult.rows[0].Code;
                    const InstanceScript = yield client.query('SELECT * FROM public.embeds WHERE "ScriptId"=$1 and "GroupId"=$2 and "EmbedId"=$3', [script_id, group_id, embed_id]);
                    if (InstanceScript.rowCount > 0) {
                        let variables = InstanceScript.rows[0].Variables;
                        variables = JSON.parse(variables);
                        variables.forEach((element) => {
                            code = code.replace(/\$\$element.name\$/g, element.value);
                        });
                        let function_code = FS.readFileSync('./content/pipe_functions.js', { encoding: 'utf-8' });
                        const dataUrl = script_id + '/' + group_id + '/' + embed_id;
                        function_code = function_code.replace(/\$SCRIPTURL\$/g, `serve/${dataUrl}`);
                        function_code = function_code.replace(/\$LOGURL\$/g, `log/${dataUrl}`);
                        function_code = function_code.replace(/\$RESULTURL\$/g, `results/${dataUrl}/`);
                        function_code = function_code.replace(/\$SERVERURL\$/g, `https://skribo.herokuapp.com/`);
                        function_code = function_code.replace(/\$SYNCURL\$/g, `sync/${group_id}/`);
                        function_code = function_code.replace(/\$SKRIBODATA\$/g, `'` + JSON.stringify({
                            'group_id': group_id,
                            'base_url': 'https://skribo.herokuapp.com'
                        }) + `'`);
                        return new server_1.MethodResult(function_code + code);
                    }
                }
                throw (new server_1.MethodError('not found', 404));
            }
            catch (error) {
                console.error(error);
            }
        });
    }
};
__decorate([
    server_1.Method("GET" /* Get */, '/serve/:script_id/:group_id/:embed_id'),
    __param(0, server_1.Param('script_id')), __param(1, server_1.Param("group_id")), __param(2, server_1.Param('embed_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], Serve, "get", null);
Serve = __decorate([
    server_1.MethodConfig('Serve')
], Serve);
exports.Serve = Serve;
//# sourceMappingURL=serve.js.map