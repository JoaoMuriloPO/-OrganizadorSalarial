const { validationResult } = require('express-validator');
const Lancamento = require('../models/Lancamento');

// GET /api/lancamentos - Listar lançamentos com filtros
const listarLancamentos = async (req, res) => {
  try {
    const { categoria, dataInicio, dataFim, page = 1, limit = 10 } = req.query;
    
    // Construir filtros
    const filtros = {};
    
    if (categoria && categoria !== 'todos') {
      filtros.categoria = categoria;
    }
    
    if (dataInicio || dataFim) {
      filtros.data = {};
      if (dataInicio) {
        filtros.data.$gte = new Date(dataInicio);
      }
      if (dataFim) {
        filtros.data.$lte = new Date(dataFim);
      }
    }
    
    // Paginação
    const skip = (page - 1) * limit;
    
    // Buscar lançamentos
    const lancamentos = await Lancamento
      .find(filtros)
      .sort({ data: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Contar total para paginação
    const total = await Lancamento.countDocuments(filtros);
    
    // Calcular total de valores
    const totalValor = await Lancamento.aggregate([
      { $match: filtros },
      { $group: { _id: null, total: { $sum: '$valor' } } }
    ]);
    
    res.json({
      lancamentos,
      paginacao: {
        paginaAtual: parseInt(page),
        totalPaginas: Math.ceil(total / limit),
        totalItens: total,
        itensPorPagina: parseInt(limit)
      },
      resumo: {
        totalValor: totalValor[0]?.total || 0,
        quantidadeItens: total
      }
    });
    
  } catch (error) {
    console.error('Erro ao listar lançamentos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// POST /api/lancamentos - Criar novo lançamento
const criarLancamento = async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Dados inválidos',
        detalhes: errors.array()
      });
    }
    
    const { data, valor, categoria, descricao } = req.body;
    
    const novoLancamento = new Lancamento({
      data,
      valor,
      categoria,
      descricao
    });
    
    const lancamentoSalvo = await novoLancamento.save();
    
    res.status(201).json({
      message: 'Lançamento criado com sucesso',
      lancamento: lancamentoSalvo
    });
    
  } catch (error) {
    console.error('Erro ao criar lançamento:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Dados inválidos',
        detalhes: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// PUT /api/lancamentos/:id - Editar lançamento
const editarLancamento = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Dados inválidos',
        detalhes: errors.array()
      });
    }
    
    const lancamentoAtualizado = await Lancamento.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!lancamentoAtualizado) {
      return res.status(404).json({ error: 'Lançamento não encontrado' });
    }
    
    res.json({
      message: 'Lançamento atualizado com sucesso',
      lancamento: lancamentoAtualizado
    });
    
  } catch (error) {
    console.error('Erro ao editar lançamento:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Dados inválidos',
        detalhes: Object.values(error.errors).map(err => err.message)
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// DELETE /api/lancamentos/:id - Deletar lançamento
const deletarLancamento = async (req, res) => {
  try {
    const { id } = req.params;
    
    const lancamentoDeletado = await Lancamento.findByIdAndDelete(id);
    
    if (!lancamentoDeletado) {
      return res.status(404).json({ error: 'Lançamento não encontrado' });
    }
    
    res.json({
      message: 'Lançamento deletado com sucesso',
      lancamento: lancamentoDeletado
    });
    
  } catch (error) {
    console.error('Erro ao deletar lançamento:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  listarLancamentos,
  criarLancamento,
  editarLancamento,
  deletarLancamento
};