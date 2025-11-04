import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box } from '@mui/material';
import theme from './theme/theme';
import { testarConexao } from './services/api';
import Header from './components/Header/Header';
import './App.css';

function App() {
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        {/* Header Component */}
        <Header />
        
        {/* Conteúdo Principal */}
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <h2>Sistema de Gerenciamento Financeiro</h2>
            <p>Frontend configurado e pronto para desenvolvimento!</p>
            <p style={{ fontSize: '0.9em', color: '#666' }}>
              Verifique o console para status da conexão com API.
            </p>
          </Box>
          
          {/* Placeholder para próximos componentes */}
          <Box sx={{ 
            display: 'grid', 
            gap: 3,
            gridTemplateColumns: { 
              xs: '1fr', 
              md: '1fr 1fr' 
            },
            mb: 3
          }}>
            {/* Box esquerdo - Lançamentos (Task 2.2) */}
            <Box sx={{ 
              p: 3, 
              bgcolor: 'background.paper', 
              borderRadius: 2,
              boxShadow: 1,
              minHeight: 300
            }}>
              <h3>📝 Lançamentos</h3>
              <p>Componente será implementado na Task 2.2</p>
            </Box>
            
            {/* Box direito - Filtro + Histórico */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Filtro (Task 2.3) */}
              <Box sx={{ 
                p: 2, 
                bgcolor: 'background.paper', 
                borderRadius: 2,
                boxShadow: 1
              }}>
                <h3>🔍 Filtros</h3>
                <p>Componente será implementado na Task 2.3</p>
              </Box>
              
              {/* Histórico (Task 2.4) */}
              <Box sx={{ 
                p: 3, 
                bgcolor: 'background.paper', 
                borderRadius: 2,
                boxShadow: 1,
                flexGrow: 1
              }}>
                <h3>📊 Histórico</h3>
                <p>Componente será implementado na Task 2.4</p>
                
                {/* Total do Mês (Task 2.5) */}
                <Box sx={{ 
                  mt: 2, 
                  p: 2, 
                  bgcolor: 'primary.light', 
                  color: 'white',
                  borderRadius: 1
                }}>
                  <h4>💰 Total do Mês</h4>
                  <p>Componente será implementado na Task 2.5</p>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;