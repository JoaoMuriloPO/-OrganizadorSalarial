import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Chip,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  FilterList,
  Clear,
  Search,
  CalendarMonth
} from '@mui/icons-material';
import { OPCOES_FILTRO_CATEGORIA } from '../../utils/constants';

const Filtro = ({ onFiltrosChange, filtrosAtivos }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Gerar opções de meses (ano atual + últimos 3 meses)
  const gerarOpcoesMeses = () => {
    const opcoes = [{ value: 'todos', label: 'Todos os meses' }];
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth(); // 0-11

    // Calcular quantos meses mostrar (3 meses para trás)
    const mesesParaMostrar = 4; // Mês atual + 3 anteriores
    
    const nomesMeses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    for (let i = 0; i < mesesParaMostrar; i++) {
      let mes = mesAtual - i;
      let ano = anoAtual;

      // Se o mês for negativo, voltar para o ano anterior
      if (mes < 0) {
        mes = 12 + mes; // mes é negativo, então soma
        ano = anoAtual - 1;
      }

      const valor = `${ano}-${String(mes + 1).padStart(2, '0')}`; // YYYY-MM
      const label = `${nomesMeses[mes]} ${ano}`;

      opcoes.push({ value: valor, label });
    }

    return opcoes;
  };

  // Estados dos filtros
  const [filtros, setFiltros] = useState({
    categoria: filtrosAtivos?.categoria || 'todos',
    mes: filtrosAtivos?.mes || 'todos'
  });

  // Aplicar filtros
  const handleAplicarFiltros = () => {
    const filtrosParaEnviar = {};

    // Só incluir filtros que não são padrão
    if (filtros.categoria && filtros.categoria !== 'todos') {
      filtrosParaEnviar.categoria = filtros.categoria;
    }

    if (filtros.mes && filtros.mes !== 'todos') {
      // Converter mês selecionado para dataInicio e dataFim
      const [ano, mes] = filtros.mes.split('-');
      const dataInicio = new Date(parseInt(ano), parseInt(mes) - 1, 1);
      const dataFim = new Date(parseInt(ano), parseInt(mes), 0); // Último dia do mês

      filtrosParaEnviar.dataInicio = dataInicio.toISOString().split('T')[0];
      filtrosParaEnviar.dataFim = dataFim.toISOString().split('T')[0];
      filtrosParaEnviar.mes = filtros.mes; // Para exibição
    }

    // Notificar componente pai
    if (onFiltrosChange) {
      onFiltrosChange(filtrosParaEnviar);
    }

    console.log('🔍 Filtros aplicados:', filtrosParaEnviar);
  };

  // Limpar filtros
  const handleLimparFiltros = () => {
    const filtrosLimpos = {
      categoria: 'todos',
      mes: 'todos'
    };

    setFiltros(filtrosLimpos);

    // Notificar componente pai com filtros vazios
    if (onFiltrosChange) {
      onFiltrosChange({});
    }

    console.log('🧹 Filtros limpos');
  };

  // Atualizar filtro individual
  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  // Verificar se há filtros ativos
  const temFiltrosAtivos = () => {
    return (
      filtros.categoria !== 'todos' ||
      filtros.mes !== 'todos'
    );
  };

  // Contar filtros ativos
  const contarFiltrosAtivos = () => {
    let count = 0;
    if (filtros.categoria !== 'todos') count++;
    if (filtros.mes !== 'todos') count++;
    return count;
  };

  // Obter nome do mês para exibição
  const obterNomeMes = (valorMes) => {
    const opcoesMeses = gerarOpcoesMeses();
    const opcao = opcoesMeses.find(op => op.value === valorMes);
    return opcao ? opcao.label : valorMes;
  };

  const opcoesMeses = gerarOpcoesMeses();

  return (
    <Card elevation={2}>
      <CardContent>
        {/* Cabeçalho */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2,
          flexWrap: 'wrap',
          gap: 1
        }}>
          <Typography variant="h6" component="h3" sx={{ 
            display: 'flex', 
            alignItems: 'center',
            color: 'primary.main',
            fontWeight: 600
          }}>
            <FilterList sx={{ mr: 1 }} />
            Filtros
            {contarFiltrosAtivos() > 0 && (
              <Chip 
                label={contarFiltrosAtivos()}
                color="primary"
                size="small"
                sx={{ ml: 1 }}
              />
            )}
          </Typography>
        </Box>

        {/* Campos de Filtro */}
        <Grid container spacing={2}>
          {/* Filtro por Categoria */}
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Categoria</InputLabel>
              <Select
                value={filtros.categoria}
                onChange={(e) => handleFiltroChange('categoria', e.target.value)}
                label="Categoria"
              >
                {OPCOES_FILTRO_CATEGORIA.map((opcao) => (
                  <MenuItem key={opcao.value} value={opcao.value}>
                    {opcao.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Filtro por Mês */}
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarMonth sx={{ fontSize: 16 }} />
                  Mês
                </Box>
              </InputLabel>
              <Select
                value={filtros.mes}
                onChange={(e) => handleFiltroChange('mes', e.target.value)}
                label="Mês"
              >
                {opcoesMeses.map((opcao) => (
                  <MenuItem key={opcao.value} value={opcao.value}>
                    {opcao.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Botões de Ação */}
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          {/* Botão Aplicar */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAplicarFiltros}
            startIcon={<Search />}
            fullWidth={isMobile}
            sx={{ flex: 1 }}
          >
            Aplicar Filtros
          </Button>

          {/* Botão Limpar */}
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleLimparFiltros}
            startIcon={<Clear />}
            disabled={!temFiltrosAtivos()}
            fullWidth={isMobile}
            sx={{ flex: isMobile ? 1 : 'auto' }}
          >
            Limpar
          </Button>
        </Box>

        {/* Filtros Ativos (Visual) */}
        {temFiltrosAtivos() && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Filtros ativos:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {filtros.categoria !== 'todos' && (
                <Chip
                  label={`Categoria: ${filtros.categoria}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  onDelete={() => handleFiltroChange('categoria', 'todos')}
                />
              )}
              {filtros.mes !== 'todos' && (
                <Chip
                  label={`Mês: ${obterNomeMes(filtros.mes)}`}
                  size="small"
                  color="secondary"
                  variant="outlined"
                  onDelete={() => handleFiltroChange('mes', 'todos')}
                />
              )}
            </Box>
          </Box>
        )}

        {/* Info sobre período disponível */}
        <Box sx={{ mt: 2, p: 1, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant="caption" color="info.contrastText">
            💡 Mostrando dados dos últimos 4 meses (incluindo o atual)
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Filtro;