function driverHandler(io, socket) {
    console.log("Driver connected: ",socket.id);


    //Driver Location 
    socket.on("driverLocation",(data) => {
        console.log("Driver Location: ",data);

        //broadcast to everyone , later to only users 
        io.emit('busLocationUpdate',data);
        
        
    });
    
}

module.exports = driverHandler;