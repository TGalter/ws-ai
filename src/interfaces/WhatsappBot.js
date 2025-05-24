// /src/interfaces/WhatsappBot.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { sessionPath } = require('../domain/entities/config');

class WhatsappBot {
    constructor(messageHandler) {
        this.client = new Client({
            authStrategy: new LocalAuth({
                clientId: "bot-whatsapp-gemini", // Dê um ID para a sessão
                dataPath: sessionPath // Usa o caminho de sessão configurável
            }),
            puppeteer: {
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }
        });


        this.messageHandler = messageHandler;
    }

    initialize() {

        this.client.on('qr', qr => {
            qrcode.generate(qr, { small: true });
            console.log('Escaneie o QR Code acima para autenticar no WhatsApp');
        });

        this.client.on('ready', () => {
            console.log('Bot está pronto!');
        });

        this.client.on('message_create', async msg => {
            try {

                const response = await this.messageHandler.execute(msg);

                if (response) {
                    await msg.reply(response);
                }

            } catch (error) {
                console.error('Erro ao processar mensagem:', error);
            }
        });


        this.client.initialize();
    }
}
module.exports = WhatsappBot;