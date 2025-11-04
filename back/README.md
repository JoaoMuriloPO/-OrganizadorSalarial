# Backend - Organizadora Salarial

API REST para gerenciamento de lançamentos financeiros.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados
- **Mongoose** - ODM para MongoDB
- **Express Validator** - Validação de dados
- **CORS** - Controle de acesso
- **Rate Limiting** - Limitação de requisições

## 📁 Estrutura do Projeto

```
back/
├── controllers/          # Lógica de negócio
├── middleware/          # Middlewares customizados
├── models/             # Modelos do banco de dados
├── routes/             # Definição das rotas
├── .env               # Variáveis de ambiente
├── .env.example       # Exemplo de variáveis
├── package.json       # Dependências
└── server.js         # Arquivo principal
```

## 🛠️ Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

3. **Iniciar MongoDB:**
```bash
# Se usando Docker
docker run -d -p 27017:27017 --name mongodb mongo

# Ou instale MongoDB localmente
```

4. **Iniciar servidor:**
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 📡 API Endpoints

### Lançamentos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/lancamentos` | Listar lançamentos com filtros |
| POST | `/api/lancamentos` | Criar novo lançamento |
| PUT | `/api/lancamentos/:id` | Editar lançamento |
| DELETE | `/api/lancamentos/:id` | Deletar lançamento |

### Parâmetros de Query (GET)

- `categoria` - Filtrar por categoria
- `dataInicio` - Data inicial (YYYY-MM-DD)
- `dataFim` - Data final (YYYY-MM-DD)
- `page` - Página (padrão: 1)
- `limit` - Itens por página (padrão: 10)

### Exemplo de Requisição POST

```json
{
  "data": "2024-01-15",
  "valor": 50.00,
  "categoria": "Alimentação",
  "descricao": "Almoço no restaurante"
}
```

## 📊 Categorias Disponíveis

- Alimentação
- Transporte
- Moradia
- Saúde
- Educação
- Lazer
- Vestuário
- Outros

## 🔒 Segurança

- Rate limiting (100 req/15min por IP)
- Validação de dados de entrada
- Sanitização de dados
- CORS configurado
- Tratamento de erros

## 🧪 Testes

```bash
npm test
```

## 📝 Logs

Os logs são exibidos no console durante o desenvolvimento. Em produção, configure um sistema de logs adequado.

## 🚀 Deploy

1. Configure as variáveis de ambiente para produção
2. Configure MongoDB em produção
3. Execute `npm start`

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação do projeto.