import jsonOverTcp from 'json-over-tcp-2';

const server = jsonOverTcp.createServer({ port: 5000 });
server.on('connection', socket => {
  socket.on('data', (data) => {
    console.log(`INFO: server: data received from the client: `, data);
  });
});

server.listen(5000, () => console.log(`INFO: server: TCP server started and listening on port 5000`));
