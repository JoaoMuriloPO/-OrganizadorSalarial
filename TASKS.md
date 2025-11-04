# Tasks do Projeto: Organizadora Salarial

## 📋 Visão Geral

Aplicação web para gerenciamento de lançamentos financeiros com ReactJS (frontend) e NodeJS (backend).

---

## 🎯 FASE 1: SETUP E ESTRUTURA INICIAL

### Task 1.1: Configuração do Backend

- [ ] Criar estrutura do projeto backend (NodeJS + Express)
- [ ] Configurar package.json com dependências necessárias
- [ ] Configurar estrutura de pastas (routes, controllers, models, middleware)
- [ ] Configurar banco de dados (MongoDB ou PostgreSQL)
- [ ] Criar arquivo de configuração de ambiente (.env)

### Task 1.2: Configuração do Frontend

- [ ] Instalar Material-UI no projeto React existente
- [ ] Configurar estrutura de componentes
- [ ] Configurar roteamento (se necessário)
- [ ] Configurar comunicação com API (axios/fetch)

---

## 🎨 FASE 2: DESENVOLVIMENTO DO FRONTEND

### Task 2.1: Header Component

**Prioridade: Alta**

- [ ] Criar componente `Header.jsx`
- [ ] Implementar título "Organizador Salarial"
- [ ] Estilizar com Material-UI
- [ ] Tornar responsivo
- [ ] Integrar no App.js

**Critérios de Aceitação:**

- Header visível em todas as telas
- Design atraente e intuitivo
- Responsivo para mobile

### Task 2.2: Lançamentos Component (Box Esquerdo)

**Prioridade: Alta**

- [ ] Criar componente `Lancamentos.jsx`
- [ ] Implementar formulário com campos:
  - [ ] Campo de data (DatePicker do MUI)
  - [ ] Campo de valor (TextField type="number")
  - [ ] Campo de categoria (Select com opções)
  - [ ] Botão "Adicionar"
- [ ] Implementar validação de formulário
- [ ] Implementar lógica de captura de dados
- [ ] Estilizar com Material-UI Box
- [ ] Implementar feedback visual (loading, success, error)

**Critérios de Aceitação:**

- Todos os campos obrigatórios validados
- Dados enviados corretamente para API
- Feedback visual para o usuário
- Layout responsivo

### Task 2.3: Filtro Component

**Prioridade: Média**

- [ ] Criar componente `Filtro.jsx`
- [ ] Implementar campos de filtro:
  - [ ] Dropdown de categoria
  - [ ] Campo de período (DateRange)
  - [ ] Botão "Aplicar"
- [ ] Implementar lógica de filtragem
- [ ] Estilizar com Material-UI
- [ ] Implementar reset de filtros

**Critérios de Aceitação:**

- Filtros funcionam corretamente
- Interface intuitiva
- Possibilidade de limpar filtros

### Task 2.4: Histórico Component

**Prioridade: Alta**

- [ ] Criar componente `Historico.jsx`
- [ ] Implementar tabela com Material-UI Table
- [ ] Colunas: Data, Valor, Categoria
- [ ] Implementar paginação
- [ ] Implementar ordenação por colunas
- [ ] Integrar com sistema de filtros
- [ ] Implementar loading state
- [ ] Implementar empty state

**Critérios de Aceitação:**

- Dados exibidos corretamente
- Tabela responsiva
- Paginação funcional
- Estados de loading e vazio

### Task 2.5: Total do Mês Component

**Prioridade: Média**

- [ ] Criar componente `TotalMes.jsx`
- [ ] Calcular total dos lançamentos filtrados
- [ ] Exibir número de lançamentos
- [ ] Estilizar para destacar informações
- [ ] Atualizar automaticamente com filtros

**Critérios de Aceitação:**

- Cálculos corretos
- Atualização automática
- Design destacado

---

## 🔧 FASE 3: DESENVOLVIMENTO DO BACKEND

### Task 3.1: Estrutura da API

**Prioridade: Alta**

- [ ] Criar modelo de dados para Lançamentos
- [ ] Implementar rotas CRUD:
  - [ ] POST /api/lancamentos (criar)
  - [ ] GET /api/lancamentos (listar com filtros)
  - [ ] PUT /api/lancamentos/:id (editar)
  - [ ] DELETE /api/lancamentos/:id (deletar)
- [ ] Implementar middleware de validação
- [ ] Implementar middleware de tratamento de erros

### Task 3.2: Lógica de Filtros

**Prioridade: Média**

- [ ] Implementar filtro por categoria
- [ ] Implementar filtro por período
- [ ] Implementar filtro combinado
- [ ] Otimizar queries do banco
- [ ] Implementar paginação no backend

### Task 3.3: Validações e Segurança

**Prioridade: Alta**

- [ ] Validar dados de entrada
- [ ] Implementar sanitização de dados
- [ ] Configurar CORS
- [ ] Implementar rate limiting
- [ ] Configurar logs de erro

---

## 🔗 FASE 4: INTEGRAÇÃO FRONTEND-BACKEND

### Task 4.1: Serviços de API

**Prioridade: Alta**

- [ ] Criar serviço para comunicação com API
- [ ] Implementar tratamento de erros
- [ ] Implementar loading states
- [ ] Configurar interceptors para requests

### Task 4.2: Estado Global (se necessário)

**Prioridade: Baixa**

- [ ] Configurar Context API ou Redux
- [ ] Gerenciar estado dos lançamentos
- [ ] Gerenciar estado dos filtros

---

## 🧪 FASE 5: TESTES E QUALIDADE

### Task 5.1: Testes Frontend

**Prioridade: Baixa**

- [ ] Testes unitários dos componentes
- [ ] Testes de integração
- [ ] Testes de acessibilidade

### Task 5.2: Testes Backend

**Prioridade: Baixa**

- [ ] Testes unitários das rotas
- [ ] Testes de integração com banco
- [ ] Testes de performance

---

## 🚀 FASE 6: DEPLOY E DOCUMENTAÇÃO

### Task 6.1: Preparação para Deploy

**Prioridade: Baixa**

- [ ] Configurar variáveis de ambiente
- [ ] Otimizar build do React
- [ ] Configurar Docker (opcional)
- [ ] Documentar processo de deploy

### Task 6.2: Documentação Final

**Prioridade: Baixa**

- [ ] README com instruções de instalação
- [ ] Documentação da API
- [ ] Guia do usuário

---

## 📝 CATEGORIAS SUGERIDAS

Para implementar nos selects de categoria:

- Alimentação
- Transporte
- Moradia
- Saúde
- Educação
- Lazer
- Vestuário
- Outros

---

## 🔄 ORDEM DE DESENVOLVIMENTO SUGERIDA

1. **Semana 1**: Tasks 1.1, 1.2, 2.1
2. **Semana 2**: Tasks 2.2, 3.1
3. **Semana 3**: Tasks 2.4, 4.1
4. **Semana 4**: Tasks 2.3, 2.5, 3.2
5. **Semana 5**: Tasks 3.3, 4.2, refinamentos

---

## 📊 CRITÉRIOS DE DEFINIÇÃO DE PRONTO (DoD)

Para cada task ser considerada completa:

- [ ] Código implementado e funcionando
- [ ] Código revisado
- [ ] Testes básicos passando
- [ ] Documentação atualizada
- [ ] Responsividade verificada
- [ ] Acessibilidade básica verificada
