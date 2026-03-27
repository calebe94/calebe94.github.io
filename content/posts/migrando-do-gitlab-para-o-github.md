---
title: Migrando repositórios do Gitlab para o Github
description: ''
date: '2022-05-30 16:48:12'
tags: []
---

Migrando repositórios do Gitlab para o Github {#migrando-do-gitlab-para-o-github-1}
================================

Na [T2I Group](http://t2igroup.com/) temos uma instância(*self-hosted*)
do *Gitlab* em uma
[VPS](https://pt.wikipedia.org/wiki/Servidor_virtual_privado) para
hospedarmos os nossos repositórios.

Utilizamos esta instância por pelo menos 2 anos, até começar a ter
problemas para atualizar o **Gitlab**. Também começamos a perceber que a
interface do **Gitlab** era muito poluída e lenta.

Então decidimos a migrar todos os nossos repositórios para o *Github*,
visto vez que a maioria dos desenvolvedores já conhece a plataforma.

Processo de migração
--------------------

Para migrar os repositórios eu criei uma conta para a *T2I Group* no
**Github** e em seguida criei algumas **Organizações** para a
*FatorBLE*, *Projeto MIP* e para novo Projeto MIP, que chamamos *MIPv2*.

Em seguida fiz a importação dos repositórios de forma manual, clicando
no botão **\"+\"** na página inicial do **Github**.

![](https://media.calebe.dev.br/images/2022-05-30_16-14.png)

Na sequência escolhia a Organização para importar o repositório.

![](https://media.calebe.dev.br/images/2022-05-30_16-15.png)

Porém, esse processo tem um problema. Ele não importa as *issues* e
*Merge Requests*.

### Importando issues e merge requests

Para realizar esse processo eu utilizei um projeto chamado
[node-gitlab-2-github](https://github.com/piceaTech/node-gitlab-2-github).

Esse projeto é bem simples de utilizar, basta copiar o arquivo
`sample_settings.ts` para `settings.ts` e editar o arquivo com as chaves
de acesso do **Gitlab** e do **Github** e rodar o projeto.

Na primeira execução, o `node-gitlab-2-github` lista todos os
repositórios que a chave de acesso do **Gitlab** tem acesso. Com isso em
mãos é só editar o arquivo com o código, nome e grupo do repositório no
**Gitlab** e nome do repositório no **Github** e rodar o projeto.

Pronto, o `node-gitlab-2-github` vai importar todas as *issues* abertas
e fechadas para o Github, e os *Merge Requests*. Se o
`node-gitlab-2-github` detectar a presença da *branch* aberta para o
*Merge Request*, ele cria um *Pull Request*. Caso ele não detectar, ele
cria uma *issue* com o conteúdo do *Merge Request*.

Conclusão
=========

Em algumas horas eu consegui importar dezenas de repositórios da nossa
instância privada do **Gitlab** para o **Github**, sem perder
absolutamente nada de informação no processo.

Todos os projetos que possuíam *issues* e *Merge Requests* foram
importados com sucesso no **Github**.

