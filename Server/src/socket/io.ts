import { Socket } from "socket.io";
import { getAllTheProduct } from "../services/productService";

export const handleSocketConnection = (socket: Socket) => {
    console.log('A user connection to socket');
    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);
        console.log(`Socket connection to room ${roomName}`);
    })
    socket.on('productUpdated',async(list)=>{
        const products = await getAllTheProduct(list)
        socket.to(list).emit("theUpdatedList",products)
    })
}