"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@methodus/server");
const _1 = require("./controllers/");
__export(require("./models/"));
const data_1 = require("@methodus/data");
const config_1 = require("./db/config");
const alexa_1 = require("./controllers/alexa");
data_1.DBHandler.config = config_1.configuration;
let SetupServer = class SetupServer extends server_1.ConfiguredServer {
};
SetupServer = __decorate([
    server_1.ServerConfiguration("express" /* Express */, { port: process.env.PORT || 6200 }),
    server_1.PluginConfiguration('@methodus/describe'),
    server_1.ClientConfiguration(_1.Scripts, "Local" /* Local */, "express" /* Express */),
    server_1.ClientConfiguration(_1.Embed, "Local" /* Local */, "express" /* Express */),
    server_1.ClientConfiguration(_1.Serve, "Local" /* Local */, "express" /* Express */),
    server_1.ClientConfiguration(_1.Log, "Local" /* Local */, "express" /* Express */),
    server_1.ClientConfiguration(_1.Sync, "Local" /* Local */, "express" /* Express */),
    server_1.ClientConfiguration(_1.Results, "Local" /* Local */, "express" /* Express */),
    server_1.ClientConfiguration(_1.User, "Local" /* Local */, "express" /* Express */),
    server_1.ClientConfiguration(alexa_1.Alexa, "Local" /* Local */, "express" /* Express */)
], SetupServer);
global.skribo = new SetupServer();
//# sourceMappingURL=index.js.map