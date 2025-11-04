import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  History,
  Delete,
  Edit,
  Refresh
} from '@mui/icons-material';
import { lancamentosService } from '../../services/api';
import { MENSAGENS } from '../../utils/constants';

const Historico = ({ filtros, onLancamentoAtualizado, onResumoAtualizado }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Estados
  const [lancamentos, setLancamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('data');
  const [order, setOrder] = useState('desc');
  const [totalItens, setTotalItens] = useState(0);
  const [resumo, setResumo] = useState({ totalValor: 0, quantidadeItens: 0 });

  // Carregar lançamentos - useCallback para evitar warning
  const carregarLancamentos = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const parametros = {
        page: page + 1, // API usa página baseada em 1
        limit: rowsPerPage,
        ...filtros // Filtros vindos do componente pai
      };

      const response = await lancamentosService.listar(parametros);
      
      setLancamentos(response.lancamentos || []);
      setTotalItens(response.paginacao?.totalItens || 0);
      
      const novoResumo = response.resumo || { totalValor: 0, quantidadeItens: 0 };
      setResumo(novoResumo);

      // Notificar componente pai sobre o resumo atualizado
      if (onResumoAtualizado) {
        onResumoAtualizado(novoResumo);
      }

      console.log('✅ Lançamentos carregados:', response);

    } catch (error) {
      console.error('❌ Erro ao carregar lançamentos:', error);
      setError(error.message || MENSAGENS.ERRO.ERRO_GENERICO);
      setLancamentos([]);
      
      // Resetar resumo em caso de erro
      const resumoVazio = { totalValor: 0, quantidadeItens: 0 };
      setResumo(resumoVazio);
      if (onResumoAtualizado) {
        onResumoAtualizado(resumoVazio);
      }
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, filtros, onResumoAtualizado]);

  // Efeito para carregar dados
  useEffect(() => {
    carregarLancamentos();
  }, [carregarLancamentos]);

  // Manipular mudança de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Manipular mudança de itens por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Manipular ordenação (futuro)
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    // TODO: Implementar ordenação no backend
  };

  // Deletar lançamento
  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este lançamento?')) {
      return;
    }

    try {
      await lancamentosService.deletar(id);
      
      // Recarregar lista
      await carregarLancamentos();
      
      // Notificar componente pai
      if (onLancamentoAtualizado) {
        onLancamentoAtualizado();
      }

      console.log('✅ Lançamento deletado com sucesso');

    } catch (error) {
      console.error('❌ Erro ao deletar lançamento:', error);
      setError(error.message || 'Erro ao deletar lançamento');
    }
  };

  // Formatar valor para exibição
  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  // Formatar data para exibição
  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  // Cor da categoria
  const getCorCategoria = (categoria) => {
    const cores = {
      'Alimentação': 'success',
      'Transporte': 'info',
      'Moradia': 'warning',
      'Saúde': 'error',
      'Educação': 'primary',
      'Lazer': 'secondary',
      'Vestuário': 'default',
      'Outros': 'default'
    };
    return cores[categoria] || 'default';
  };

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
          <Typography variant="h5" component="h2" sx={{ 
            display: 'flex', 
            alignItems: 'center',
            color: 'primary.main',
            fontWeight: 600
          }}>
            <History sx={{ mr: 1 }} />
            Histórico de Lançamentos
          </Typography>

          <Tooltip title="Atualizar">
            <IconButton 
              onClick={carregarLancamentos}
              disabled={loading}
              color="primary"
            >
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Resumo Rápido */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          mb: 2,
          flexWrap: 'wrap'
        }}>
          <Chip 
            label={`${resumo.quantidadeItens} lançamento(s)`}
            color="secondary"
            variant="outlined"
          />
        </Box>

        {/* Erro */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Loading */}
        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: 200
          }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Tabela */}
            <TableContainer component={Paper} variant="outlined">
              <Table size={isMobile ? "small" : "medium"}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'data'}
                        direction={orderBy === 'data' ? order : 'asc'}
                        onClick={() => handleRequestSort('data')}
                      >
                        Data
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'valor'}
                        direction={orderBy === 'valor' ? order : 'asc'}
                        onClick={() => handleRequestSort('valor')}
                      >
                        Valor
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Categoria</TableCell>
                    {!isMobile && <TableCell>Descrição</TableCell>}
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lancamentos.length === 0 ? (
                    <TableRow>
                      <TableCell 
                        colSpan={isMobile ? 4 : 5} 
                        align="center"
                        sx={{ py: 4 }}
                      >
                        <Typography variant="body1" color="text.secondary">
                          Nenhum lançamento encontrado
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    lancamentos.map((lancamento) => (
                      <TableRow key={lancamento._id} hover>
                        <TableCell>
                          {formatarData(lancamento.data)}
                        </TableCell>
                        <TableCell>
                          <Typography 
                            variant="body2" 
                            sx={{ fontWeight: 600, color: 'success.main' }}
                          >
                            {formatarValor(lancamento.valor)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={lancamento.categoria}
                            color={getCorCategoria(lancamento.categoria)}
                            size="small"
                          />
                        </TableCell>
                        {!isMobile && (
                          <TableCell>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                maxWidth: 200,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {lancamento.descricao || '-'}
                            </Typography>
                          </TableCell>
                        )}
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <Tooltip title="Editar">
                              <IconButton 
                                size="small" 
                                color="primary"
                                onClick={() => {
                                  // TODO: Implementar edição
                                  console.log('Editar:', lancamento._id);
                                }}
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Deletar">
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => handleDelete(lancamento._id)}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Paginação */}
            <TablePagination
              component="div"
              count={totalItens}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              labelRowsPerPage="Itens por página:"
              labelDisplayedRows={({ from, to, count }) => 
                `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
              }
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Historico;