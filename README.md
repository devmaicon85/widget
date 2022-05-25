<p align="center">
  <img alt="FeedWidget" src="https://user-images.githubusercontent.com/21183446/168500841-259c03fc-9f55-408a-adeb-d9d0290139f3.svg" width="70%" />
</p>




<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout Original</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-nextlevel">Próximo Nível</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>


<p align="center">
  <img alt="FeedWidget" src="https://user-images.githubusercontent.com/21183446/168501250-31eb63b1-b9db-4b76-9edc-58238544dfb4.png" />
</p>


<br/><br/>

<h1 align="center">Personalize seu WidgetDev</h1>
<p align="center">
    <img alt="FeedWidget" width="70%" src="https://user-images.githubusercontent.com/21183446/168501265-5c6b2655-b48e-42c8-b909-059353404473.gif" />
        <h2 align="center">
            <a  href="https://www.youtube.com/watch?v=wBts_U1mwSQ" target="_blank">
        visualizar vídeo no youtube
            </a>
            <br/>
        </h2>
</p>





## 🧪 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://reactjs.org)
- [Tailwindcss](https://tailwindcss.com)
- [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)



[VEJA O PROJETO FUNCIONANDO](https://widgetdev.online)


BACK END

- [Express](https://expressjs.com/pt-br)
- [Prisma](https://www.prisma.io)
- [Jest](https://jestjs.io)

## 🚀 Como executar

Clone o repositório e acesse a pasta.

```bash
$ git clone https://github.com/devmaicon85/widget

# entrar na pasta do projeto
$ cd widget
```

Para iniciar o BACKEND, siga os passos abaixo:

```bash

# Entrar na pasta back
$ cd back

# Instalar as dependências
$ npm install

# Faça uma copia do arquivo `.env.example` para `.env` e informe suas credenciais

# Criar o banco de dados via migrate
$ npx prisma migrate dev

# Iniciar o projeto
$ npm run dev

```

Para iniciar o FRONT END, siga os passos abaixo:

```bash

# estando na pasta do projeto widget, entre na pasta web
$ cd web

# Instalar as dependências
$ npm install

# Faça uma copia do arquivo `.env.example` para `.env` e informe suas credenciais

# Iniciar o projeto
$ npm run dev

```


A aplicação WEB pode ser acessada em [`localhost:3030`](http://localhost:3030).


## 💻 Projeto

O projeto é uma aplicação para coleta de feedbacks que pode ser adicionado em qualquer ambiente mobile ou web.


## 🔖 Layout

Você pode visualizar o layout do projeto original através do link abaixo:

- [Layout Web](https://www.figma.com/file/xHveOl5sXHMQfXFZ69H1AR/Feedback-Widget)


## 🚀 NextLevel

ALGUMAS MELHORIAS QUE REALIZEI NO PROJETO

VISÃO DO DEV
- Configuração do email SMTP por .env - Testado e funcionando no mailtrap e mailgun
- Novo arquivo template.html em views/ para mudança do HTML de forma simples

INFRA
- Domínio adquirido https://widgetdev.online
- DNS do domínio configurados na vercel e mailgun
- Backend Hospedado com deploy automatico na digital ocean também
  

VISÃO DO USUÁRIO DO WIDGET
- Abrir no tema padrão do sistema do usuário automaticamente (Dark | Light)
- Novo botão de opção de tema manual Tema Dark | Light
- Novo campo e-mail (opcional) para retorno ao remetente quando necessário
- Novo botão WhatsApp do destino para abrir o WhatsApp no final automaticamente
- Novo botão Instagram para ser exibido um botão final do Feedback

VISÃO DO SITE QUE DESEJA UTILIZAR O WIDGET
- Campo para personalizar TÍTULO do Widget (Feedback, Fale Conosco, WhatsApp...etc)
- Campo de E-MAIL para personalizar o destinatário no qual será enviados
- Opção de ter ou não o botão de Screenshot no Widget (nem todos os sites precisam)
- Mais de 20 opções de cores do Widget
- Html do e-mail melhorado - Taxa de 90% de de market support no mailtrap
- Aparência do Widget alterada, menos arrendodado, header na cor do tema, botão, opacidade, etc...
- Screenshot agora é anexado no e-mail (as tag img com base64 não aparecem no gmail)
  

  FUNCIONALIDADE MAIS COMPLEXA
  - Script automático (também criado por mim) para o usuário conseguir inserir o Feed Widget em qualquer site html, sem precisar saber de programação ou baixar arquivos.

  - O Script insere um iframe no site (zendesk faz o mesmo)
  Grande desafio pois tenho pouco conhecimento de javascript. E por se tratar de iframe, ele deve dimensionar de acordo com o widget e o screenshot deve funcionar mesmo estando em um iframe;


SITES HTML UTILIZANDO O SCRIPT

- [https://playcode.io/896306](https://playcode.io/896306)
- [https://jsfiddle.net/devmaicon/38942rj7/2/](https://jsfiddle.net/devmaicon/38942rj7/2/)


<br><br>

 <h1 align="center">Link com WhatsApp e Instagram</h1>

<p align="center">
    <img alt="FeedWidget" width="70%" src="https://user-images.githubusercontent.com/21183446/168501441-b1fd5e61-3920-4ffc-b1b1-f4941931a424.gif" />
</p>


<br/><br/>

 <h1 align="center">Script rodando no projeto Doctor Care NLW Origin</h1>
<p align="center">
   <a href="https://docter-care-lading-page.vercel.app/" target="_blank">
    <img alt="Doctor Care" src="https://user-images.githubusercontent.com/21183446/168507594-678b5987-4d89-495a-a53a-13e9489bd152.png" />
  </a>
  <p align="center">
    <a href="https://docter-care-lading-page.vercel.app" target="_blank">Visitar o Projeto</a>
  </p>
</p>





## 📝 License

Esse projeto está sob a licença MIT.

---

Feito com 💜 por mim no projeto 👋🏻 [da NLW Returns da Rocketseat](https://www.rocketseat.com.br/)
