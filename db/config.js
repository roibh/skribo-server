"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = process.env.NODE_CONFIG_ENV;
exports.configuration = require(`../config/${env}`).Config;
console.log(exports.configuration);
//# sourceMappingURL=config.js.map