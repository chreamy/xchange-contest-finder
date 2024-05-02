const router = require("express").Router();

let chatRoomSchema = require('../schemas/chatRoom');
let userSchema = require('../schemas/user');

router.get("/:userId", async (req,res) => {
    // show name of all chat rooms of current user
    try {
        const chatRooms = await chatRoomSchema.find({users:req.params.userId});
        console.log(chatRooms);        
        res.status(200).json(chatRooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// click 與 user 聊天的 button，會導至該URL
// 判斷是否已經有聊天，若無則新增聊天室
// create chatRoom
router.post("/:userId/single-chat", async (req,res) => {
    // 當下使用的user 叫做 currentUser
    // 選擇聊天的對象叫做 chatUser
    const currentUserId = req.params.userId;
    const chatUserId = req.body.chatUserId;
    // check User schema, whether the user chat with other user
    // if not, create a new chat room
    const users = await userSchema.findById(currentUserId).select('chatUsers');
    const ischatUser = users.chatUsers.some(chatUser => chatUser._id.toString() === chatUserId);

    // 若 currentUser 都還沒聊天過，則新增一個聊天室
    // 或是 currentUser 沒有跟chatUser聊過
    if (users.chatUsers.length === 0 || !ischatUser) {
        // create a new chat room
        const newChatRoom = new chatRoomSchema({
            users: [currentUserId, chatUserId],
            message: []
        });

        //add newChatRoom to chatRoomSchema
        await newChatRoom.save()
            .then(() => console.log('chatRoom created'))
            .catch((err) => res.status(400).json('Error: ' + err));

        // add chatUser to currentUser chatUsers
        users.chatUsers.push(chatUserId);
        await users.save();

        // add currentUser to chatUser chatUsers
        await userSchema.findByIdAndUpdate(chatUserId,{ $push: { chatUsers: currentUserId } }, { new: true });
        res.status(200).json(newChatRoom);
    } else {
        // if yes, get the chat room id
        const chatRoom = chatRoomSchema.find({users: [currentUserId, chatUserId]});
        // reponse chatRoom history message
        res.json(chatRoom.message);
    }
});


module.exports = router;