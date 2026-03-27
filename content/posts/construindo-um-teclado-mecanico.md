---
title: Construindo seu próprio teclado mecânico do zero
description: Etapas para criação de um teclado mecânico
date: '2023-02-23 21:00:00'
tags:
  - DIY
  - PT_BR
---

# Construindo seu próprio teclado mecânico do zero

Se você deseja criar seu próprio teclado, há algumas coisas que você precisa fazer.
Primeiro, você precisa decidir que categoria de teclado deseja criar.

Você quer um teclado tradicional ou algo mais customizado?

Você quer um teclado grande ou pequeno. Eu preciso de um teclado com muitas teclas? Ou poucas?

A imagem abaixo te dará uma noção dos tamanhos dos teclados:

<img src="https://thegamingsetup.com/wp-content/uploads/Keyboard-Size-Guide-The-Gaming-Setup-scaled.jpg" width="500px">

Após decidir a categoria de teclado que deseja, você precisa reunir os materiais necessários.

Normalmente se adquire um kit de teclado mecânico em sites como [kprepublic](https://kprepublic.com/) ou [kbdfans].

Para um teclado mais customizado, você poderá realizar a montagem de forma manual, soldando as teclas manualmente com fios. Esses teclados são chamados "handwired". Um exemplo desse teclado pode ser visto na imagem abaixo:

<img src="https://i.imgur.com/ZpV4gEQ.jpg" width="500px">

Ou ainda, se você for um conhecedor de eletrônica e confecção de placas de circuito impresso, você pode desenvolver a sua própria placa utilizando ferramentas como [KiCAD] e [EasyEDA], e encomendar as placas em sites como [JLCPCB] e [PCBWay]. Um exemplo de placa de circuito impresso customizado pode ser visualizado na figura abaixo:

<img src="https://4.bp.blogspot.com/-O_30ecfkOMQ/WqXaydLmR0I/AAAAAAACP34/au2W5c0qi90Asmj_2LTt1vWhuY_oPtOGwCLcBGAs/s640/e.jpg" width="500px">

## Por que construir seu próprio teclado

Existem muitas razões para construir seu próprio teclado. Por um lado, pode ser uma experiência divertida e gratificante. Também é uma ótima maneira de obter exatamente o teclado que você deseja, sem ter que se contentar com algo produzido em massa. E se você gosta de eletrônicos DIY, é uma ótima maneira de aprender como os teclados funcionam. Além disso, você pode economizar muito dinheiro construindo seu próprio teclado em vez de comprar um.

## Lista de materiais necessários

* Microcontrolador (Arduino, por exemplo);
* Matriz de teclas - também chamado "plate";
* Case ([KBD75], por exemplo)
* Switches (Alps ou Cherry MX)
* Keycaps ([DSA], por exemplo)
* Didodos (1n4148, 1n4007 ou qualquer outro diodo de uso geral);
* Cabo USB.

Você também precisará de alguns equipamentos e conhecimentos básicos de soldagem.
Após ter todas as peças, você precisará soldar a matriz e os diodos ao microcontrolador e, em seguida, soldar os switches na matriz.
Depois disso, você pode montar o teclado no gabinete e atualizar o firmware.

## As ferramentas que você precisa para construir seu teclado

Para soldar os componentes na PCB (Placa de Circuito Impresso) você precisará de um ferro de soldas e estanho.

Alguns itens opcionais, mas que tornam o trabalho mais fácil são:

* Fluxo de solda;
* Suporte de PCB de bancada;
* E um multímetro para testar as conexões da PCB e os switches.

# Construção do meu teclado

No próximo post, eu irei descrever como foi o processo de desenvolvimento e montagem do meu teclado mecânico.

[KiCAD]: https://www.kicad.org/
[EasyEDA]: https://easyeda.com/
[JLCPCB]: https://jlcpcb.com/
[PCBWay]: https://www.pcbway.com/
[kbdfans]: https://kbdfans.com/
[KBD75]: https://kbdfans.com/collections/case/products/kbd75-v3-1-aluminum-case
[DSA]: https://kbdfans.com/products/kbdfans-dsa-1-25u-1-5u-2u-dsa?_pos=11&_sid=e1ce20755&_ss=r
