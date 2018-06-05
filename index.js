"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const scripts_1 = require("./controllers/scripts");
const embed_1 = require("./controllers/embed");
const server_1 = require("@methodus/server");
console.log(server_1.ServerConfiguration, server_1.ClientConfiguration);
let SetupServer = class SetupServer extends server_1.ConfiguredServer {
};
SetupServer = __decorate([
    server_1.ServerConfiguration("express" /* Express */, { port: process.env.PORT || 6200 }),
    server_1.PluginConfiguration('@methodus/describe')
    //@ClientConfiguration(Api, MethodType.Local, ServerType.Express)
    ,
    server_1.ClientConfiguration(scripts_1.Scripts, "Local" /* Local */, "express" /* Express */),
    server_1.ClientConfiguration(embed_1.Embed, "Local" /* Local */, "express" /* Express */)
], SetupServer);
new SetupServer();
//# sourceMappingURL=index.js.map