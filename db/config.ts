const env = process.env.NODE_CONFIG_ENV;
export const configuration = require(`../config/${env}`).Config;

console.log(configuration);
