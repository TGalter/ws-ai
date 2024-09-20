require('dotenv').config();
const instruction = require('./instruction');
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
});

const generationConfig = {
    temperature: 2,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 200,
    responseMimeType: "text/plain",
};

const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    }
  ];

// Função para enviar mensagens ao Gemini e retornar a resposta
async function generateResponseFromGemini(userInput) {

    let parts = instruction.parts;

    parts.push({ text: `input: ${userInput}` });

    const ai = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
    });

    let result = ai.response.text();
    console.log('Retorno AI: ' + result);

    return result;

}

module.exports = { generateResponseFromGemini };
