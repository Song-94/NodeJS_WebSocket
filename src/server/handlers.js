import { sockets } from "./config.js";

module.exports = function (socket) {

    function handleSocketClose(code, reason) {
        console.log("Close: ", code, reason);
    };

    function handleSocketError(err) {
        console.log("Error: ", err);
    };

    function handleSocketOpen() {
        console.log("Open Socket: ", socket);
    };

    function handleSocketMessage(message, isBinary) {
        // message default value is BLOB
        const messageString = isBinary ? message : message.toString('utf8');
        const parsed = JSON.parse(messageString);
        switch (parsed.type) {
            case "new_message":
                sockets.forEach(function (aSocket) {
                    aSocket.send(`${socket.nickname}: ${parsed.payload}`);
                });
                break;

            case "nickname":
                socket["nickname"] = parsed.payload;
                break;
        }
    };

    return {
        handleSocketClose,
        handleSocketError,
        handleSocketOpen,
        handleSocketMessage
    };
};