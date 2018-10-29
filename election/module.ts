
import * as path from 'path';
import * as express from 'express';


export function init(config, pluginOptions) {

    process.env.describe_route = (pluginOptions && pluginOptions.path) ? pluginOptions.path : '';
    const describePath = process.env.describe_route + '/election';

    config.run('express', {
        onStart: (instance) => {
            const options: any = {

                etag: true,
                extensions: ['htm', 'html', 'js', 'js.map', 'css'],
                maxAge: '1d',
                redirect: false,
                setHeaders: (res) => {
                    res.set('x-timestamp', Date.now())
                },
            };

            const clientDir = path.resolve(__dirname);
            instance.use(describePath, express.static(clientDir, options));

            const methodClientPath = path.join(process.cwd(), 'node_modules', '@methodus/client', 'dist');
            instance.use(`${describePath}/scripts/`, express.static(methodClientPath, options));





        }
    });





    // config.use(Config, MethodType.Local, ServerType.Express, process.env.CONFIGURATIO_SERVICE);


    return config;
}