import { Server } from "socket.io";
import http from "http";
import express from "express";
import { log } from "console";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        //methods: ["GET", "POST"],
        //credentials: true
    },
});

const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("User connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
    })

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User joined room: ", room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("send message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        if (!chat.participents) return console.log("chat.participents not defined");
        chat.participents.forEach((participent) => {
            if (participent._id == newMessageRecieved.sender._id) return;
            socket.to(participent._id).emit("message received", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("User disconnected from socket.io");
        socket.leave(userData._id);
    });
})

export {app, io, server};