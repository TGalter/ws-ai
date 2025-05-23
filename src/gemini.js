const { GoogleGenerativeAI  } = require("@google/generative-ai");
const { geminiApiKey } = require('./config');

const genAI = new GoogleGenerativeAI(geminiApiKey); // Instancia a classe com a apiKey

class GeminiAPI {
  constructor() {
    this.client = genAI;
    this.model = this.client.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async generateResponse(prompt) {
    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response.text();
      return response;
    } catch (error) {
      console.error("Erro ao obter resposta da Gemini API:", error);
      throw error;
    }
  }
}

const geminiAPI = new GeminiAPI();
module.exports = { geminiAPI };