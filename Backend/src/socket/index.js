const socketAuth = require("./middleware/auth");
const driverHandler = require('./handlers/driverHandler');
const adminHandler = require('./handlers/adminHandler');
const userHandler = require('./handlers/userHandler');





function initSocket(io) {
    //Auth
    io.use(socketAuth);


    io.on('connection', (socket) => {
        console.log("Client Connected: ",socket.id, "Role: ",socket.user?.role);

        //Role BAsed Handler 
        if(socket.user?.role === "driver") {
            driverHandler(io,socket);

        } else if (socket.user?.role === "admin") {
            adminHandler(io,socket);
        } else {
            userHandler(io, socket);
        }

        socket.on("disconnect", () => {
            console.log("Client Disconnected: ", socket.id);
        });
        
    });
    
}


module.exports = initSocket;

