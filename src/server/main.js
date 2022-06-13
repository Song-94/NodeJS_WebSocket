import express from "express";
import { app, httpServer, wss, sockets } from "./config.js";
import makeHandlers from "./handlers.js";

app.set("views", __dirname + "/../views"); // template location setting.
app.set("view engine", "pug"); // view engine set 'pug'.

app.use("/public", express.static(__dirname + "/../public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/*", (req, res) => {
    // only use home.
    res.redirect("/");
});

wss.on("error", (error) => {
    console.log("ws error: ", error);
});

wss.on("close", () => {
    console.log("ws closed.");
});

wss.on("connection", (socket) => {
    const {
        handleSocketClose,
        handleSocketError,
        handleSocketOpen,
        handleSocketMessage
    } = makeHandlers(socket);

    console.log("ws connected.");

    sockets.push(socket);
    socket["nickname"] = "Anonymous";

    socket.on("close", handleSocketClose);
    socket.on("error", handleSocketError);
    socket.on("open", handleSocketOpen);
    socket.on("message", handleSocketMessage);
});

httpServer.listen(3000, function () {
    console.log(`Listening on http://localhost:3000`);
});