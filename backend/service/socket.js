const { Server } = require("socket.io");

module.exports = (server) => {
    const io = new Server(server, {
        cors:{
            origin:"*",
        }
    });
    
    // 個人聊天命名空間
    const singleChat = io.of('/single-chat');
    // 群組聊天命名空間
    const group = io.of('/group');

    singleChat.on('connection', async(socket) => {
        console.log('connected to single-chat');
        
        // 使用者發送加入聊天室的事件，才會將使用者加入聊天室
        socket.on('personalMessage', (data) => {
            // 前端傳送 data {receiver:userId, message:""}
            console.log(data);
            socket.to(data.receiver).emit('receiveMessage', { from:socket.id, message:data.message })
        });

        socket.on('disconnect', () => {
            console.log('User disconnected from single-chat');
        });
    });

    group.on('connection', async(socket) => {
        console.log('connected to group chat');

        // 加入群組
        socket.on('joinGroup', (data) => {
            socket.join(data.groupId);
            console.log(`${socket.id} joined group ${data.groupId}`);
        });

        // 在群組傳送訊息
        socket.on('groupMessage',(data) => {
            group.to(data.groupId).emit('receiveGroupMessage', {from: socket.id, message:data.message});
        });

        // 離開 Team 時自動呼叫
        socket.on('leaveGroup', (data) => {
            socket.leave(data.groupId);
            console.log(`${socket.id} left group ${data.groupId}`);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected from group chat');
        });
    })

    return io;
};