---
title: Que tal criar um jogo?
description: ''
date: '2022-05-09 16:30:33'
tags: []
---

# Que tal criar um jogo?

Recentemente um amigo meu começou a fazer um curso de
[Unity](https://unity.com/) e durante uma conversa nós ficamos muito
empolgados em criar um jogo.

Eu fiquei muito empolgado em criar um jogo em **C**, ele (Rafael) quer
desenvolver o jogo em Unity, eu não o julgo muito por isso, mas eu não
sou muito familiar com `C#`, portanto não eu gostaria de seguir com o
`Unity`.

## Plano

O meu plano é aprender como um jogo funciona, todos os passos da
criação, enfim, TUDO.

Não só isso, mas gostaria de criar um jogo 100%
`FOSS (Free and Open Source Software)`.


### Engines

Após algumas pesquisas a respeito de *engines* eu não obtive tanto
sucesso quanto eu gostaria.

Eu encontrei algumas *engines* Open Source como a
[Source](https://developer.valvesoftware.com/wiki/Source_Engine_Features),
utilizada pela Valve para criar Counter Strike, Portal e Half-Life.

Também encontrei a *engine* chamada [Godot],
escrita em `C++`, mas utilizam uma sintaxe própria para desenvolver os
jogos, chamada `GDNative`.

Portanto, eu decidi seguir por conta própria, irei criar o meu jogo do
**ZERO** criando em paralelo a engine.

### DIY

Há algumas vantagens em criar a sua própria engine, listarei algumas
abaixo:

-   Maior desempenho;
-   Código menor;
-   controle total do código;

Enfim, **TOTAL CONTROLE DE TUDO**, até das falhas.

E eu também estou ciente que este \"**Controle total**\" pode ser uma
desvantagem também, pois terei que estudar tudo a respeito de jogos como
gerenciamento de entidades, colisões, câmera, gerenciamento de diálogos
e outras coisas.

Mas como o meu foco é aprender como um jogo funciona, esta desvantagem
se torna uma dolorosa vantagem.

## SDL2

Após mais pesquisas, assisti no Youtube a palestra [Game Development
with SDL 2.0 (Steam Dev Days
2014)](https://www.youtube.com/watch?v=MeMPCSqQ-34) e descobri ser
possível desenvolver jogos utilizado a biblioteca
[SDL2](https://www.libsdl.org/index.php), que eu já havia utilizado para
simular a biblioteca gráfica para sistemas embarcadas chamada
[LVGL](https://lvgl.io/).

Com a `SDL2` eu criava um display virtual para poder demonstrar os
elementos gráficos, sem a necessidade de ter que gravar o firmware no
dispositivo toda vez que eu fizesse uma alteração.

A primeira coisa que me passou pela cabeça é: porque não criar um jogo
do zero utilizando a biblioteca `SDL2`?

E é daqui que eu partirei.

## Que jogo?

Mas aí me veio a pergunta: que jogo? Como eu posso criar um jogo, se eu
não faço nem ideia do que eu quero construir.

E conversando com o meus amigos que estabelecemos algumas \"restrições\"
para a ideia do jogo. São elas:

-   Jogo com gráficos em Pixelarl (8/16 bits);
-   Visão em top-dowm;
-   Jogo de sobrevivência e exploração com Farm Simulator(Jogo de
    fazendinha);
    -   jogo de sobrevivência um pouco mais \"Cozy\", ao estilo de
        Stardew Valley;
    -   e exploração ao estilo de Minecraft, onde o mundo é gerado
        proceduralmente, e cabe ao player explorar o mundo atrás de
        recursos;
    -   o player poderá customizar essas ilhas com os itens que serão
        craftados;
    -   os recursos naturais do jogo são finitos, fazendo com que o
        player tenha que criar fazendas;

Com isso eu ainda tive a ideia de adicionar elementos naturais da fauna
e flora brasileira. Como as árvores, plantas e animais comuns no Brasil
(não necessariamente nativos).

## Ferramentas de desenvolvimento

Abaixo listarei algumas ferramentas que pretendo utilizar durante o desenvolvimento do jogo.

### Gráficos

Utilizarei a biblioteca [SDL2 - Simple DirectMedia
Layer](https://www.libsdl.org/index.php).

### Linguagem de programação

Será utilizado a linguagem de programação `C`. Porém, usarei `Python` e
`Shell Script` para escrever algumas ferramentas, ou quando for
conveniente.

### Análise estática de código

Como programarei o jogo em `C`, e utilizarei o compilador `gcc`, irei
utilizar a flag `-fanalyzer` para realizar a análise estática do código.

Detalhes de como a funciona a análise estática do `gcc` pode ser vista
em: [Static analysis in GCC 10 \| Red Hat
Developer](https://developers.redhat.com/blog/2020/03/26/static-analysis-in-gcc-10).

Descrições completas sobre os códigos de error/warning podem ser
encontradas no site <https://cwe.mitre.org>.

Informações a respeito de como utilizar a flag `-fanalyzer` está no site
da documentação do
[GNU/gcc](https://gcc.gnu.org/onlinedocs/gcc/Static-Analyzer-Options.html);

### UI

Para gerar a UI do jogo eu irei utilizar a biblioteca [Nuklear](https://immediate-mode-ui.github.io/Nuklear/doc/index.html).

Outros links:

-   [GNU Hurd - code
    analysis](https://www.gnu.org/software/hurd/open_issues/code_analysis.html);
-   [mygcc the customizable gcc compiler](http://mygcc.free.fr/);
-   [Semgrep](https://semgrep.dev/);
-   [GitHub - foospidy/GrepBugs: A regex based source code
    scanner](https://github.com/foospidy/GrepBugs).

### Cronograma

Não existe um cronograma, eu tenho apenas uma vaga ideia do que quero
fazer. A única coisa que eu tenho certeza é que tenho tempo de mudar de
ideia.

Neste blog eu registrarei as minhas aventuras no mundo do
desenvolvimento de jogos.

Até logo!!!

### Updates

* **13/05/2022**:
    * Descobri que o [Godot] possui suporte third-party para Python. O projeto se chama [godot-python](https://github.com/touilleMan/godot-python).
    * Esqueci de mencionar que estamos mantendo uma nota coletiva com ideias de jogos, ferramentas, tutoriais e vídeos que vamos encontrado. A nota pode ser acessada através [desse link](https://pad.calebe.dev.br/p/jogo).


[Godot]: https://godotengine.org/
