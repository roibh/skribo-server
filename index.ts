
import { ServerConfiguration, PluginConfiguration, ClientConfiguration, ConfiguredServer, MethodType, ServerType } from '@methodus/server';
import { Api, Embed, Scripts, Serve, Log,Sync } from './controllers/';
 



@ServerConfiguration(ServerType.Express, { port: process.env.PORT || 6200 })
@PluginConfiguration('@methodus/describe')
//@ClientConfiguration(Api, MethodType.Local, ServerType.Express)
@ClientConfiguration(Scripts, MethodType.Local, ServerType.Express)
@ClientConfiguration(Embed, MethodType.Local, ServerType.Express)
@ClientConfiguration(Serve, MethodType.Local, ServerType.Express)
@ClientConfiguration(Log, MethodType.Local, ServerType.Express)
@ClientConfiguration(Sync, MethodType.Local, ServerType.Express)
class SetupServer extends ConfiguredServer {

}

new SetupServer();


