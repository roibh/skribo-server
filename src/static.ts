import * as path from 'path';
import { BuiltInServers } from '@methodus/server';
export function init(config, pluginOptions) {
    config.run('express', {
        onStart: (instance) => {
            const options = {
                etag: true,
                extensions: ['woff', 'woff2', 'ttf', 'eot'],
                maxAge: '1d',
                index: ['index.html', 'player.html', 'admin.html'],
                redirect: false,
                setHeaders: (res) => {
                    res.set('x-timestamp', Date.now());
                },
            };
            const clientDir = path.resolve(path.join(__dirname, '..', pluginOptions.clientPath));
            instance.use(pluginOptions.path, BuiltInServers.Express.static(clientDir, options));
        },
    });
    return config;
}
