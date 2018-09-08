"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hashCode(str) {
    var hash = 0;
    if (str.length == 0)
        return hash;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
exports.hashCode = hashCode;
//# sourceMappingURL=hash.js.map