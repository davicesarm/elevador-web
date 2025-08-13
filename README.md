# Projeto Elevador - Frontend Next.js

Este repositório contém a interface web do **Projeto Elevador**, desenvolvida em **Next.js** para consumir a API criada com **Spring Boot**.  

## Sobre  

Este frontend tem como objetivo:  

- Fornecer uma interface visual e responsiva para interagir com o elevador.  
- Consumir os dados em tempo real (ou próximo disso) da API.  
- Facilitar o controle dos andares através de botões interativos.  
- Servir como base para melhorias futuras, como atualização em tempo real com **Server-Sent Events** ou **WebSockets**.  

## Contexto  

Este frontend foi construído para trabalhar junto com a API disponível no projeto:  

[**Projeto Elevador - Spring Boot**](https://github.com/davicesarm/elevador-springboot)

Enquanto o backend em **Java Spring Boot** é responsável por toda a lógica do elevador e controle do estado, este frontend em **Next.js** fornece uma interface amigável para que o usuário possa interagir com o sistema.  

## Funcionalidades  

- Consulta periódica do estado do elevador através do endpoint `/status` da API.  
- Botões para solicitar andares (endpoint `/addAndar`).  
- Botão para reiniciar o elevador (endpoint `/reiniciar`)
- Destaque visual para andares que já foram solicitados.  
- Interface responsiva para desktop e mobile.  

## Tecnologias Utilizadas  

- [Next.js](https://nextjs.org/) – Framework React para aplicações web rápidas e modernas.  
- [React](https://react.dev/) – Biblioteca para construção da interface de usuário.  
- [Tailwind CSS](https://tailwindcss.com/) – Estilização responsiva e otimizada.  
