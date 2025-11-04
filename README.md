# 💰 Organizadora Salarial

> Sistema completo para gerenciamento de lançamentos financeiros pessoais

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/atlas)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.3.5-blue.svg)](https://mui.com/)

## 📋 Sobre o Projeto

A **Organizadora Salarial** é uma aplicação web full-stack desenvolvida para ajudar no controle de gastos pessoais. Com uma interface moderna e intuitiva, permite registrar, filtrar e visualizar lançamentos financeiros de forma organizada.

### ✨ Funcionalidades Principais

- 📝 **Cadastro de Lançamentos** - Registre seus gastos com data, valor, categoria e descrição
- 🔍 **Filtros Inteligentes** - Filtre por categoria e período (mês dinâmico)
- 📊 **Dashboard Completo** - Visualize totais, médias e estatísticas
- 📱 **Design Responsivo** - Funciona perfeitamente em desktop e mobile
- 🗄️ **Banco na Nuvem** - Dados seguros no MongoDB Atlas
- ⚡ **Performance Otimizada** - Interface rápida e fluida

## 🎯 Categorias Disponíveis

- 🍔 Alimentação
- 🚗 Transporte  
- 🏠 Moradia
- 🏥 Saúde
- 📚 Educação
- 🎮 Lazer
- 👕 Vestuário
- 📦 Outros

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React** 19.2.0 - Biblioteca para interfaces
- **Material-UI** 7.3.5 - Componentes e design system
- **Axios** - Cliente HTTP para API
- **Date-fns** - Manipulação de datas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **Express Validator** - Validação de dados

### Infraestrutura
- **MongoDB Atlas** - Banco de dados na nuvem
- **CORS** - Controle de acesso entre domínios
- **Rate Limiting** - Proteção contra spam

## 📁 Estrutura do Projeto

```
organizadora-salarial/
├── 📂 front/                    # Frontend React
│   ├── 📂 src/
│   │   ├── 📂 components/       # Componentes React
│   │   │   ├── Header/          # Cabeçalho da aplicação
│   │   │   ├── Lancamentos/     # Formulário de lançamentos
│   │   │   ├── Filtro/          # Filtros de busca
│   │   │   ├── Historico/       # Tabela de histórico
│   │   │   └── TotalMes/        # Dashboard de totais
│   │   ├── 📂 services/         # Serviços de API
│   │   ├── 📂 theme/            # Tema Material-UI
│   │   └── 📂 utils/            # Utilitários e constantes
│   └── 📄 package.json
├── 📂 back/                     # Backend Node.js
│   ├── 📂 controllers/          # Lógica de negócio
│   ├── 📂 models/               # Modelos do banco
│   ├── 📂 routes/               # Rotas da API
│   ├── 📂 middleware/           # Middlewares customizados
│   └── 📄 server.js             # Servidor principal
├── 📄 README.md                 # Este arquivo
└── 📄 TASKS.md                  # Documentação de desenvolvimento
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js** 18+ instalado
- **npm** ou **yarn**
- Conta no **MongoDB Atlas** (gratuita)

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/seu-usuario/organizadora-salarial.git
cd organizadora-salarial
```

### 2️⃣ Configurar Backend

```bash
# Entrar na pasta do backend
cd back

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações do MongoDB Atlas

# Iniciar servidor de desenvolvimento
npm run dev
```

O backend estará rodando em `http://localhost:3001`

### 3️⃣ Configurar Frontend

```bash
# Em outro terminal, entrar na pasta do frontend
cd front

# Instalar dependências
npm install

# Iniciar aplicação React
npm start
```

O frontend estará rodando em `http://localhost:3000`

## ⚙️ Configuração do MongoDB Atlas

1. Acesse [MongoDB Atlas](https://cloud.mongodb.com)
2. Crie uma conta gratuita
3. Crie um novo cluster (M0 - Free)
4. Configure um usuário do banco de dados
5. Adicione seu IP à whitelist (ou 0.0.0.0/0 para qualquer IP)
6. Copie a string de conexão
7. Cole no arquivo `.env` do backend:

```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/organizadora-salarial
```

## 📡 API Endpoints

### Lançamentos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/lancamentos` | Listar lançamentos com filtros |
| `POST` | `/api/lancamentos` | Criar novo lançamento |
| `PUT` | `/api/lancamentos/:id` | Editar lançamento |
| `DELETE` | `/api/lancamentos/:id` | Deletar lançamento |

### Parâmetros de Query (GET)

- `categoria` - Filtrar por categoria
- `dataInicio` - Data inicial (YYYY-MM-DD)
- `dataFim` - Data final (YYYY-MM-DD)
- `page` - Página (padrão: 1)
- `limit` - Itens por página (padrão: 10)

### Exemplo de Requisição

```json
POST /api/lancamentos
{
  "data": "2024-11-04",
  "valor": 25.50,
  "categoria": "Alimentação",
  "descricao": "Almoço no restaurante"
}
```

## 🎨 Screenshots

### Tela Principal
*[Screenshot será adicionado após deploy]*

### Filtros e Dashboard
*[Screenshot será adicionado após deploy]*

### Versão Mobile
*[Screenshot será adicionado após deploy]*

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [Seu Perfil](https://linkedin.com/in/seu-perfil)

## 🙏 Agradecimentos

- [Material-UI](https://mui.com/) pelo excelente design system
- [MongoDB Atlas](https://www.mongodb.com/atlas) pela infraestrutura gratuita
- [React](https://reactjs.org/) pela biblioteca incrível

---

⭐ **Se este projeto te ajudou, deixe uma estrela!** ⭐