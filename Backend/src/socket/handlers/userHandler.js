function userHandler (io, socket){
    console.log("User connected :", socket.id);


    //Example: User subscribes to Bus 
    socket.on("subscribeBus", (busId) => {
        socket.join(`bus_${busId}`);
        console.log(`User joined bus_${busId}`);
    });
    
    
    
};



module.exports = userHandler;


