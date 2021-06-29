<h1 align="center">
    <img alt="Letmeask" src=".github/logo.svg" height="100px" />
</h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/alexandrecorazza/letmeask?style=flat-square">
  <img alt="GitHub" src="https://img.shields.io/github/license/alexandrecorazza/letmeask?style=flat-square"> 
</p>
<p align="center">
  <a href="#art-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#bookmark-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#%EF%B8%8F-configuração">Configuração do projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#pushpin-to-do">To-do</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<p align="center">
  <img alt="design do projeto" width="650px" src="./.github/cover.svg" />
<p>

## :art: Layout
O layout do projeto foi feito no [Figma](https://www.figma.com/) e pode ser visto [clicando aqui](https://www.figma.com/file/mV84Acyd4auZ0dWgbqZM5N/Letmeask).

## :bookmark: Sobre

O **Letmeask** é uma sistema de ranqueamento de perguntas em lives desenvolvida em React e Firebase. Pensando em otimizar a experiência dos usuários e hosts nas lives, o letmeask ranqueia as perguntas de acordo com a prioridade definida pela comunidade. Assim, os hosts são capazes de visualizar as perguntas mais pontuadas pelos usuários e respondê-las de acordo com a votação.
  
Este projeto foi idealizado e desenvolvido pela [Rocketseat](https://rocketseat.com.br/).

## :rocket: Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [SASS](https://sass-lang.com/)


## ⚙️ Configuração

- ### **Pré-requisitos**

  - É **necessário** possuir o **[Node.js](https://nodejs.org/en/)** instalado no computador
  - É **necessário** possuir uma conta cadastrada no Github
  - É **necessário** possuir o **[Git](https://git-scm.com/)** instalado e configurado no computador
  - É **necessário** ter o gerenciador de pacotes **[Yarn](https://yarnpkg.com/)** instalado ou o **[NPM](https://www.npmjs.com/)**.
  - É **necessário** criar e configurar um novo projeto no [Firebase](https://console.firebase.google.com/).

- ### Configurando o Firebase
    
- ### Executando o App

  ```bash
  # Abra um terminal e copie este repositório com o comando
  $ git clone https://github.com/alexandrecorazza/letmeask.git
  
  # ou use a opção de download.

  # Entre na pasta server 
  $ cd letmeask/

  # Instale as dependências
  $ yarn install
    
  # Crie um arquivo .env.local no diretório raiz do projeto;
  # Copie as variaveis do arquivo .env.example e cole no .env.local e preencha as informações com os dados obtidos na configuração do Firebase

  # Rode o app
  $ yarn start
  ```

<br>

## :pushpin: To-Do

- [ ] Dark theme
- [ ] Aplicação responsiva
- [ ] Toasts de avisos do sistemas

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
