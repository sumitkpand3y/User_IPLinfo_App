import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/index.js'; 
// import { Server } from 'socket.io';
import { Server } from 'socket.io';
import passport from 'passport';
import http from 'http';
import { scheduleCronJob } from './utils/scheduler.js';
import {connect} from './config/database.js';

import { passportAuth } from './config/jwt-middleware.js';
import { Config } from './config/serverConfigs.js';
import { addDefaultIplTeams } from './seeders/index.js'
// import { setupSocket } from './utils/socket.js';
import cors from 'cors'; 

console.log("dsds");

const app = express();
const server = http.createServer(app);
// console.log("server", server);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
// console.log("sdsd", io);
// const io = setupSocket(server);
const config = new Config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
passportAuth(passport);



app.use('/api', apiRoutes);
// console.log(io);
io.on('connection', (socket) => {
    console.log("user connected");
    // console.log('A user connected', socket);

    socket.emit('serverMessage', 'Hello from server!');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

scheduleCronJob()

const port = config.port;
server.listen(port, async () => {
    console.log("Server is running on port: " + port);
    await connect();
    console.log('Mongo db connected');

    // adding default Ipl teams to the db
    addDefaultIplTeams()

    // checking over selectedTeams
});