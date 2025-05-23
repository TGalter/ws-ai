const { createWhatsAppClient } = require('./whatsapp');
const { geminiAPI } = require('./gemini');
const { instructions } = require('./config');

const client = createWhatsAppClient();

client.on('message', async (message) => {
    try {
        if (message.body && !message.isGroup) {
            console.log('Mensagem recebida:', message.body);
            const prompt = `${instructions}
  Usuário: ${message.body}
  Resposta: `;
            const response = await geminiAPI.generateResponse(prompt);
            if (response) {
                await message.reply(response);
                console.log('Resposta enviada:', response);
            } else {
                await message.reply("Desculpe, não consegui gerar uma resposta.");
                console.log('Erro: Não foi possível gerar uma resposta.');
            }
        }
    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
        await message.reply("Ocorreu um erro ao processar sua mensagem.");
        }
    });

    // Inicializa o cliente
    client.initialize();