# Use Node.js 18
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar package.json do backend
COPY back/package*.json ./

# Instalar dependências
RUN npm install

# Copiar código do backend
COPY back/ ./

# Expor porta
EXPOSE 3001

# Comando start
CMD ["npm", "start"]