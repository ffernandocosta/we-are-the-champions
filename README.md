# We are the Champions
_[Read it in English](#english-version)_

Endorsements web app que desenvolvi como desafio de projeto solo do módulo 3 de JavaScript do curso [Scrimba](scrimba.com) usando Firebase. Aprendi bastante sobre como usar Firebase e Real-time Database para armazenar e e sincronizar dados em tempo real em vários clientes.

## Índice

- [Geral](#geral)
  - [Funções implementadas](#funções-implementadas)
  - [Preview video](#preview-video)
  - [Links](#links)
- [Meu processo](#meu-processo)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [O que eu aprendi](#o-que-eu-aprendi)
  - [Desafios e bugs resolvidos durante o desenvolvimento](#desafios-e-bugs-resolvidos-durante-o-desenvolvimento)
- [Feito por](#feito-por)

## Geral

### Funções implementadas

Os usuários devem ser capazes de:

- Fazer login/cadastro com e-mail e senha
- Acesso aos Endorsements posts depois de fazer login/cadastrar
- Postar um Endorsement, dar like em outros posts
- Ter acesso em tempo real a outros posts feitos/likes
- Deslogar da plataforma

### Preview video



https://github.com/ffernandocosta/we-are-the-champions/assets/70672573/e80b9b52-af3c-42df-b70a-0f58a8de165f



### Links

- [Live version](https://we-are-the-champions-xi.vercel.app)

## Meu processo

### Tecnologias Utilizadas

- JavaScript
- Firebase
- Semantic HTML5 markup
- CSS custom properties
- Grid
- Flexbox
- Mobile first workflow


### O que eu aprendi

- Aprendi como usar Firebase, como importar suas funções e usá-las no projeto
- Firebase: initializeApp, getDatabase, reference, push, onValue, snapshot, remove e IDs dos posts
- Firebase: Authentication with createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut
- async functions para lidar com authentication, login, cadastro e log out
- Como transformar objetos em arrays usando Object.entries e Object.values
- Renderizar elementos usando createElement

### Desafios e bugs resolvidos durante o desenvolvimento

- Tive que lidar com um bug do icone ficando vermelho quando um post foi curtido na tela de outros clientes. Isso impedia outros clientes de darem like no post. Resolvi criar uma array para ter o controle de qual usuário deu like no post e antes de deixar o icone de like vermelho, checar se o usuário se encontra na array. Foi um desafio pois Firebase não aceita arrays vazias, tive que iniciar a array com uma string de '0' e depois ir adicionando o Uid dos usuários. Pra checar se o usuário já estava na lista de likes utilizei o método 'includes()' do JavaScript. E antes disso tive que lidar com o fato de que a Database do Firebase não aceita arrays, quando enviei a array de likes firebase transformava ela em objeto. Como já tinha usado Object.entries para transformar os posts da database em array, decidi usar 'Object.values()' pra ter acesso a cada Uid de usuários que deram like em formato de array. 

## Feito por

<div>
  <a href="https://www.linkedin.com/in/ffernando-costa/?locale=en_US" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="My Linkedin profile"></a>
  <a href="https://twitter.com/ffernandodev" target="_blank"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="My twitter profile"</a>
</div>

#### _English version_


# We are the Champions

Endorsements web app that I developed as a solo project challenge during module 3 of [Scrimba's](scrimba.com) JavaScript course using Firebase. Got to learn and practice hot to use Firebase as a Back-end Real-time Databse to store and sync data in real-time across multiple clients.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Preview video](#preview-video)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Challenges and Bugs Solved during Development](#challenges-and-bugs-solved-during-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Add items to shopping list
- Click to remove any item on the list
- Don't lose access to the shopping list even after closing the app
- See error message if item name is empty
- Switch between light and dark more and see item hover animation

### Video preview

[/* video here */](https://github.com/ffernandocosta/we-are-the-champions/assets/70672573/e80b9b52-af3c-42df-b70a-0f58a8de165f)

### Links

- [Live version](https://we-are-the-champions-xi.vercel.app)

## My process

### Built with

- JavaScript
- Firebase
- Semantic HTML5 markup
- CSS custom properties
- Grid
- Flexbox

### What I learned

- How to use Firebase and import your functions to use in this project
- Firebase: initializeApp, getDatabase, reference, push, onValue, snapshot, remove and IDs of posts
- Firebase: Authentication with createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut
- Async functions to handle authentication, login, registration, and log out.
- How to turn objects into an array using Object.entries and Object.values
- How to render elements from the Firebase database using createElement

### Challenges and Bugs Solved during Development

- I had to deal with a bug where the icon turned red when a post was liked on the screen of other clients. This prevented other clients from liking the post. I decided to create an array to keep track of which user had liked the post and before turning the like icon red, I would check if the user is present in the array. It was a challenge because Firebase doesn't accept empty arrays, so I had to initialize the array with a '0' string and then gradually add the UIDs of the users. To check if the user was already in the likes list, I used the JavaScript 'includes()' method. Before that, I had to handle the fact that Firebase Database doesn't accept arrays; when I sent the likes array, Firebase would convert it into an object. Since I had already used 'Object.entries' to transform posts from the database into an array, I decided to use 'Object.values()' to access each UID of users who liked the post in array format.


## Author

<div>
  <a href="https://www.linkedin.com/in/ffernando-costa/?locale=en_US" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="My Linkedin profile"></a>
  <a href="https://twitter.com/ffernandodev" target="_blank"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="My twitter profile"</a>
</div>
