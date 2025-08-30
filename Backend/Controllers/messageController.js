import Conversation from "../models/conversationModel.js"
import Message from "../models/messageModel.js"

const sendMessage = async (req,res)=>{
    try {
        const sender = req.userId
        const {receiver} = req.params
        const {message} = req.body
        console.log(req.body)
        let image
        if(req.body.image){
            image = req.body.image
        }
        const newMessage = await Message.create({
            sender,receiver,message
        })
        const conversation = await Conversation.findOne({
            participants :{$all : [sender,receiver]}
        })

        if(conversation){
            conversation.messages.push(newMessage._id)
            await conversation.save()
        }else{
            conversation = await Conversation.create({
                participants : [sender,receiver],
                messages : [newMessage._id]
            })
        }
        const msg = await conversation.populate("messages")
        console.log(msg)
        return res.status(200).json(msg)
        

    } catch (error) {
        return res.status(400).json({message : "Error while adding Conversation"})
    }
}

const getMessages = async(req,res)=>{
try {
    const sender = req.userId
    const {receiver} = req.params
    const conversation = await Conversation.findOne({
        participants :{$all : [sender,receiver]}
    }).populate("messages")
    return res.status(200).json(conversation)

} catch (error) {
    return res.status(400).json({message : "Error while getting Conversation"})
}

}

export { sendMessage,getMessages}