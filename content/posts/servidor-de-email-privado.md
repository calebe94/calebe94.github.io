---
title: Servidor de email (self-hosted)
description: ''
date: '2022-03-01 22:21:33'
tags: []
---

# Servidor de email (self-hosted)

### `A saga da frustração`

Como citei em um [post anterior](./em-busca-de-uma-interface-git.html) eu possuo uma instância do [Yunohost] em minha VPS. O [Yunohost] facilita muito a tarefa de instalar as suas aplicações “web” em seu servidor e possui algumas ferramentas para gerenciar o seu servidor. Uma delas é o servidor de email, para te notificar se algum erro ocorreu ao realizar o diagnóstico do servidor.
É possível também realizar o redirecionamento de emails. Podendo o usuário cadastrar alguns emails na plataforma e quando receber algum email, o `postfix` se encarrega de entregar este email em uma conta pessoal do usuário.

O meu plano era utilizar este recurso para cadastrar alguns emails como:

* `contato@calebe.dev.br`: e-mail de contato;
* `spam@calebe.dev.br`: e-mail para eu realizar cadastros em lugares aleatórios;

Logo fiz os testes e percebi que não funcionava. Em um dos diagnósticos eu percebi que a porta `25` era bloqueada pela [Digital Ocean].

![Diagnóstico do Yunohost](https://media.calebe.dev.br/images/blog/diagnostico_yunohost.png)

O diagnóstico diz ser possível receber e-mails, porém, não é possível receber e-mails.

Fiz um teste enviando um email para o meu [Yunohost] com um email da Google, e deu tudo certo. Recebi o e-mail com exito.

Bom, mas se a porta de saída está bloqueada, é só desbloquear, certo? Errado!

## Tentando desbloquear a porta `25`

Após verificar o diagnóstico, corri atrás de desbloquear a porta `25`.

Fui à plataforma da [Digital Ocean] procurar como desbloquear e não encontrei.

Tentei desbloquear pelo `Firewall` do [Yunohost] e aparentemente já estava desbloqueada. Testei o envio de emails e nada.

Abri um protocolo no suporte da [Digital Ocean] e a resposta foi:

```
Hi there,


Thank you for contacting DigitalOcean Support!

Stopping spam is a constant fight and due to this, your account has restrictions specifically on port 25.

However, you are able to use mail services using ports 587, 993, 995 and 465. You will need to open these ports in your firewall. Here is our guide to common iptables commands:
```

Ou seja... O servidor de emails do [Yunohost] não vai funcionar.

## SMTP Relay

Porém, o [Yunohost] sugere algumas alternativas. Uma delas é um `SMTP Relay`, onde eu preciso assinar um serviço externo(third-party) para poder utilizar o servidor de emails.

Com algumas pesquisas na internet eu encontrei o [SendGrid], um serviço da [Twillio]. Eu conheci a [Twillio] a uns anos atrás quando precisei de um serviço de envio de SMS para um projeto que trabalhei. Como gostei da plataforma resolvi tentar o [SendGrid].

As instruções da documentação são bem claras e direto ao ponto. Foi simples configurar tudo.

Ao terminar tudo, pude constatar estar tudo funcionando, pois, o próprio [SendGrid] já oferece o diagnóstico na própria plataforma.

Fiz alguns testes enviando emails por um email da Google e constatei que eu continuava recebendo emails porem o redirecionamento continuava sem funcionar. Após horas de depuração sem encontrar o problema e de [refazer todo o processo de configuração](https://io.bikegremlin.com/11964/sendgrid-setup/) eu resolvi deixar este problema para lá.


## Conclusão

Ao procurar em fórums na internet, a maioria dos usuários desencoraja o uso de servidores de email privados por serem MUITO difíceis de lidarem.

Muitos apontam ser muito mais barato assinar um serviço que gerencie o servidor e que possibilite a criação de vários emails.

Logo, é isso que eu estarei pesquisando nas próximas semanas e documentarei o processo em um novo post.

[SendGrid]: https://sendgrid.com
[Twillio]: https://www.twillio.com
[Yunohost]: yunohost.org
[Digital Ocean]: https://www.digitalocean.com/

