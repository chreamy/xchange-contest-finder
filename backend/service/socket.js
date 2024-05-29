const { Server } = require("socket.io");

let chatRoomSchema = require('../schemas/chatRoom');

module.exports = (server) => {
    const io = new Server(server, {
        cors:{
            origin:"*",
        }
    });
    
    // 1-on-1 chat
    io.on('connection', async(socket) => {
        console.log('connected to chatRoom');

        socket.on('join', (chatRoom) => {
            // chatRoomId 為當前user與對方user的聊天室Id
            socket.join(chatRoom);
        })

        socket.on('sendMessage', async (data) => {
            // 前端傳送 data {chatRoomId:chatRoomId, message:""}
            console.log(data);
            
            socket.to(chatRoomId).emit('receiveMessage', { message:data.message });
            // save message to chatRoom
            // 這裡要寫入資料庫
            await chatRoomSchema.findByIdAndUpdate(data.chatRoomId,{ $push: { message: {senderId:data.senderId,content:data.message,createdAt:new Date()}}}, { new: true });

        });

        socket.on('disconnect', () => {
            console.log('User disconnected from single-chat');
        });
    });


    return io;
};