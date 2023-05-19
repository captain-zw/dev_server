const http =require('http');

const serverHandler = require('../app')

const PORT =5001;

const server =http.createServer(serverHandler);

server.listen(PORT,(()=>{
    console.log('server running at port-'+PORT+'...')
}))
