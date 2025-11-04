const mongoose = require('mongoose');

const lancamentoSchema = new mongoose.Schema({
  data: {
    type: Date,
    required: [true, 'Data é obrigatória'],
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: 'Data não pode ser futura'
    }
  },
  valor: {
    type: Number,
    required: [true, 'Valor é obrigatório'],
    min: [0.01, 'Valor deve ser maior que zero']
  },
  categoria: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
    enum: {
      values: [
        'Alimentação',
        'Transporte', 
        'Moradia',
        'Saúde',
        'Educação',
        'Lazer',
        'Vestuário',
        'Outros'
      ],
      message: 'Categoria inválida'
    }
  },
  descricao: {
    type: String,
    maxlength: [200, 'Descrição não pode ter mais de 200 caracteres'],
    trim: true
  }
}, {
  timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

// Índices para otimizar consultas
lancamentoSchema.index({ data: -1 });
lancamentoSchema.index({ categoria: 1 });
lancamentoSchema.index({ data: -1, categoria: 1 });

module.exports = mongoose.model('Lancamento', lancamentoSchema);