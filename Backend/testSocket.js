const { connect } = require("mongoose");
const {io} = require("socket.io-client");

//connection to backend
const socket =io("http://locathost:4000", {
    transports: ["websocket"], //force websocket 
    reconnectionAttempts: 5, //try reconnect 
    timeout: 5000,
    autoConnect:true
});


//when connnected 
socket.on("connect",() => {
    console.log("Connected to server",socket.id);

    socket.emit("hello", "Hi from client Tests");
    

    //send driver loaction 
    // socket.emit("driverLocation", {
    //     driverId: "68c6acabdf4dbdfe7b200ba7",
    //     busId: "68c5a955303f4c365f6e70ce",
    //     coords: {lat: 22.34, lon: 63.54},
    //     timestamp: new Date()
    // });
    
});

socket.on("world",(msg) => {
    console.log('Server Replied: ',msg);
})

//listens for broadcast
// socket.on("busLocationUpdate",(data) => {
//     console.log("Bus Update Recived: ",data);
// });



//Handles  Errors 
socket.on("connect_error", (err)=> {
    console.log("Connection error: ",err.message);
});



socket.on("disconnected", (reason) => {
    console.log("Disconnected from server Rason: ",reason);
});
