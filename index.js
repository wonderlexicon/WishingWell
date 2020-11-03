let express = require('express');
let app = express();
app.use("/", express.static("."));

let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT ||3000;
server.listen(port,() =>{
    console.log("server listening");
});
