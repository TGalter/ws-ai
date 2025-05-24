class InMemoryChatRepository {
    constructor() {
        this.messages = {};
        this.lastSender = {};
        this.lastAutoMessage = {};
        this.paused = {};
    }

    async saveMessage(message) {
        if (!this.messages[message.chatId]) {
            this.messages[message.chatId] = [];
        }
        this.messages[message.chatId].push(message);
    }

    async getConversation(chatId) {
        return this.messages[chatId] || [];
    }

    async setPause(chatId) {
        let obj = this.paused[chatId];

        if (obj) {
            clearTimeout(obj.timeout);
        }

        let timeout = setTimeout(() => {
            this.paused[chatId] = null;
        }, parseInt(process.env.BOT_PAUSE_MINUTES) * 60 * 1000);

        return this.paused[chatId] = { timeout: timeout };
    }

    async getPause(chatId) {
        return this.paused[chatId] || null;
    }

    async setLastAutoMessage(chatId, content) {
        this.lastAutoMessage[chatId] = content;
    }

    async getLastAutoMessage(chatId) {
        return this.lastAutoMessage[chatId] || null;
    }
}

module.exports = InMemoryChatRepository;
