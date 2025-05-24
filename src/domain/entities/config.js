require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const config = {
    geminiApiKey: process.env.GEMINI_API_KEY,
    instructions: process.env.INSTRUCOES || "Você é um assistente útil.",
    sessionPath: process.env.SESSION_PATH || '/app/session-data', // Caminho padrão para a sessão
    port: process.env.PORT || 3000,
    pause: process.env.BOT_PAUSE_MINUTES || 5,
    redis: process.env.REDIS_URL||'redis://localhost:6379' // Pausa padrão em minutos
};

module.exports = config;