import axios from 'axios';

// Configuração base da API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message);
    
    // Tratamento de erros específicos
    if (error.response?.status === 404) {
      console.error('Recurso não encontrado');
    } else if (error.response?.status === 500) {
      console.error('Erro interno do servidor');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Timeout na requisição');
    }
    
    return Promise.reject(error);
  }
);

// Serviços para Lançamentos
export const lancamentosService = {
  // GET /api/lancamentos - Listar com filtros
  listar: async (filtros = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filtros.categoria && filtros.categoria !== 'todos') {
        params.append('categoria', filtros.categoria);
      }
      if (filtros.dataInicio) {
        params.append('dataInicio', filtros.dataInicio);
      }
      if (filtros.dataFim) {
        params.append('dataFim', filtros.dataFim);
      }
      if (filtros.page) {
        params.append('page', filtros.page);
      }
      if (filtros.limit) {
        params.append('limit', filtros.limit);
      }
      
      const response = await api.get(`/lancamentos?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao listar lançamentos');
    }
  },

  // POST /api/lancamentos - Criar novo
  criar: async (dadosLancamento) => {
    try {
      const response = await api.post('/lancamentos', dadosLancamento);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao criar lançamento');
    }
  },

  // PUT /api/lancamentos/:id - Editar
  editar: async (id, dadosLancamento) => {
    try {
      const response = await api.put(`/lancamentos/${id}`, dadosLancamento);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao editar lançamento');
    }
  },

  // DELETE /api/lancamentos/:id - Deletar
  deletar: async (id) => {
    try {
      const response = await api.delete(`/lancamentos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao deletar lançamento');
    }
  }
};

// Função para testar conexão com API - CORRIGIDA
export const testarConexao = async () => {
  try {
    // Testa a rota /api que agora existe
    const response = await axios.get('http://localhost:3001/api');
    console.log('✅ Conexão com API funcionando:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Erro na conexão com API:', error.message);
    return false;
  }
};

// Função para testar health da API
export const testarHealth = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/health');
    console.log('💚 Health check OK:', response.data);
    return true;
  } catch (error) {
    console.error('💔 Health check falhou:', error.message);
    return false;
  }
};

export default api;