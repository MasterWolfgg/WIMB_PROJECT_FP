function adminHandler(io, socket) {
    console.log("Admin Connected: ", socket.id);

    //Example : admin requestes all active buses
    socket.on("getActiveBuses", () => {
        io.emit("sendActiveBuses", {buses: ["bus1","bus2"]});
    });

}


module.exports = adminHandler;

