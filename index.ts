
import {
    ServerConfiguration, PluginConfiguration,
    ClientConfiguration, ConfiguredServer, MethodType, ServerType,
} from '@methodus/server';
import { Embed, Scripts, Serve, Log, Sync, Results, User } from './controllers/';
export * from './models/';
import { DBHandler } from '@methodus/data';
import { configuration } from './db/config';
import { Alexa } from './controllers/alexa';

DBHandler.config = configuration;

@ServerConfiguration(ServerType.Express, { port: process.env.PORT || 6200 })
@PluginConfiguration('@methodus/describe')
@ClientConfiguration(Scripts, MethodType.Local, ServerType.Express)
@ClientConfiguration(Embed, MethodType.Local, ServerType.Express)
@ClientConfiguration(Serve, MethodType.Local, ServerType.Express)
@ClientConfiguration(Log, MethodType.Local, ServerType.Express)
@ClientConfiguration(Sync, MethodType.Local, ServerType.Express)
@ClientConfiguration(Results, MethodType.Local, ServerType.Express)
@ClientConfiguration(User, MethodType.Local, ServerType.Express)
@ClientConfiguration(Alexa, MethodType.Local, ServerType.Express)
class SetupServer extends ConfiguredServer {

}

(global as any).skribo = new SetupServer();
