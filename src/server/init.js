import http from "http";
import express from "express";
import WebSocket, { WebSocketServer } from 'ws';

const app = express();
const httpServer = http.createServer(app);
const wss = new WebSocketServer({ server: httpServer }, () => {
    console.log("error: fail to create WebSocketServer!");
});
const sockets = [];

export { app, httpServer, wss, sockets };