const Message = require('../../domain/entities/Message');

class HandleMessage {
    constructor(chatRepository, geminiService, pauseMinutes) {
        this.chatRepository = chatRepository;
        this.geminiService = geminiService;
        this.pauseMinutes = pauseMinutes * 60000;
    }

    async execute(msg) {

        let chat = await msg.getChat();
        const chatId = chat.id._serialized;
        const content = msg.body;

        const pause = await this.chatRepository.getPause(chatId);
        if (pause) return;

        let response;

        if (msg.fromMe) {
            // Mensagem enviada pelo próprio bot, verificar se foi manual
            const lastAutoMsg = await this.chatRepository.getLastAutoMessage(chatId);

            const isManual = lastAutoMsg !== content;

            if (isManual)
                await this.chatRepository.setPause(chatId);

        } else {
            const message = new Message(chatId, content, 'user');
            await this.chatRepository.saveMessage(message);
            const history = await this.chatRepository.getConversation(message.chatId);

            response = await this.geminiService.generateResponse(history, message.content);

            await this.chatRepository.saveMessage(new Message(message.chatId, response, 'bot'));
            await this.chatRepository.setLastAutoMessage(message.chatId, response);
        }

        return response;
    }
}
module.exports = HandleMessage;
