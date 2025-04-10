# App Finanças

## Descrição
O **App Finanças** é uma aplicação móvel desenvolvida em React Native que ajuda os usuários a gerenciar suas finanças pessoais. Ele permite adicionar, visualizar e excluir transações, categorizá-las e visualizar gráficos de despesas por categoria.

## Funcionalidades
- Adicionar novas transações (receitas, despesas, contas futuras).
- Visualizar transações semanais e por categoria.
- Excluir transações com gestos de swipe.
- Alterar o idioma da aplicação.
- Visualizar gráficos de despesas por categoria.

## Tecnologias Utilizadas
- **React Native**: Framework para desenvolvimento de aplicativos móveis.
- **Expo**: Plataforma para desenvolvimento de aplicativos React Native.
- **React Native Reanimated**: Biblioteca para animações complexas.
- **Victory**: Biblioteca para gráficos e visualizações.
- **React Native Calendars**: Componente de calendário para seleção de datas.
- **MUI X Charts**: Biblioteca para gráficos de barras.

## Estrutura do Projeto
- **app**: Contém os componentes principais da aplicação.
  - **(tabs)**: Contém as telas principais como `home`, `finances`, `budget`.
  - **(profile)**: Contém telas relacionadas ao perfil do usuário, como `settings` e `categorias`.
  - **Languages**: Gerencia a tradução e seleção de idioma.
  - **Transactions**: Gerencia o conteúdo e operações relacionadas às transações.

## Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/app-financas.git

2. Navegue até o diretório do projeto:
   ```bash
   cd app-financas
    ```
3. Instale as dependências:
   ```bash
   npm install
    ```
4. Inicie o aplicativo:
   ```bash
   npx expo start
    ```
## Contribuição
Contribuições são bem-vindas! Para contribuir, siga os passos abaixo:

1. Fork o repositório.
2. Crie uma branch para sua feature ou correção ( git checkout -b minha-feature ).
3. Commit suas alterações ( git commit -m 'Adiciona minha feature' ).
4. Push para a branch ( git push origin minha-feature ).
5. Abra um Pull Request.
