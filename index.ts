
import { ServerConfiguration, PluginConfiguration, ClientConfiguration, ConfiguredServer, MethodType, ServerType } from '@methodus/server';
import { Api, Embed, Scripts, Serve, Log,Sync,Results, User } from './controllers/';
 
var Raven = require('raven');
Raven.config('https://8ae906af26fd4d4380f908751eacf016@sentry.io/1231711').install();


@ServerConfiguration(ServerType.Express, { port: process.env.PORT || 6200 })
@PluginConfiguration('@methodus/describe')
//@ClientConfiguration(Api, MethodType.Local, ServerType.Express)
@ClientConfiguration(Scripts, MethodType.Local, ServerType.Express)
@ClientConfiguration(Embed, MethodType.Local, ServerType.Express)
@ClientConfiguration(Serve, MethodType.Local, ServerType.Express)
@ClientConfiguration(Log, MethodType.Local, ServerType.Express)
@ClientConfiguration(Sync, MethodType.Local, ServerType.Express)
@ClientConfiguration(Results, MethodType.Local, ServerType.Express)
@ClientConfiguration(User, MethodType.Local, ServerType.Express)
class SetupServer extends ConfiguredServer {

}

new SetupServer();


