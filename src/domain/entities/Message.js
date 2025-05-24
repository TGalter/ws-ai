// /src/domain/entities/Message.js
class Message {
    constructor(chatId, content, sender) {
        this.chatId = chatId;
        this.content = content;
        this.sender = sender;
    }
}
module.exports = Message;