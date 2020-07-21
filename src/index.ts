import Server from './clases/server';

// Server Instance.
const server = Server.instance;

server.start( () => {
    console.log(`Server running on port ${server.port}`);
});

