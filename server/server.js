const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const cors = require('cors');

const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: '*'
}));
server.use(router);

server.listen(PORT, ()=>{
    console.log("Server is running");
})