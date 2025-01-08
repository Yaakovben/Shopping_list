import { Socket } from "socket.io";
import { getAllTheProduct } from "../services/productService";

export const handleSocketConnection = (socket: Socket) => {
    console.log('A user connection to socket');
    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);
        console.log(`Socket connection to room ${roomName}`);
    })
    socket.on("leaveRoom", (room) => {
        socket.leave(room);
        console.log(`User left room: ${room}`);
      });
    socket.on('productUpdated',async(list)=>{
        const products = await getAllTheProduct(list)
        socket.to(list).emit("theUpdatedList",products)
    })
    socket.on("deleteProduct",async(list)=>{
        const products = await getAllTheProduct(list)
        socket.to(list).emit("theUpdatedListAfterDelete",products)
    })
    socket.on("addProduct",async(list)=>{
        const products = await getAllTheProduct(list)
        socket.to(list).emit("theUpdatedListAfterAdd",products)
    })
    socket.on("updateProduct",async(list)=>{
        const products = await getAllTheProduct(list)
        socket.to(list).emit("theUpdatedListAfterupdate",products)
    })
}