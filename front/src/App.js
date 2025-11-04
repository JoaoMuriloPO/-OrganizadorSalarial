import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box } from '@mui/material';
import theme from './theme/theme';
import { testarConexao } from './services/api';
import Header from './components/Header/Header';
import Lancamentos from './components/Lancamentos/Lancamentos';
import Filtro from './components/Filtro/Filtro';
import Historico from './components/Historico/Historico';
import TotalMes from './components/TotalMes/TotalMes';
import './App.css';

function App() {
  // Estados para controle de atualizações e filtros
  const [atualizarHistorico, setAtualizarHistorico] = useState(0);
  const [filtros, setFiltros] = useState({});
  const [resumoAtual, setResumoAtual] = useState({ totalValor: 0, quantidadeItens: 0 });

  // Testar conexão com API ao inicializar
  useEffect(() => {
    const verificarAPI = async () => {
      const conectado = await testarConexao();
      if (conectado) {
        console.log('🎉 Frontend conectado com Backend!');
      } else {
        console.warn('⚠️ Problema na conexão com Backend');
      }
    };
    
    verificarAPI();
  }, []);

  // Callback quando um lançamento for criado
  const handleLancamentoCriado = (novoLancamento) => {
    console.log('🎉 Novo lançamento criado:', novoLancamento);
    // Forçar atualização do histórico
    setAtualizarHistorico(prev => prev + 1);
  };

  // Callback quando histórico for atualizado (delete, edit)
  const handleHistoricoAtualizado = () => {
    console.log('🔄 Histórico atualizado');
    // Pode ser usado para outras atualizações se necessário
  };

  // Callback quando filtros mudarem
  const handleFiltrosChange = (novosFiltros) => {
    console.log('🔍 Filtros atualizados:', novosFiltros);
    setFiltros(novosFiltros);
  };

  // Callback quando resumo do histórico for atualizado
  const handleResumoAtualizado = (novoResumo) => {
    console.log('📊 Resumo atualizado:', novoResumo);
    setResumoAtual(novoResumo);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        {/* Header Component */}
        <Header />
        
        {/* Conteúdo Principal */}
        <Container maxWidth="xl" sx={{ py: 3 }}>
          {/* Layout Principal */}
          <Box sx={{ 
            display: 'grid', 
            gap: 3,
            gridTemplateColumns: { 
              xs: '1fr', 
              md: '400px 1fr' 
            },
            alignItems: 'start'
          }}>
            {/* Box esquerdo - Lançamentos */}
            <Box>
              <Lancamentos onLancamentoCriado={handleLancamentoCriado} />
            </Box>
            
            {/* Box direito - Filtro + Histórico + Total */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Filtro */}
              <Box>
                <Filtro 
                  onFiltrosChange={handleFiltrosChange}
                  filtrosAtivos={filtros}
                />
              </Box>
              
              {/* Total do Mês */}
              <Box>
                <TotalMes 
                  resumo={resumoAtual}
                  filtrosAtivos={filtros}
                />
              </Box>
              
              {/* Histórico */}
              <Box>
                <Historico 
                  filtros={filtros}
                  onLancamentoAtualizado={handleHistoricoAtualizado}
                  onResumoAtualizado={handleResumoAtualizado}
                  key={`${atualizarHistorico}-${JSON.stringify(filtros)}`} // Re-render quando filtros ou lançamentos mudarem
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;