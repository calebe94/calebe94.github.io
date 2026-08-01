---
title: Premissas básicas de desenvolvimento - Suckless
description: ''
date: '2021-04-17 18:04:26'
tags: []
---

<main>
<center>
# Premissas Fundamentais

![](http://lh3.ggpht.com/_6p3hNkUNWrQ/SjpEiMoM3TI/AAAAAAAABdE/9lkeDQLzXUY/s800/bg2009061801.gif)

## [TL:DR](https://www.lifewire.com/what-is-tldr-2483633) (Não quero ler tudo, mas quero entender o básico)
</center>

* Programas devem fazer apenas uma coisa, e devem fazê-la bem.
* Programas devem funcionar bem com outros programas.
* Programas devem ser estupidamente simples.
* Um único programa deve ter pouquíssimas features.
* Escreva programas que manuseiem fluxo de texto(text streams), porque esta é a interface universal.

<center>
<!-- [![](https://miro.medium.com/max/1100/1*2nUxLPrQTJ6FMe3-Ca4M_Q.png)](https://medium.com/web-dev-note/kafka-a-message-broker-778b410908e6) -->

## [Filosofia Unix](http://www.linfo.org/unix_philosophy.html)
</center>

Não existe uma afirmação padrão que defina a filosofia unix.
Mas se for para escolher uma palavra, ela deveria ser [modularidade](http://www.linfo.org/module.html),
que se refere a um sistema composto por vários componentes (modulos), que trabalham juntos, e podem também ser substituídos por outros módulos mais simples ou mais complexos dependendo da necessidade.

A modularidade é comum por natureza, e sua aplicação a produtos feitos pelo homem (bens e serviços) é um fator-chave no desenvolvimento e avanço das sociedades industriais.
No entanto, era relativamente pouco usado para software de computador antes do desenvolvimento do UNIX, e ainda hoje seus grandes benefícios não são totalmente explorados por outros sistemas operacionais, principalmente os sistemas (Microsoft) Windows.

Uma declaração um pouco mais longa e mais convencional da filosofia Unix, mas que diz essencialmente a mesma coisa, seria: projetar programas para fazer apenas uma coisa, mas fazê-la bem, e para trabalhar bem em conjunto com outros programas.

<center>
## [Filosofia Suckless](https://suckless.org/philosophy/)
</center>

Muitos programadores se sentem orgulhosos quando seus códigos chegam a muitas linhas de código, porque eles acreditam que quanto mais linhas de código eles escrevem, mais progresso eles fizeram.
Logo, quanto maior o progresso, mais habilidosos eles ficam.

<center>
![](https://media.calebe.dev.br/images/achou-errado.gif)
</center>

Muitos programadores não se importam com qualidade de código.
Portanto, se eles conseguem fazer algo funcionar e pareça resolver o problema, eles ficam com essa solução.

Se esta linha de pensamento for utilizada em um mesmo projeto em todo o seu ciclo de desenvolvimento,
nós ficaremos com uma quantidade enorme de código, um código  ferrado, e um sistema completamente vulnerável.

Isto se dá pela total falta de clareza conceitual e consistência no durante o processo de desenvolvimento.

<center>
**Complexidade de código é a mãe do software bagunçado, difícil de usar e inconsitente.**
</center>

Simplicidade é o coração da filosofia UNIX.
Quanto menos linhas de código seu código tem, mais habilidoso você se tornou, e menos o seu código é <del>uma merda</del> ruim.

<center>
![Rogerinho do Ingá defende o software livre, a cultura e o ambiental.](https://media.calebe.dev.br/images/meme-2-opa.gif)
</center>

[Filosofia Unix]: http://www.linfo.org/unix_philosophy.html
[Filosofia Suckless]: https://suckless.org/philosophy/
[TL:DR]: https://www.lifewire.com/what-is-tldr-2483633
</main>
