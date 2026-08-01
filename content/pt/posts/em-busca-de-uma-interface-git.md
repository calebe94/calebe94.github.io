---
title: Em busca de uma interface git self-hosted
description: ''
date: '2022-02-28 00:02:23'
tags: []
---

# Em busca de uma interface git self-hosted

Estive em busca de uma interface `git` para hospedar os meus projetos em meu próprio servidor, para de certa forma servir de meu portifólio.

Eu já tinha conhecimento de que o [gitlab] permite que os usuários criem a sua própria instância(self-host) em seus servidores, e eu mesmo já hospedei uma instância do [gitlab] em minha VPS.

Porém, achei a plataforma muito pesada, necessitando de muita memória RAM, e o "fresh install" do [gitlab] já consumia **8 GB** de armazenamento.

Então iniciei a minha pesquisa a procura de uma interface `git` que fosse, simples e leve.

## Início das pesquisas

Primeiro me lembrei que o projeto [suckless] faz a hospedagem de seus próprios repositórios utilizando uma interface `git` bem simples.

Pesquisando um pouco descobri que se trata do [stagit], uma ferramenta que gera páginas estáticas para os seus repositórios `git`.

Gostei da proposta do [stagit], porém, esta ferramenta precisa ser rodada periódicamente para gerar as páginas dos repositórios(ou a cada alteração).

Pesquisando mais um pouco, eu encontrei um post no blog [paritybit](https://www.paritybit.ca/blog/choosing-a-self-hosted-git-service) citando algumas plataformas que ele encontrou em sua jornada em busca de um servidor git.

[Neste post](https://www.paritybit.ca/blog/choosing-a-self-hosted-git-service) o autor cita vários servidores, mas um deles me chamou a atenção por ser escrito utilizando a linguagem `C`.

Este software se chama [cgit]. O que me chamou a atenção a respeito do [cgit] é o fato de ele poder ser rodado via [CGI](https://www.geeksforgeeks.org/common-gateway-interface-cgi/),
e também por poder rendererizar as páginas a todo a acesso do usuário(não necessáriamente a toda alteração do projeto). O [cgit] também atende aos meus requisitos de ser um software leve e simples e de quebra é um software que segue a filosofia [suckless].

Com estas informações em mãos eu decidi que o [cgit] será a minha interface `git`.

## Configurando o `cgit`

Para começar a configuração do [cgit] eu li o verbete do [cgit] na [Arch Wiki](https://wiki.archlinux.org/title/Cgit).
Este verbete descreve com clareza os passos para instalar o [cgit] na sua **VPS**.

Após seguir as etapas de instalação descritas na [Arch Wiki](https://wiki.archlinux.org/title/Cgit) eu apliquei um `css` com [tema `dark`](https://gist.github.com/Yoplitein/f4b671a2ec70c9e743fa) que encontrei na internet.

O meu arquivo de `css` para o [cgit] pode ser encontrado no meu repositório: [cgit](https://git.calebe.dev.br/cgit/).

## Servidor git

Para eu poder ver meus repositórios renderizados pelo [cgit] eu preciso ter o meu próprio servidor `git`, não é mesmo?

Consegui configurar o meu próprio servidor `git` com facilidade seguindo o guia de [referência do git](https://git-scm.com/book/en/v2/Git-on-the-Server-Git-Daemon).

Foi algo bem simples não tive problemas algum ao seguir os passos.

Após a configuração do servidor git eu apenas informei ao [cgit] em qual diretório os meus repositórios estavam armazenados preenchendo o arquivo de configuração localizado em `/etc/cgitrepos`.

## Configurando `mirrors`

Após configurar o servidor git eu precisei espelhar no meu servidor, os meus projetos hospedados tanto no [Github] tanto no [Gitlab].

Para isso utilizei um script que encontrei no [Github], chamado [git-mirror].

O [git-mirror] é uma ferramenta simples e escrito em `shell script`.

Para espelhar os meus projetos eu criei um diretório no meu computador para armazenar os meus repositórios, em seguida eu utilizei o seguinte comando para criar o espelho:

```sh
git-mirror setup path/to/directory https://someserver.domain/user/tomirror git@someserver.domain/user/mirror
```

Este script tem que ser chamado com frequência para atualizar os remotos a cada alteração, para isso o próprio desenvolvedor criou um `target` do `systemd` para realizar a ação de `update` a cada 5 minutos.

Infelizmente os meus espelhos estão configurados apenas no meu computador pessoal no momento, logo, se eu realizar alguma alteração em algum dos meus projetos, e o meu computador estiver desligado, esta alteração não poderá ser vista no meu servidor git em [git.calebe.dev.br](https://git.calebe.dev.br).

E infelizmente também os espelhos são feitos em apenas uma direção, ou seja, somente as alterações enviadas para os remotos do [Gitlab] e [Github] podem ser vistas no meu servidor git.

Exemplo:

```
    Gitlab              Meu Servidor
    HEAD      ---->          Git
      |                       |
   Commit                   Commit
   cb35f94                  cb35f94
```

Futuramente eu quero descobrir um jeito de criar espelhos bidirecionais, ou seja, as alterações poderão ser feitas em ambos os remotos.

Exemplo:

```
    Gitlab              Meu Servidor
    HEAD      <>---->        Git
      |                       |
   Commit                   Commit
   cb35f94                  cb35f94
```

# Conclusão

Configurar o [cgit] é uma tarefa relativamente fácil se você já tem um conhecimento de como aplicações [CGI] funcionam, de como configurar o `nginx`, de como funciona o `ssh` e conhecimentos intermediários do uso de comandos de linha de comando.

Lendo as documentações do `git` e do [cgit] eu consegui hospedar um servidor git simples e leve, e pode ser acessado em [git.calebe.dev.br](https://git.calebe.dev.br).

[cgit]: https://git.zx2c4.com/cgit/
[Github]: https://github.com/
[Gitlab]: https://gitlab.com/
[suckless]: https://suckless.org/
[stagi]: https://git.codemadness.org/stagit/file/README.html
[git-mirror]: https://github.com/janbaudisch/git-mirror
