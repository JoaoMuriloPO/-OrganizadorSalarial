import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  FormHelperText
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { Add, AttachMoney } from '@mui/icons-material';
import { CATEGORIAS, MENSAGENS } from '../../utils/constants';
import { lancamentosService } from '../../services/api';

const Lancamentos = ({ onLancamentoCriado }) => {
  // Estados do formulário
  const [formData, setFormData] = useState({
    data: new Date(),
    valor: '',
    categoria: '',
    descricao: ''
  });

  // Estados de controle
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ tipo: '', mensagem: '' });
  const [errors, setErrors] = useState({});

  // Validação dos campos
  const validarCampos = () => {
    const novosErrors = {};

    // Validar data
    if (!formData.data) {
      novosErrors.data = MENSAGENS.VALIDACAO.CAMPO_OBRIGATORIO;
    } else if (formData.data > new Date()) {
      novosErrors.data = 'Data não pode ser futura';
    }

    // Validar valor
    if (!formData.valor) {
      novosErrors.valor = MENSAGENS.VALIDACAO.CAMPO_OBRIGATORIO;
    } else if (parseFloat(formData.valor) <= 0) {
      novosErrors.valor = MENSAGENS.VALIDACAO.VALOR_INVALIDO;
    }

    // Validar categoria
    if (!formData.categoria) {
      novosErrors.categoria = MENSAGENS.VALIDACAO.CAMPO_OBRIGATORIO;
    }

    setErrors(novosErrors);
    return Object.keys(novosErrors).length === 0;
  };

  // Limpar formulário
  const limparFormulario = () => {
    setFormData({
      data: new Date(),
      valor: '',
      categoria: '',
      descricao: ''
    });
    setErrors({});
    setFeedback({ tipo: '', mensagem: '' });
  };

  // Manipular mudanças nos campos
  const handleChange = (campo, valor) => {
    setFormData(prev => ({
      ...prev,
      [campo]: valor
    }));

    // Limpar erro do campo quando usuário começar a digitar
    if (errors[campo]) {
      setErrors(prev => ({
        ...prev,
        [campo]: ''
      }));
    }

    // Limpar feedback quando usuário interagir
    if (feedback.mensagem) {
      setFeedback({ tipo: '', mensagem: '' });
    }
  };

  // Submeter formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarCampos()) {
      setFeedback({
        tipo: 'error',
        mensagem: MENSAGENS.ERRO.DADOS_INVALIDOS
      });
      return;
    }

    setLoading(true);
    setFeedback({ tipo: '', mensagem: '' });

    try {
      // Preparar dados para envio
      const dadosEnvio = {
        data: formData.data.toISOString().split('T')[0], // YYYY-MM-DD
        valor: parseFloat(formData.valor),
        categoria: formData.categoria,
        descricao: formData.descricao.trim() || undefined
      };

      // Enviar para API
      const response = await lancamentosService.criar(dadosEnvio);

      // Feedback de sucesso
      setFeedback({
        tipo: 'success',
        mensagem: MENSAGENS.SUCESSO.LANCAMENTO_CRIADO
      });

      // Limpar formulário
      limparFormulario();

      // Notificar componente pai (se existir callback)
      if (onLancamentoCriado) {
        onLancamentoCriado(response.lancamento);
      }

      console.log('✅ Lançamento criado:', response);

    } catch (error) {
      console.error('❌ Erro ao criar lançamento:', error);
      setFeedback({
        tipo: 'error',
        mensagem: error.message || MENSAGENS.ERRO.ERRO_GENERICO
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Card elevation={2} sx={{ height: 'fit-content' }}>
        <CardContent>
          {/* Título */}
          <Typography variant="h5" component="h2" gutterBottom sx={{ 
            display: 'flex', 
            alignItems: 'center',
            color: 'primary.main',
            fontWeight: 600
          }}>
            <Add sx={{ mr: 1 }} />
            Novo Lançamento
          </Typography>

          {/* Feedback */}
          {feedback.mensagem && (
            <Alert 
              severity={feedback.tipo} 
              sx={{ mb: 2 }}
              onClose={() => setFeedback({ tipo: '', mensagem: '' })}
            >
              {feedback.mensagem}
            </Alert>
          )}

          {/* Formulário */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {/* Campo Data */}
            <DatePicker
              label="Data *"
              value={formData.data}
              onChange={(novaData) => handleChange('data', novaData)}
              maxDate={new Date()}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: 'normal',
                  error: !!errors.data,
                  helperText: errors.data,
                  variant: 'outlined'
                }
              }}
            />

            {/* Campo Valor */}
            <TextField
              fullWidth
              label="Valor *"
              type="number"
              value={formData.valor}
              onChange={(e) => handleChange('valor', e.target.value)}
              margin="normal"
              variant="outlined"
              error={!!errors.valor}
              helperText={errors.valor}
              inputProps={{
                min: "0.01",
                step: "0.01"
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
            />

            {/* Campo Categoria */}
            <FormControl 
              fullWidth 
              margin="normal" 
              variant="outlined"
              error={!!errors.categoria}
            >
              <InputLabel>Categoria *</InputLabel>
              <Select
                value={formData.categoria}
                onChange={(e) => handleChange('categoria', e.target.value)}
                label="Categoria *"
              >
                {CATEGORIAS.map((categoria) => (
                  <MenuItem key={categoria} value={categoria}>
                    {categoria}
                  </MenuItem>
                ))}
              </Select>
              {errors.categoria && (
                <FormHelperText>{errors.categoria}</FormHelperText>
              )}
            </FormControl>

            {/* Campo Descrição (Opcional) */}
            <TextField
              fullWidth
              label="Descrição (opcional)"
              value={formData.descricao}
              onChange={(e) => handleChange('descricao', e.target.value)}
              margin="normal"
              variant="outlined"
              multiline
              rows={2}
              inputProps={{
                maxLength: 200
              }}
              helperText={`${formData.descricao.length}/200 caracteres`}
            />

            {/* Botão Adicionar */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ 
                mt: 3,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600
              }}
              startIcon={loading ? <CircularProgress size={20} /> : <Add />}
            >
              {loading ? 'Adicionando...' : 'Adicionar Lançamento'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
};

export default Lancamentos;