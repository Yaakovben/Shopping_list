import { Socket } from "socket.io";

export const handleSocketConnection = (socket: Socket) => {
    console.log('A user connection to socket');
    socket.on('joinRoom', (data) => {
        socket.join(data);
        console.log(`Socket connection to room ${data}`);
    })}