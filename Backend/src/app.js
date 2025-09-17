require('dotenv').config();
const express =require('express');
const http=require('http');
const { Server }=require('socket.io');
const mongoose = require('mongoose');
const cors =require('cors');
const helmet=require('helmet');
const morgan=require('morgan');
// const socketIo = require('socket.io');

const app =express();

// Http Server and Socket Io (express + socketIO)
const server =http.createServer(app);
const io =new Server(server,{cors: { origin: "*", methods:["GET", "POST"], credentials:true }, transports: ["websocket", "polling"], allowEIO3: true});

// Middlewares 
app.use(helmet()); // security headers 
app.use(cors());    //allow cross-origin requests
app.use(express.json());    //parse JSON bodies
app.use(morgan('dev'));     //request logging 



// Simple test route 
app.get("/",(req,res)=> {
    res.send("Wimb backend is running ... ");
});


//Routes , REST APIs
const authRoutes = require('./routes/auth');
app.use('/api/auth',authRoutes);

const busRoutes = require('./routes/buses');
app.use('/api/buses', busRoutes);

const routeRoutes = require('./routes/routes');
app.use('/api/routes', routeRoutes);

const assignmentRoutes = require('./routes/assignments');
const Driver = require('./models/Driver');
app.use('/api/assignments',assignmentRoutes);









const initSocket= require('./socket/index');
initSocket(io);

// // Socket.Io setup  NP
// io.on("connection", (socket) => {
//     console.log("Client Connected: ",socket.id);
//     socket.onAny((event,...args) => {
//         console.log("Event Recived: " ,event,args); 
//     });

//     //Driver sends GPS location 
//     socket.on('driverLocation',(data) => {
//         console.log("Driver Location: ", data);
        
//         //Broadcasting Location to all clients 
//         io.emit("busLocationUpdate",data);
//     });
    

//     //Handles Disconnections 
//     socket.on("disconnect", (reason) => {
//         console.log("Client Disconnected: ", socket.id, "Reason: ",reason);
//     });
    
// });




// Start server after Mongo Connects 
const PORT =process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI).then(() =>{
    console.log("MongoDb Connected ");
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);

    });
}).catch(err => {
    console.error("Mongo connection error: ",err.message);
});
