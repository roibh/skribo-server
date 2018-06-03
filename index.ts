import { Api } from './controllers/api';
import { Scripts } from './controllers/scripts';
import { Embed } from './controllers/embed';
import { ServerConfiguration, PluginConfiguration, ClientConfiguration, ConfiguredServer, MethodType, ServerType } from '@methodus/server';

console.log(ServerConfiguration, ClientConfiguration);

@ServerConfiguration(ServerType.Express, { port: process.env.PORT || 6200 })
@PluginConfiguration('@methodus/describe')
//@ClientConfiguration(Api, MethodType.Local, ServerType.Express)
@ClientConfiguration(Scripts, MethodType.Local, ServerType.Express)
@ClientConfiguration(Embed, MethodType.Local, ServerType.Express)

class SetupServer extends ConfiguredServer {

}

new SetupServer();


