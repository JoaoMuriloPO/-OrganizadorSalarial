// Constantes do projeto Organizadora Salarial

// Categorias de lançamentos (conforme TASKS.md)
export const CATEGORIAS = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Educação',
  'Lazer',
  'Vestuário',
  'Outros'
];

// Opções para filtros
export const OPCOES_FILTRO_CATEGORIA = [
  { value: 'todos', label: 'Todas as Categorias' },
  ...CATEGORIAS.map(categoria => ({
    value: categoria,
    label: categoria
  }))
];

// Configurações de paginação
export const PAGINACAO = {
  ITENS_POR_PAGINA_DEFAULT: 10,
  OPCOES_ITENS_POR_PAGINA: [5, 10, 25, 50]
};

// Mensagens do sistema
export const MENSAGENS = {
  SUCESSO: {
    LANCAMENTO_CRIADO: 'Lançamento criado com sucesso!',
    LANCAMENTO_EDITADO: 'Lançamento editado com sucesso!',
    LANCAMENTO_DELETADO: 'Lançamento deletado com sucesso!'
  },
  ERRO: {
    CONEXAO_API: 'Erro na conexão com o servidor',
    DADOS_INVALIDOS: 'Dados inválidos. Verifique os campos.',
    LANCAMENTO_NAO_ENCONTRADO: 'Lançamento não encontrado',
    ERRO_GENERICO: 'Ocorreu um erro inesperado'
  },
  VALIDACAO: {
    CAMPO_OBRIGATORIO: 'Este campo é obrigatório',
    DATA_INVALIDA: 'Data inválida',
    VALOR_INVALIDO: 'Valor deve ser maior que zero',
    CATEGORIA_INVALIDA: 'Selecione uma categoria válida'
  }
};

// Formatos de data
export const FORMATOS_DATA = {
  EXIBICAO: 'DD/MM/YYYY',
  API: 'YYYY-MM-DD',
  COMPLETO: 'DD/MM/YYYY HH:mm'
};

// Configurações da aplicação
export const CONFIG_APP = {
  NOME: 'Organizadora Salarial',
  VERSAO: '1.0.0',
  TIMEOUT_API: 10000
};