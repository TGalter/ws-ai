// main.js
require('dotenv').config();
const Redis = require('ioredis');
const GeminiService = require('./infra/GeminiService');
const RedisChatRepository = require('./infra/RedisChatRepository');
const InMemoryChatRepository = require('./infra/InMemoryChatRepository');
const HandleMessage = require('./application/use_cases/HandleMessage');
const WhatsappBot = require('./interfaces/WhatsappBot');

(async () => {

    const geminiService = new GeminiService(process.env.GEMINI_API_KEY, process.env.GEMINI_INSTRUCTION);
    const chatRepository = await createRepository();
    const handleMessage = new HandleMessage(chatRepository, geminiService, parseInt(process.env.BOT_PAUSE_MINUTES));
    const bot = new WhatsappBot(handleMessage);


    bot.initialize();
    console.log('Bot está rodando...');

})();

async function createRepository() {
    const redis = new Redis(process.env.REDIS_URL, {
        maxRetriesPerRequest: 3,  // Número máximo de tentativas por comando
        retryStrategy(times) {
            if (times >= 3) {
                return null; // Para de tentar após 3 tentativas
            }
            return Math.min(times * 100, 2000); // tempo entre tentativas
        },
        connectTimeout: 3000 // tempo máximo de tentativa inicial (ms)
    });

    try {
        await redis.ping();
        console.log('✅ Redis conectado');
        return new RedisChatRepository(process.env.REDIS_URL);
    } catch (error) {
        console.warn('⚠️ Redis não disponível. Usando armazenamento em memória.');
        return new InMemoryChatRepository();
    }
}
