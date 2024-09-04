require('dotenv').config();
const instruction = require('./instrucao').instruction
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

console.log('Instrução: ' + instruction);

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: instruction
});

const generationConfig = {
    temperature: 2,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 20,
    responseMimeType: "text/plain",
};

// Função para enviar mensagens ao Gemini e retornar a resposta
async function generateResponseFromGemini(userInput) {

    const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [
        ],
    });

    const result = await chatSession.sendMessage(userInput);
    let responseText = result.response.text();
    console.log('Retorno AI: ' + result.response.text());

    return responseText;

}

module.exports = { generateResponseFromGemini };
