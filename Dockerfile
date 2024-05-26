# Use a imagem base do Node.js
FROM node:20-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale o Git
RUN apk add --no-cache git

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código da aplicação
COPY . .

RUN npx prisma generate

# Exponha a porta que a aplicação irá rodar (por exemplo, 3000)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
