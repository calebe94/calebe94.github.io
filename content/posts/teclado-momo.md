---
title: Teclado MOMO
description: Teclado mecânico com hotswap e RGB
date: '2023-09-23 16:00:00'
tags:
  - DIY
  - PT_BR
  - Mechanical Keyboards
  - keyboards
  - qmk
  - momo
---

# Minha Jornada de Criação do Teclado Mecânico Momo

<center>
<img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/bSA9yGCm7WqrWX2?file=/&fileId=122528&x=3840&y=2160&a=true" width="70%">
</center>

Olá a todos, hoje quero compartilhar com vocês a incrível jornada de desenvolvimento do meu teclado mecânico personalizado, o **Momo**.
Se você já parou para pensar na importância do teclado que utiliza diariamente, está no lugar certo.
Para muitos de nós, o teclado é muito mais do que apenas um periférico; ele é uma extensão da nossa criatividade e produtividade, e cada toque nas teclas pode ser uma experiência única.

Se você é um entusiasta de tecnologia em busca de uma aventura de personalização, a construção de um teclado mecânico é uma jornada fascinante.
Recentemente, compartilhei a história por trás do meu teclado **Appa**, que utiliza teclas Alps, em um [post anterior](./teclado-appa.html).

Agora, vamos mergulhar na criação do teclado mecânico **Momo**, que, embora tenha sido inspirado no "Appa", traz suas próprias características únicas.
Este teclado utiliza switches Cherry MX, possui hotswap e é uma homenagem ao adorável animal de estimação do [Aang](https://avatar.fandom.com/wiki/Aang), o **Momo**.

<center>
<img src="http://1.bp.blogspot.com/-7OYDp5taV_c/VKMycDwVUCI/AAAAAAAAK5E/C1qCFfMhPTE/s1600/momo.jpg" width="70%">
</center>

## A Magia dos Teclados Mecânicos

Os teclados mecânicos são amplamente apreciados por sua durabilidade, sensação tátil e possibilidade de personalização.
Ao contrário dos teclados de membrana convencionais, os teclados mecânicos utilizam switches individuais para cada tecla, proporcionando uma experiência única de digitação.
Eles vêm em uma variedade de tipos de switches, cada um com sua própria sensação e som característicos, permitindo que você escolha o que melhor se adapta ao seu estilo de digitação.

## Começando com um Plano

Assim como qualquer projeto, a construção de um teclado mecânico personalizado começa com um planejamento cuidadoso.
O teclado **Momo** foi concebido para oferecer uma experiência de digitação suave e confortável, combinada com um visual deslumbrante.
Aqui estão alguns passos essenciais no planejamento:

- **Escolha dos Componentes**;
- **Confecção da Placa de Circuito Impresso (PCB)**;
- **Escolha dos Switches**;
- **Escolha das Keycaps**;
- **Customização da Case**.

Vou detalhar cada um desses passos a seguir.

### Escolha dos Componentes

O primeiro passo foi selecionar cuidadosamente os componentes que comporiam o teclado **Momo**.
Minha visão para o **Momo** incluía a adição de luz de fundo (**backlight**) em todas as teclas, bem como **underglow** e a capacidade de realizar trocas rápidas de teclas, o que é possível graças ao recurso **hotswap**.

Para alcançar esse resultado, optei por:

- **Backlight** para todas as teclas;
- **Underglow**;
- **Hotswap**.

Para acomodar essas funcionalidades, escolhi o microcontrolador **RP2040**.
Este microcontrolador ARM Cortex M0+ possui um clock de 133MHz, 264kB de memória SRAM e 4MB de memória Flash (na maioria das placas de desenvolvimento).
Além disso, é amplamente disponível e acessível, tornando-o a escolha perfeita para este projeto.

### Confecção da Placa de Circuito Impresso (PCB)

A PCB é o coração do teclado, onde toda a mágica acontece.
Para economizar tempo, aproveitei o circuito do [Appa](https://raw.githubusercontent.com/Calebe94/appa-pcb/main/res/appa-schematic.jpg) para as teclas e, em seguida, concentrei-me no esquemático do RGB, tanto para o **underglow** quanto para o **backlight**.

Optei por utilizar LEDs *WS2812b* para o **underglow**, devido à facilidade de obtenção no mercado e sua popularidade em fitas LED RGB.
Para o **backlight**, após uma busca minuciosa, encontrei os LEDs *6028R*, que possuem um canal separado para cada cor (vermelho, verde e azul) em um único encapsulamento.
No entanto, depois de algum [feedback da comunidade](https://www.reddit.com/r/olkb/comments/13e6k55/help_could_you_guys_help_me_with_this_backlight/), mudei para os LEDs *SK6812*, que são pequenos o suficiente para serem colocados sob as teclas.

O diagrama esquemático do teclado pode ser acessado <a target="_blank" href="https://cloud.calebe.dev.br/s/p3tmciyXWbSEm4N">aqui</a>

O resultado final da PCB pode ser visto na imagem abaixo:

<center>
<img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/oCFd8w967ZLq8z2?file=/&fileId=121876&x=3840&y=2160&a=true" width="70%">
</center>

Os esquemáticos e arquivos *gerber* para a confecção da placa estão disponíveis no repositório [momo-pcb](https://github.com/Calebe94/momo-pcb).

### Montagem e Soldagem

A montagem do teclado exigiu paciência e habilidades básicas de soldagem.
Embora eu não tenha muitas fotos e vídeos do processo de montagem, criei um vídeo que mostra parte do processo:

<center>
<video width="640" height="360" controls><source src="https://cloud.calebe.dev.br/s/e4Hb2Q3TojMnsGg/download/momo%20keyboard.mp4" type="video/mp4" /></video>
</center>

### Programação

A programação do teclado foi descomplicada, utilizando o [QMK] para gerar o firmware e adaptando o [código do Appa](https://github.com/Calebe94/appa-firmware) para o **RP2040**. Para obter mais detalhes sobre esse processo, confira o [post do Appa](https://blog.calebe.dev.br/posts/teclado-appa.html#bootloader-e-firmware).

## O Toque Final: Personalização

A etapa final é a personalização, onde o teclado se torna verdadeiramente único.

### Case

Para a case do **Momo**, decidi seguir um caminho ousado.
Em vez de uma construção convencional "sanduíche" com camadas de acrílico empilhadas, optei por criar um design "aberto" que apresenta espaçadores para separar as camadas.
Isso resultou em um visual deslumbrante:

<center>
<img src="https://cloud.calebe.dev.br/s/xmHdtZ2KdPNfFL6/download?path=&files=" width="70%">
</center>

A verdadeira beleza de construir seu próprio teclado está na personalização.

Aqui estão algumas maneiras de personalizá-lo ainda mais:

### Keycaps

Para as keycaps, utilizei dois kits de keycaps de perfil SA que eu já tinha em casa, adquiridos na Aliexpress.
Um desses kits era composto por teclas pretas e translúcidas, que coloquei em combinação com keycaps de perfil XDA para teclas especiais como Shift, Enter, Space, Control, Alt, Right Alt, Super, upper layer, bottom layer, Backspace e TAB.
No entanto, depois de perceber que essas keycaps não combinavam bem com o RGB, mudei para um kit de teclas vermelhas que se encaixou perfeitamente:

<center>
<img src="https://cloud.calebe.dev.br/s/ASCAm5MWYEMJTaC/download?path=&files=" width="70%">
</center>

O resultado final ficou incrível:

<center>
<img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/PHCQrPrMKes33CD?file=/&fileId=122489&x=3840&y=2160&a=true" width="70%">
</center>

### Escolha dos Switches

Experimentei diferentes switches ao longo do processo.
Inicialmente, optei pelos switches **Brown** da Outemu, lubrificando-os para obter um som e toque agradáveis.
No entanto, depois de procurar aprimorar o som, mudei para 48 switches **Purple** da Outemu. Mesmo sem lubrificação, esses switches produziram um som incrível.

Posteriormente, experimentei os switches tácteis **V3 Cream Blue** e **V3 Cream Yellow** da Akko e fiquei impressionado com a qualidade.
Adicionei os switches **V3 Cream Yellow** nas teclas de camadas especiais e no Shift, enquanto mantive os **V3 Cream Blue** nas demais teclas.

Estes switches são simplesmente sensacionais e proporcionam uma experiência de digitação incrível.
Infelizmente, não pude gravar o som das teclas, mas compartilho um vídeo demonstrando o som dos switches **V3 Cream Blue** da Akko:

<center>
<iframe width="333" height="591" src="https://www.youtube.com/embed/TVQRDn5qnoQ" title="Akko V3 Cream Blue | $0.19 Tactile King?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</center>

## A Jornada Continua

A construção do teclado mecânico personalizado **Momo** é uma jornada recompensadora e estimulante.
Este é apenas o começo da minha exploração criativa e paixão pela tecnologia. Além de obter um teclado que atende perfeitamente às minhas necessidades, criei uma peça única de hardware que é verdadeiramente minha.

Conforme você mergulha mais fundo no mundo da customização de teclados, descobrirá uma comunidade vibrante de entusiastas que compartilham a mesma paixão.
Portanto, se você está pronto para uma aventura de personalização, siga em frente e comece a planejar seu próprio teclado mecânico. Lembre-se de compartilhar sua jornada com outros entusiastas e inspirar novas criações. Quem sabe, você pode criar o próximo teclado incrível que todos desejam ter!

Se desejar saber mais sobre o processo de criação de teclados mecânicos personalizados, confira também o meu [post anterior](./teclado-appa.html), que oferece insights adicionais.
