import {
    ServerConfiguration,
    PluginConfiguration,
    ConfiguredServer,
    RouterConfiguration,
    BuiltInServers,
} from '@methodus/server';
import { Embed, Scripts, Serve, Log, Sync, Results, User } from './controllers/';
export * from './models/';
import * as path from 'path';
import { DBHandler } from '@methodus/data';
import { configuration } from './db/config';
import { Auth } from './controllers/auth.controller';

DBHandler.config = configuration;

@ServerConfiguration(BuiltInServers.Express, { port: process.env.PORT || 6200 })
@PluginConfiguration(path.join(__dirname, 'static'), { path: '/', clientPath: '/public' })
@PluginConfiguration('@methodus/describe')

@RouterConfiguration(Scripts, BuiltInServers.Express)
@RouterConfiguration(Embed, BuiltInServers.Express)
@RouterConfiguration(Serve, BuiltInServers.Express)
@RouterConfiguration(Log, BuiltInServers.Express)
@RouterConfiguration(Sync, BuiltInServers.Express)
@RouterConfiguration(Results, BuiltInServers.Express)
@RouterConfiguration(User, BuiltInServers.Express)
@RouterConfiguration(Auth, BuiltInServers.Express)
class SetupServer extends ConfiguredServer {
    constructor() {
        super(SetupServer);
        this.on('ready', async () => {
            // tslint:disable-next-line:no-console
            console.log('Ready.');
        });
    }
}

(global as any).skribo = new SetupServer();
