const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
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

// CORS configurado para aceitar TODAS as URLs do Vercel
app.use(cors({
  origin: [
    'http://localhost:3000',
    // URLs principais do Vercel
    'https://organizadorsalarialdeploy.vercel.app',
    'https://organizadorsalarialdeploy-git-main-joao-murilos-projects.vercel.app',
    'https://organizadorsalarialdeploy-ds2dvp4pa-joao-murilos-projects.vercel.app',
    // Padrões do Vercel
    'https://organizadorsalarialdeploy-joao-murilos-projects.vercel.app',
    'https://*.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));

// Middleware adicional para preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.use('/api/lancamentos', lancamentosRoutes);

// Rota de teste da API
app.get('/api', (req, res) => {
  res.json({ 
    message: 'API Organizadora Salarial funcionando!',
    version: '1.0.0',
    status: 'online',
    environment: process.env.NODE_ENV || 'development',
    cors: 'Configurado para Vercel',
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
    environment: process.env.NODE_ENV || 'development',
    cors: 'OK'
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Organizadora Salarial',
    version: '1.0.0',
    api: '/api',
    frontend: 'https://organizadorsalarialdeploy.vercel.app',
    cors: 'Configurado para múltiplas URLs do Vercel'
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Algo deu errado!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Erro interno do servidor'
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Acesse: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS configurado para TODAS as URLs do Vercel`);
});

module.exports = app;