"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = process.env.NODE_CONFIG_ENV || 'local';
exports.configuration = require(`../config/${env}`).Config;
//# sourceMappingURL=config.js.map