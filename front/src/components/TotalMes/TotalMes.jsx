import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Divider,
  useTheme
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  Receipt,
  CalendarMonth,
  AttachMoney
} from '@mui/icons-material';

const TotalMes = ({ resumo, filtrosAtivos }) => {
  const theme = useTheme();

  // Formatar valor para exibição
  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor || 0);
  };

  // Obter título baseado nos filtros
  const obterTitulo = () => {
    if (filtrosAtivos?.mes && filtrosAtivos.mes !== 'todos') {
      // Converter YYYY-MM para nome do mês
      const [ano, mes] = filtrosAtivos.mes.split('-');
      const nomesMeses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      const nomeMes = nomesMeses[parseInt(mes) - 1];
      return `${nomeMes} ${ano}`;
    }
    return 'Período Selecionado';
  };

  // Calcular média por lançamento
  const calcularMedia = () => {
    if (!resumo?.quantidadeItens || resumo.quantidadeItens === 0) {
      return 0;
    }
    return (resumo.totalValor || 0) / resumo.quantidadeItens;
  };

  // Obter cor baseada no valor
  const obterCorValor = (valor) => {
    if (valor === 0) return 'text.secondary';
    if (valor < 100) return 'success.main';
    if (valor < 500) return 'warning.main';
    return 'error.main';
  };

  // Obter ícone de tendência (simulado)
  const obterTendencia = () => {
    const valor = resumo?.totalValor || 0;
    if (valor > 300) return { icon: TrendingUp, color: 'error.main', texto: 'Alto' };
    if (valor > 100) return { icon: TrendingUp, color: 'warning.main', texto: 'Médio' };
    return { icon: TrendingUp, color: 'success.main', texto: 'Baixo' };
  };

  const tendencia = obterTendencia();
  const TendenciaIcon = tendencia.icon;

  return (
    <Card 
      elevation={3}
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Efeito visual de fundo */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          zIndex: 0
        }}
      />
      
      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
        {/* Cabeçalho */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h6" component="h3" sx={{ 
            display: 'flex', 
            alignItems: 'center',
            fontWeight: 600
          }}>
            <AccountBalance sx={{ mr: 1 }} />
            Total - {obterTitulo()}
          </Typography>

          <Chip
            icon={<CalendarMonth />}
            label={filtrosAtivos?.categoria || 'Todas'}
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              '& .MuiChip-icon': { color: 'white' }
            }}
          />
        </Box>

        {/* Valor Principal */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography 
            variant="h3" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              mb: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {formatarValor(resumo?.totalValor)}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <TendenciaIcon sx={{ color: 'rgba(255,255,255,0.8)' }} />
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Gasto {tendencia.texto}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)', mb: 2 }} />

        {/* Estatísticas */}
        <Grid container spacing={2}>
          {/* Quantidade de Lançamentos */}
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <Receipt sx={{ mr: 0.5, fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Lançamentos
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {resumo?.quantidadeItens || 0}
              </Typography>
            </Box>
          </Grid>

          {/* Média por Lançamento */}
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <AttachMoney sx={{ mr: 0.5, fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Média
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {formatarValor(calcularMedia())}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Informações Adicionais */}
        {resumo?.quantidadeItens > 0 && (
          <Box sx={{ mt: 2, p: 1.5, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
            <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', opacity: 0.9 }}>
              {resumo.quantidadeItens === 1 
                ? '1 lançamento registrado'
                : `${resumo.quantidadeItens} lançamentos registrados`
              }
              {filtrosAtivos?.categoria && filtrosAtivos.categoria !== 'todos' && (
                <span> na categoria {filtrosAtivos.categoria}</span>
              )}
            </Typography>
          </Box>
        )}

        {/* Estado Vazio */}
        {(!resumo?.quantidadeItens || resumo.quantidadeItens === 0) && (
          <Box sx={{ mt: 2, textAlign: 'center', opacity: 0.8 }}>
            <Typography variant="body2">
              Nenhum lançamento encontrado para o período selecionado
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TotalMes;