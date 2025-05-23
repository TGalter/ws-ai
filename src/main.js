const { port } = require('./config');
const app = express();

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Inicialize o bot
require('./bot.js');
