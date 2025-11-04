import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { testarConexao } from './services/api';
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
      <div className="App">
        <h1>Organizadora Salarial</h1>
        <p>Frontend configurado e pronto para desenvolvimento!</p>
        <p>Verifique o console para status da conexão com API.</p>
        
        {/* Componentes serão adicionados nas próximas tasks */}
        {/* <Header /> */}
        {/* <Lancamentos /> */}
        {/* <Filtro /> */}
        {/* <Historico /> */}
        {/* <TotalMes /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;