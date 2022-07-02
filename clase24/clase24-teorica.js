/*
*  SESSION memory
*
*  el memoryStore es almacenamiento en memoria, que solo esta disponible
* en desarrollo y no en produccion
*
* SESSION FileStore
*
*  se almacena la informacion en una carpeta de archivos (datos de session)
*  estos datos van a persistir y quedaran guardados en el servidor
*
* npm i session-file-store --save
*
* SESSION REDIS Y REDISLAB
*
* REDIS:
* servidor de diccionarios remoto que funciona como un
* almacen6 de datos key-value en memoria de codigo abierto
* Se pueden utilizar como database, cache y agente de mensaje
*
* npm i redis connect-redis
*
* REDISLAB
* servidor en la nube de redis
*
* SESSION MON6GO
*  se puede crear una session con mongo creando la session con
* MongoStore.create
*
*  npm i connect-mongo --save
*
* */