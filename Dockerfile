# Use Node.js 18 LTS
FROM node:18-alpine

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências primeiro (cache layer)
COPY back/package*.json ./
COPY front/package*.json ./front/

# Instalar dependências do backend
RUN npm install

# Instalar dependências do frontend
RUN cd front && npm install

# Copiar código fonte
COPY back/ ./
COPY front/ ./front/

# Build do React
RUN cd front && npm run build

# Expor porta
EXPOSE 3001

# Variável de ambiente
ENV NODE_ENV=production

# Comando de start
CMD ["npm", "start"]