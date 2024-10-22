# bix-technology

## Visão Geral

**bix-technology** faz parte de um teste de seleção apresentado pela empresa bix tecnologia,

### Candidato: Filipe Sales
#### Linkedin: https://www.linkedin.com/in/filipe-sales/

## Funcionalidades

- **Autenticação de Usuário**: Sistema seguro de login/logout utilizando armazenamento local (localStorage).
- **Visualização de Dados**: Gráficos interativos (barra, linha, rosca, etc.) exibindo dados financeiros como receitas, despesas e saldos por conta, estado e setor.
- **Filtragem**: Aplicação de filtros de data, conta, setor e estado para visualizar relatórios financeiros detalhados.
- **Design Responsivo**: Otimizado para diferentes tamanhos de tela utilizando Chakra UI e TailwindCSS.
- **Arquitetura Baseada em Componentes**: Componentes modulares e reutilizáveis para diversas seções, como gráficos e cartões de resumo.

## Estrutura do Projeto

- **Páginas**:
  - `DashboardPage`: O dashboard principal exibindo gráficos, filtros e resumos financeiros.
  - Outras páginas: Login, etc.
- **Componentes**:
  - `SummaryCard`: Um componente reutilizável que exibe dados de resumo, como receita total, despesas e saldo.
  - `StackedBarChart`, `LineChart`, `DoughnutChart`: Componentes para exibir gráficos usando Chart.js.
- **Gerenciamento de Estado**:
  - Gerenciamento de filtros, dados de transações e resumos usando `useState` e `useEffect` do React.

## Instalação

Para executar este projeto localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-repo/bix-technology.git
   cd bix-technology
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Para compilar a versão de produção:
   ```bash
   npm run build
   ```

5. Inicie o servidor de produção:
   ```bash
   npm run start
   ```

## Tecnologias Utilizadas

- **Next.js**: Framework React para construção de aplicações com renderização no lado do servidor.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Chakra UI**: Biblioteca de componentes de UI para criar designs acessíveis e responsivos.
- **Styled Components**: Para escrever CSS-in-JS.
- **TailwindCSS**: Framework CSS utilitário para construção rápida de designs personalizados.
- **Chart.js**: Biblioteca JavaScript para criação de gráficos.
- **TypeScript**: JavaScript fortemente tipado para uma melhor experiência de desenvolvimento.
- **ESLint**: Ferramenta de linting para manter a qualidade do código.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm run start`: Executa o servidor de produção.
- `npm run lint`: Verifica a qualidade do código.

## Licença

Este projeto é privado e não está atualmente licenciado para uso público.

## Autor

Filipe Sales

Contatos e Redes:

[<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/filipe-sales/)  
[<img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" />](mailto:eduardojs999@gmail.com)  
[<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />](https://github.com/filipe-jsales)  
[<img src="https://img.shields.io/badge/GitLab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white" />](https://gitlab.com/filipe-jsales)  
[<img src="https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=white" />](https://leetcode.com/u/filipe-jsales/)

---
