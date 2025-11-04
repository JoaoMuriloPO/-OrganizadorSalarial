const express = require('express');
const { body } = require('express-validator');
const {
  listarLancamentos,
  criarLancamento,
  editarLancamento,
  deletarLancamento
} = require('../controllers/lancamentosController');

const router = express.Router();

// Validações para criação e edição de lançamentos
const validacaoLancamento = [
  body('data')
    .isISO8601()
    .withMessage('Data deve estar no formato válido (YYYY-MM-DD)')
    .custom((value) => {
      if (new Date(value) > new Date()) {
        throw new Error('Data não pode ser futura');
      }
      return true;
    }),
  
  body('valor')
    .isFloat({ min: 0.01 })
    .withMessage('Valor deve ser um número maior que zero'),
  
  body('categoria')
    .isIn([
      'Alimentação',
      'Transporte', 
      'Moradia',
      'Saúde',
      'Educação',
      'Lazer',
      'Vestuário',
      'Outros'
    ])
    .withMessage('Categoria inválida'),
  
  body('descricao')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Descrição não pode ter mais de 200 caracteres')
    .trim()
];

// Rotas CRUD
router.get('/', listarLancamentos);
router.post('/', validacaoLancamento, criarLancamento);
router.put('/:id', validacaoLancamento, editarLancamento);
router.delete('/:id', deletarLancamento);

module.exports = router;