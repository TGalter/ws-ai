# ws-ai

Bot de WhatsApp com integração à API do Gemini. Permite criar assistentes inteligentes que respondem automaticamente seguindo instruções definidas pelo usuário.

## 📦 Funcionalidades

- Integração com a API do Gemini (Google AI).
- Persistência de sessão local via volume Docker.
- Personalização do comportamento do bot via variáveis de ambiente.
- Executa diretamente em container Docker.

## 🚀 Como executar

### Pré-requisitos

- Docker instalado.
- API Key válida do [Google AI Studio (Gemini API)](https://aistudio.google.com/app/apikey) para gerar sua chave.

### Comando para executar direto no Docker:

```bash
docker run   -v "<CAMINHO/DO/HOST>":/app/session-data   -e GEMINI_API_KEY="<SUA_GEMINI_API_KEY>"   -e INSTRUCOES="Descreva como o bot deve se comportar"   thalesgalter/ws-ai
```

### 🔑 Variáveis de ambiente obrigatórias:

| Variável         | Descrição                                                       |
| ---------------- | --------------------------------------------------------------- |
| `GEMINI_API_KEY` | Sua chave da API do Gemini.                                     |
| `INSTRUCOES`     | Instruções que definem o comportamento do bot.                  |

### 📂 Volume obrigatório:

| Volume                 | Descrição                                  |
| ---------------------- | ------------------------------------------ |
| `/app/session-data`    | Persistência dos dados de sessão do WhatsApp.|

## 🐳 Usando com Docker Compose

### 1️⃣ Crie o arquivo `docker-compose.yml` para executar junto ao redis:

```yaml
version: "3.8"

services:
  redis:
    image: redis:latest
    container_name: redis
    ports:
      - "6379:6379"
    networks:
      - ws-net

  ws-ai:
    image: thalesgalter/ws-ai
    container_name: ws-ai
    volumes:
      - ./sessao-whatsapp:/app/bot-whatsapp-gemini
    environment:
      - GEMINI_API_KEY=<sua_gemini_api_key>
      - GEMINI_INSTRUCTION=Só seja muito engraçado.
      - BOT_PAUSE_MINUTES=5
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
    networks:
      - ws-net

networks:
  ws-net:
    driver: bridge

```

### 2️⃣ Execute o container:

```bash
docker compose up -d
```

### 3️⃣ Para parar:

```bash
docker compose down
```

Os dados de sessão ficam na pasta `./session-data` no seu host.

## 🧠 Exemplo de instruções para o bot

```text
Você é um assistente educado, objetivo e responde dúvidas técnicas sobre programação.
```

## 🐳 Build local (opcional)

Caso queira construir a imagem localmente:

```bash
docker build -t ws-ai .
```

E rodar:

```bash
docker run   -v "<CAMINHO/DO/HOST>":/app/session-data   -e GEMINI_API_KEY="<SUA_GEMINI_API_KEY>"   -e INSTRUCOES="Descreva como o bot deve se comportar"   ws-ai
```

## 🔗 Contribuição

Sinta-se livre para abrir issues ou PRs para melhorias.

## 📜 Licença

Este projeto está sob a licença MIT.
