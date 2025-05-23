const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { sessionPath } = require('./config'); // Importa o caminho da sessão

const createWhatsAppClient = () => {
    const client = new Client({
        authStrategy: new LocalAuth({
            clientId: "bot-whatsapp-gemini", // Dê um ID para a sessão
            dataPath: sessionPath // Usa o caminho de sessão configurável
        }),
        puppeteer: {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    });

    client.on('qr', qr => {
        console.log('Escaneie este QR Code com seu celular:');
        qrcode.generate(qr, { small: true });
    });

    client.on('authenticated', () => {
        console.log('Autenticado com sucesso!');
    });

    client.on('auth_failure', msg => {
        console.error('Falha na autenticação: ', msg);
    });

    return client;
};

module.exports = { createWhatsAppClient };