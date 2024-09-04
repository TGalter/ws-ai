const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const geminiFunction = require('./gemini');

// Cria o cliente do WhatsApp com autenticação local
const client = new Client({
    authStrategy: new LocalAuth()
});

// Gera o QR Code no terminal para autenticação
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Evento disparado quando o cliente está pronto para uso
client.on('ready', () => {
    console.log('WhatsApp Web está pronto!');
});

// Evento disparado quando uma mensagem é recebida
client.on('message', async (message) => {
    console.log(`Mensagem recebida: ${message.body}`);

    let chat = await message.getChat();

    if (!chat.isGroup) 
    {
        // Aqui você chamará a função para enviar a mensagem para o Gemini
        const response = await geminiFunction.generateResponseFromGemini(message.body);
        //message.reply(response);
        client.sendMessage(chat.id._serialized, response);
    }
});

// Inicia o cliente do WhatsApp
client.initialize();
