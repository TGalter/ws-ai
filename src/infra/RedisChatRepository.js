// /src/infra/RedisChatRepository.js
const Redis = require('ioredis');
class RedisChatRepository {
    constructor(redisUrl) {
        this.redis = new Redis(redisUrl);
    }

    async saveMessage(message) {
        const key = `chat:${message.chatId}:history`;
        await this.redis.rpush(key, JSON.stringify(message));
    }

    async getConversation(chatId) {
        const key = `chat:${chatId}:history`;
        const messages = await this.redis.lrange(key, 0, -1);
        return messages.map(m => JSON.parse(m));
    }

    async setPause(chatId) {
        const pauseUntil = Date.now() + parseInt(process.env.BOT_PAUSE_MINUTES) * 60;
        await this.redis.set(`chat:${chatId}:pause`, 'true', 'EX', pauseUntil);
    }

    async getPause(chatId) {
        const pausedUntil = await this.redis.get(`chat:${chatId}:pause`);
        return pausedUntil;
    }

    async setLastAutoMessage(chatId, content) {
        await this.redis.set(`chat:${chatId}:lastAutoMessage`, content);
    }

    async getLastAutoMessage(chatId) {
        return await this.redis.get(`chat:${chatId}:lastAutoMessage`);
    }
}
module.exports = RedisChatRepository;