const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
    constructor(apiKey, instruction) {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({
            model: 'gemini-2.0-flash',
            systemInstruction: instruction
        });
    }

    async generateResponse(history, msg) {

        const contents = [];

        for (const message of history) {
            contents.push({
                role: message.sender === 'user' ? 'user' : 'model',
                parts: [
                    {
                        text: message.content,
                    },
                ],
            });
        }

        const chat = this.model.startChat({
            history: contents
        });

        const result = await chat.sendMessage(msg);
        const response = result.response;
        return response.text();
    }
}
module.exports = GeminiService;