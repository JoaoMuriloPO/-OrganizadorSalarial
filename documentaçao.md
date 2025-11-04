Documentação do Projeto: Organizadora Salarial
Visão Geral
Este projeto é uma aplicação web desenvolvida em ReactJS para o frontend e NodeJS para o backend. O objetivo é permitir que os usuários gerenciem seus lançamentos financeiros de forma eficiente, utilizando filtros para visualizar dados específicos.

Estrutura da Tela
A tela principal é composta por três partes principais:

Header
Lançamentos - Uma tag Box do MUI na esquerda da tela.
Filtro - Um componente em linha acima de um Box do MUI na direita da tela.
Histórico - Abaixo do filtro, um Box do MUI mostrando o histórico para ser filtrado.
Total do Mês - Um Box interno com informações do total do mês ao final do Box de histórico.
Detalhamento das Tarefas
1. Header
Descrição: O header exibe o título da aplicação e deve ser estilizado de forma a ser atraente e intuitivo.
Tarefas:
Criar um componente de Header em React.
Adicionar o título "Organizador Salarial".
Estilizar o Header utilizando CSS ou uma biblioteca como Material-UI.
2. Lançamentos (Box do MUI)
Descrição: Este Box à esquerda permite que o usuário insira novos lançamentos financeiros.
Tarefas:
Criar um componente Lancamentos que incluirá:
Um campo de data (input type date).
Um campo de valor (input type number).
Um campo de categoria (select com opções como "Mercado", "Transporte", etc.).
Um botão "Adicionar".
Implementar a lógica para captura dos dados inseridos.
Estilizar o Box utilizando Material-UI para manter a consistência visual.
3. Filtro (Box do MUI)
Descrição: O filtro permite que o usuário selecione um intervalo de datas e uma categoria para filtrar os lançamentos.
Tarefas:
Criar um componente Filtro que incluirá:
Um campo dropdown para selecionar a categoria (opções pré-definidas).
Um campo de período (input type date ou um range de datas).
Um botão "Aplicar" para aplicar os filtros.
Definir a lógica que será chamada ao clicar no botão "Aplicar" para filtrar os dados.
Estilizar o Box utilizando Material-UI.
4. Histórico (Box do MUI)
Descrição: Este Box exibe a lista de lançamentos filtrados com suas respectivas categorias e valores.
Tarefas:
Criar um componente Historico que renderiza uma tabela com as colunas: Data, Valor e Categoria.
Integrar com a lógica de filtragem para mostrar apenas os lançamentos que atendem aos critérios selecionados.
Estilizar a tabela utilizando Material-UI para garantir uma boa usabilidade.
5. Total do Mês
Descrição: Um Box interno que exibe o total de lançamentos filtrados para o mês corrente.
Tarefas:
Calcular o total dos lançamentos filtrados.
Exibir uma mensagem com o total e o número de lançamentos listados.
Estilizar este Box para destacar as informações relevantes.
Tecnologias Utilizadas
Frontend
ReactJS: Para a construção da interface do usuário.
Material-UI: Para componentes prontos e estilização da interface.
Backend
NodeJS: Para criar a API que irá gerenciar os lançamentos financeiros.
Express: Framework para facilitar a criação de rotas e middleware.
Banco de Dados: (sugestão: MongoDB ou PostgreSQL) para armazenar os dados dos lançamentos.
Considerações Finais
Essa documentação serve como guia para o desenvolvimento da aplicação "Organizador Salarial". Cada parte da interface deve ser desenvolvida em conjunto com a lógica de backend para garantir que os dados sejam gerenciados e apresentados corretamente.