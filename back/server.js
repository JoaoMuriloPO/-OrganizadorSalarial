const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const path = require('path');
const connectDatabase = require('./middleware/database');

// Importar rotas
const lancamentosRoutes = require('./routes/lancamentos');

// Configurar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar ao banco de dados
connectDatabase();

// Middleware de rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP por janela de tempo
});

// Middlewares
app.use(limiter);
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', // Permitir qualquer origem em produção
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do React (PRODUÇÃO)
if (process.env.NODE_ENV === 'production') {
  // Servir arquivos estáticos do build do React
  app.use(express.static(path.join(__dirname, '../front/build')));
}

// Rotas da API
app.use('/api/lancamentos', lancamentosRoutes);

// Rota de teste da API
app.get('/api', (req, res) => {
  res.json({ 
    message: 'API Organizadora Salarial funcionando!',
    version: '1.0.0',
    status: 'online',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      lancamentos: '/api/lancamentos',
      health: '/api/health'
    }
  });
});

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Servir React App para todas as outras rotas (PRODUÇÃO)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/build', 'index.html'));
  });
} else {
  // Rota de teste para desenvolvimento
  app.get('/', (req, res) => {
    res.json({ 
      message: 'Servidor Organizadora Salarial - Desenvolvimento',
      version: '1.0.0',
      api: '/api',
      frontend: 'http://localhost:3000'
    });
  });
}

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Algo deu errado!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Erro interno do servidor'
  });
});

// Middleware para rotas não encontradas da API
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Endpoint da API não encontrado' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Acesse: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  
  if (process.env.NODE_ENV === 'production') {
    console.log(`🎨 Frontend: Servindo arquivos estáticos do React`);
  }
});

module.exports = app;