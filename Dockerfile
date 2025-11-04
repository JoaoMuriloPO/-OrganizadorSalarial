# Use Node.js 18 como base
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json do backend
COPY back/package*.json ./back/

# Instalar dependências do backend
RUN cd back && npm install

# Copiar package.json do frontend
COPY front/package*.json ./front/

# Instalar dependências do frontend
RUN cd front && npm install

# Copiar todo o código
COPY . .

# Build do frontend
RUN cd front && npm run build

# Expor porta
EXPOSE 3001

# Definir variável de ambiente
ENV NODE_ENV=production

# Comando para iniciar o servidor
CMD ["node", "back/server.js"]