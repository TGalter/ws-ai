require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const config = {
    geminiApiKey: process.env.GEMINI_API_KEY,
    instructions: process.env.INSTRUCOES || "Você é um assistente útil.",
    sessionPath: process.env.SESSION_PATH || '/app/session-data', // Caminho padrão para a sessão
    port: process.env.PORT || 3000
};

module.exports = config;