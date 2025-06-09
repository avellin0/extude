

# 📚 Extude — Plataforma de Estudo com Transcrição, Gamificação e Rede Social

Extude é uma plataforma completa para estudar idiomas com vídeos, áudios e livros digitais. Ideal para quem deseja aprender de forma ativa e personalizada, com suporte a transcrição automática, anotações, estatísticas de desempenho, gamificação e rede social.

> Este projeto está sendo desenvolvido em arquitetura de **microserviços** com foco em escalabilidade, organização de código e experiência real de produto SaaS.

---

## 🧠 Visão Geral

- 🎥 Estude com vídeos do YouTube e escute áudios offline (via app)
- 📚 Leia livros em inglês (formato `.epub`) com ferramentas de anotação
- ✍️ Faça anotações e crie rascunhos de estudo
- 📊 Acompanhe suas estatísticas de leitura, tempo de estudo e progresso
- 💬 Converse em tempo real com outros estudantes (chat global e entre amigos)
- 🏆 Suba no ranking semanal baseado em suas atividades
- 🌐 Compartilhe aprendizados e poste estudos com outros usuários
- 📱 Acesse de qualquer lugar com o app mobile (em desenvolvimento)

---

## 🛠 Tecnologias Utilizadas

### Front-End
- React + TypeScript
- Vite
- TailwindCSS
- Apollo Client (GraphQL)

### Back-End (Microserviços)
- Node.js + Express (serviços REST e GraphQL)
- PostgreSQL + Prisma
- JWT para autenticação
- Bcrypt para hash de senhas
- Socket.IO para chat em tempo real

### Outros Serviços
- Python (transcrição automática de vídeos + leitura de arquivos EPUB)
- yt-dlp (download e corte de vídeos)
- Redis (futuramente para filas, caching e autenticação)
- Docker (em breve, para orquestração dos microserviços)

---

## 📦 Estrutura dos Microserviços

studyspace/
│
├── front-end/ 
│  └── → Front-end React
│
├── back-end/
│    └── user-service/ → Autenticação (JWT, login, registro)   
│    └── chat-service/ → Serviço de WebSocket (Socket.IO)


## 🚀 Como Rodar Localmente

1. Clone o projeto:

```bash
git clone https://github.com/avellin0/extude.git
cd extude

Instale as dependências em cada serviço:

cd ../user-service && npm install
...

Configure as variáveis de ambiente (exemplo em .env.example)
DATABASE_URL= "sua variavel de ambiente"

Inicie os serviços:
npm run server
npm run chat
npm run library 


Inicie o front-end:
npm run dev

-------------------

🧩 Futuras Funcionalidades

✅ Gamificação com ranking global (em andamento)

✅ Feed de estudos e posts (rede social)

✅ Upload de arquivos pelo usuário

✅ Notificações

✅ Modo escuro

✅ Aplicativo mobile (React Native ou Flutter)

-------------------

🙋 Sobre Mim

Criado por Davi Avelino, estudante de back-end, apaixonado por construir ferramentas úteis e criar produtos completos desde a ideia até a experiência final.

📬 Contato
Email: ploglamador@hotmail.com

LinkedIn: linkedin.com/in/avellino

GitHub: github.com/avellin0

📝 Licença
Este projeto está sob a licença MIT. Sinta-se livre para usar como base, estudar ou contribuir.

