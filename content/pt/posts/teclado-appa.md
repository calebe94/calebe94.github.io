---
title: Teclado APPA
description: Teclado mecânico com teclas ALPS inspirado no plaid
date: '2023-02-23 16:00:00'
tags:
  - DIY
  - PT_BR
  - Mechanical Keyboards
  - keyboards
  - qmk
  - appa
---

# Teclado APPA

No penúltimo post do blog eu abordei o assunto de [Como construir seu próprio teclado mecânico](https://blog.calebe.dev.br/posts/construindo-um-teclado-mecanico.html).

Neste post eu irei descrever os processos de construção do meu teclado mecânico, que eu chamei de [Appa].

<center>
<img src="https://github.com/Calebe94/appa-firmware/raw/main/res/appa.jpeg" width="50%">
</center>

## Motivação

Eu estava precisando de um teclado e meus amigos me recomendaram comprar um teclado mecânico.

No meio da conversa, me disseram que existem teclados que era possível modificar o firmware, o que foi o suficiente para me convencer a comprar um teclado desses.

Após algumas pesquisas na internet (mais especificamente no Reddit) encontrei alguns projetos de teclados [open source] e [open hardware]. Um deles foi o [Plaid]. Verificando o projeto eu vi que não era nada complicado para reproduzir, e não só isso, eu já possuía praticamente todos os componentes, como os diodos e o microcontrolador [ATMEGA328]. Me faltavam os personagens principais para a construção de um teclado mecânico, as teclas.

Durante um trabalho que estava fazendo em uma pista de pedágio para a empresa que trabalho, pude notar que os teclados das centrais de arrecadação eram teclados mecânicos. Porém, as teclas não eram parecidas com as famosas [Cherry MX], eram um pouco diferentes.

Depois de bastante pesquisar, encontrei a imagem abaixo, e através dela descobri que a tecla desses teclados de arrecadação se chamam [ALPS].

<center>
<img src="https://external-preview.redd.it/kMI-ptGu-RVFy45uLXK4ev-0Zp5aciLTTI9MKS2Zz7U.gif?format=png8&s=e8f312e3ad0098ccc7e3e99828b782e756eafb41" width="50%">

[Link para a GIF](https://static.wikia.nocookie.net/installgentoo/images/7/7b/Mech_keyboard_switches.gif)
</center>

Pude perceber que se tratava de ótimas teclas, porém, muito difíceis de conseguir hoje em dia, então procurei no [Mercado Livre] por teclados da [Gertec] (nome da marca dos teclados de arrecadação) e encontrei um teclado de 66 teclas por apenas R$66. Resolvi comprar e desenvolver uma placa para utilizar essas teclas.

<center>
<img src="https://www.astemar.com.br/imgsite/produtos/amp-TECLADO_Tec66new__04854_zoom.jpg" width="50%">
</center>

## Escolha do nome do projeto

Eu escolhi esse nome em homenagem ao [Appa](https://avatar.fandom.com/wiki/Appa), personagem do desenho animado [Avatar: The Last Airbender](https://en.wikipedia.org/wiki/Avatar:_The_Last_Airbender) (ou [Avatar: A Lenda de Aang](https://pt.wikipedia.org/wiki/Avatar:_The_Last_Airbender) em português). O Appa e o Momo (outro personagem da série) são os meus animais favoritos de toda a série.

<center>
<img src="https://cdn11.bigcommerce.com/s-5242sis1by/images/stencil/2560w/products/282/1043/Appa__86978.1595902634.png" width="50%">
</center>

Como eu já havia definido que eu utilizaria as teclas [ALPS] no projeto, eu decidi usar o nome **Appa**, por começar com a letra "**A**" E nomearei um próximo projeto de teclado com teclas [Cherry MX] de **Momo**.

## Desenho da Case

Antes de desenvolver a Placa de Circuito Impresso (PCB), eu comecei a pesquisar `cases` baratas para o teclado, porém as cases que eu encontrava, não suportavam as teclas **ALPS**. Após muita pesquisa na internet eu encontrei o site [40percent.club](40percent.club/).
Nesse site eu encontrei uma versão do teclado [Gherkin com uma case feito de madeira.](https://www.40percent.club/2017/02/gherkin-wood.html).

<center>
<img src="https://3.bp.blogspot.com/-mht2Hz181Rs/WKytasCdePI/AAAAAAACBMY/1LQnn2r3iI4nh5dVFtI7mnGHBuMjcAEZQCEw/s640/a2.JPG" width="50%">
</center>

Esse teclado me deu a ideia de fazer a minha case de acrílico, com as peças cortadas a laser. Estas peças seriam sobrepostas, formando um "sanduíche" de peças de acrílico, e seriam atravessados por parafusos que ficariam a mostra. Eu só precisava desenhar estas peças para poder encomendar os recortes, após algumas pesquisas na internet descobri a ferramenta [swillkb], que seu propósito é justamente facilitar a criação de cases para teclados.

Para usar a ferramenta [swillkb], eu precisava de um layout para teclado. Então usei a ferramenta [keyboard-layout-editor.com] para criar um layout **QWERTY** de 48 teclas. Exportei esse layout para `JSON` e utilizei no [swillkb] com outras informações que eu colocarei abaixo:

* Layout

```json
[{a:7},"ESC","Q","W","E","R","T","Y","U","I","O","P","BKP"],
["Tab","A","S","D","F","G","H","J","K","L",";","´"],
["Shift","Z","X","C","V","B","N","M","<",">","/","RET"],
["CTRL","ALT","MOD","LAY","SPC","MOD","MOD","SPC","LEFT","DOWN","UP","RIGHT"]
```

* Switch Type: `ALPS`
* Stabilizer Type: `Alps (Costar fallback)`
* Case Type: `Sandwich`
* USB Cutout:
    * Location: `0`
    * Width: `15`
* Mount Holes: `10`
    * Diameter(mm): `3.5`
    * Edge Width(mm): `10`
* Edge Padding: `On`
    * Top(mm): `10`
    * Right(mm): `10`
    * Bottom(mm): `10`
    * Left(mm): `10`
* Plate Corners: `5`
* Kerf: `0.15`

Após inserir essas informações na plataforma, eu exportei todos os arquivos da case, e todos eles podem ser acessados no repositório [appa-case]. Após isso eu encomendei os cortes em MDF e acrílico transparente em uma empresa perto da minha casa.

O resultado foi o seguinte:

| MDF                                                   | Acrílico                                                   |
|:-----------------------------------------------------:|:----------------------------------------------------------:|
| ![](https://media.calebe.dev.br/images/case-mdf.jpeg) | ![](https://media.calebe.dev.br/images/case-acrilico.jpeg) |

O próximo passo é desenvolver a PCB.

## Desenvolvimento da PCB

Utilizei o projeto [Plaid] como base do meu projeto e utilizei o [KiCAD] 6.0 para desenhar o diagrama esquemático e a PCB.

Para o desenho da PCB eu resolvi utilizar somente componentes que eu possuía em casa, para diminuir os custos do projeto. Os componentes escolhidos foram:

| Componente               | Quantidade | Imagem |
|:------------------------:|:----------:|:------:|
| Diodo 1n4148             | 48         |        |
| Diodo Zenner 3v3         | 2          |        |
| Resistores PTH 1/4 W     | 4          |        |
| Capacitores PTH tântalo  | 3          |        |
| Capacitores PTH Cerâmico | 3          |        |
| [Arduino PRO Mini]*      | 1          |        |
| ATMEGA 328*              | 1          |        |
| Crital PTH 16MHz         | 1          |        |
| USB fêmea do Tipo B*     | 1          |        |

O [Arduino PRO Mini] foi escolhido, pois, eu já possuía vários aqui em casa, e esta placa de desenvolvimento possui o [ATMEGA328] como microcontrolador.

Também adicionei na placa o circuito stantadalone do [ATMEGA328], pois também possuo vários desses microcontroladores aqui em casa.

A escolha da porta USB do tipo B também foi pelo motivo de eu possuir vários desses aqui em casa, e me arrependo amargamente por tomar essa decisão, mas falarei sobre isso logo mais.

Por fim, o esquemático é o seguinte:

<center>
<img src="https://github.com/Calebe94/appa-pcb/raw/main/res/appa-schematic.jpg" width="50%">
</center>

Após terminar de desenhar a placa de circuito impresso, eu exportei os arquivos [gerber](https://github.com/Calebe94/appa-pcb/releases/download/1.0.0/2022-10-27_21-28-gerber.zip), e fiz a encomenda de 5 placas no site [JLCPCB], o qual custou apenas R$114.77, sendo R\$56.05 para a produção das 5 placas e R\$58.72 para o envio, sim, o frete saiu mais caro que a confecção das placas.

## Remoção das teclas

Para montar as PCBs, eu primeiro precisava remover as teclas do teclado de automação da Gertec.

<center>
<img src="https://media.calebe.dev.br/images/gertec66-teclas.jpeg" width="50%">
</center>

Infelizmente eu não tenho fotos do processo de remoção das teclas do *plate* e da *PCB* deste teclado em específico(de 66 teclas), então irei mostrar o processo que fiz logo na sequência com o teclado de 44 teclas.

Mas foi um processo relativamente simples, eu utilizei um ferro de solda, estanho e um sugador para remover as soldas das teclas. E após isso eu utilizei uma pinça para soltar os prendedores das teclas do *plate* e uma chave de fenda para forçar a saída da tecla.

<div
class="CSS_slideshow"
data-show-indicators="true"
data-indicators-position="in"
data-show-buttons="true"
data-show-wrap-buttons="true"
data-animation-style="slide"
style="-moz-transition-duration: 0.3s; -webkit-transition-duration: 0.3s; transition-duration: 0.3s;"
>
<div class="CSS_slideshow_wrapper">
<input type="radio" name="css3slideshow" id="slide1" checked />
<label for="slide1"><video width="640" height="360" controls><source src="https://media.calebe.dev.br/images/IMG_0433.mp4" type="video/mp4" /></video></label>
<input type="radio" name="css3slideshow" id="slide2" />
<label for="slide2">
<img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/bifq6fFtRcwpCLL?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
<input type="radio" name="css3slideshow" id="slide3" />
<label for="slide3"><img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/aQw73rSbdQ4CXEQ?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
<input type="radio" name="css3slideshow" id="slide4" />
<label for="slide4"><img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/f46ft2BR7Jt6GnD?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
<input type="radio" name="css3slideshow" id="slide5" />
<label for="slide5"><img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/gZeELG9w2qxiReW?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
<input type="radio" name="css3slideshow" id="slide6" />
<label for="slide6"><img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/PqwnmSp78gBwzcP?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
<input type="radio" name="css3slideshow" id="slide7" />
<label for="slide7"><img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/NX3HDNZaxeRAmZJ?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
<input type="radio" name="css3slideshow" id="slide8" />
<label for="slide8"><img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/fPbGBz4mbg6DAFP?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
<input type="radio" name="css3slideshow" id="slide9" />
<label for="slide9"><img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/Xiay6J6wHn8Psg5?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
<input type="radio" name="css3slideshow" id="slide10" />
<label for="slide10"><img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/jfWN7Kd3rzbq7FL?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
</div>
</div>

Após esse processo, eu lubrifiquei as teclas.

## Lubrificando as teclas

Para lubrificar as teclas eu assisti a alguns vídeos do [Chyrosran22] no Youtube, mais específicamente o vídeo [Alps restoration guide part 4: how to lube Alps switches](https://www.youtube.com/watch?v=nvDQKUwBy_8). Então visitei o Mercado Livre e comprei um lubrificante para teclados mecânicos chamado "Graxa Branca de Silicone". Também comprei alguns pinceis ultra finos de maquiadoras, pois estavam MUITO mais baratos que os pinceis sugeridos para hobistas de teclados (e fazem um excelente trabalho diga-se de passagem).

<center>
<img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/mZQZt7f5BwmKMMx?file=/&fileId=80796&x=1366&y=768&a=true" width="50%">
</center>

Então repeti o processo descrito no vídeo em todas as 66 teclas do conjunto.

## Montagem da PCB

Após ter recebido as PCBs, dei início ao processo de montagem dos teclados.

<center>
<img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/afKBgENwHd68jj7?file=/&fileId=80734&x=1366&y=768&a=true" width="50%">
</center>

A qualidade de produção de PCB da [JLCPCB] me impressionou. A placa ficou linda na cor preta.

<center>
<img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/ipx5wjmWk8qNCHn?file=/&fileId=80849&x=1366&y=768&a=true" width="50%">
</center>

Como o processo de montagem possui várias etapas, eu criei o vídeo abaixo no meu celular, que sumariza todo o processo de montagem do teclado:

<center>
<blockquote class="imgur-embed-pub" lang="en" data-id="a/fPAnu4k" data-context="false" ><a href="//imgur.com/a/fPAnu4k">Appa Keyboard</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>
</center>

Caso não consiga assistir o vídeo pelo link acima, tente por [esse link](https://media.calebe.dev.br/videos/appa-keyboard.mp4).

## Bootloader e Firmware

Como o microcontrolador [ATMEGA328] não possui periférico de interface USB integrado, nós temos que utilizar o [USBaspLoader], um bootloader para microcontroladores [AVR].

Com o [USBaspLoader], nós podemos utilizar o microcontrodor ATMEGA328 como um dispositivo [HID], e também podemos utilizá-lo para gravar o firmware em si mesmo. Geralmente precisamos de um gravador externo para isso, como o [USBAsp]. Mas com o [USBaspLoader] isso não é mais preciso.

Então eu tentei compilar o projeto [hsgw/USBaspLoader](https://github.com/hsgw/USBaspLoader/tree/plaid), porém, não obtive sucesso. Após algumas pesquisas eu encontrei um post na internet chamado [How to burn the Plaid keyboard bootloader using Arduino Nano]. Onde o autor da dicas de como gravar o bootloader, mas também posta o link para o [arquivo .hex](https://github.com/hsgw/USBaspLoader/blob/plaid/firmware/main.hex), que convenientemente está no repositório do **hsgw** (*arquivo esse que eu deixei passar desapercebido*).

Então gravei o `bootloader` no meu Arduino Pro Mini com um [USBAsp] e aparentemente estava tudo funcionando (*foi o que eu pensei*).

### Testes

Logo após a gravação do `bootloader` eu comecei os testes para verificar se o teclado estava funcionando. Eu pluguei o teclado no meu computador e não funcionou, então rodei o comando `dmesg -w` e o seguinte log me foi apresentado:

```sh
[   80.326497] usb 1-3: Product: Plaid
[   80.326503] usb 1-3: Manufacturer: Dm9Records
[   80.359555] input: Dm9Records Plaid as /devices/pci0000:00/0000:00:14.0/usb1/1-3/1-3:1.0/0003:16C0:27DB.0006/input/input29
[   80.418493] hid-generic 0003:16C0:27DB.0006: input,hidraw0: USB HID v1.01 Keyboard [Dm9Records Plaid] on usb-0000:00:14.0-3/input0
[   80.421175] usbhid 1-3:1.1: can't add hid device: -71
[   80.421181] usbhid: probe of 1-3:1.1 failed with error -71
[   81.738940] usb 1-3: reset low-speed USB device number 8 using xhci_hcd
[   83.450544] usb 1-3: reset low-speed USB device number 8 using xhci_hcd
[   85.174040] usb 1-3: reset low-speed USB device number 8 using xhci_hcd
[   86.893789] usb 1-3: reset low-speed USB device number 8 using xhci_hcd
[   88.665499] usb 1-3: reset low-speed USB device number 8 using xhci_hcd
[   90.397112] usb 1-3: reset low-speed USB device number 8 using xhci_hcd
```

Pesquisei sobre esse erro na internet, mas não obtive sucesso. Visitei o servidor [QMK no Discord], e alguém no servidor mencionou para verificar se o problema não poderia estar nos diodos zenner.

Como eu montei o teclado com os componentes que eu já tinha a minha disposição para diminuir os custos eu utilizei um diodo zenner de 3.6V de 1W de potência, após a trocar o diodo zenner de 1w por um diodo zenner de 0,5w o teclado passou a funcionar perfeitamente.

## RGB

Como a case do teclado é feita de acrílico translúcido, eu resolvi instalar uma fita de leds [WS2812B] na parte inferior da PCB, para dar um brilho na camada inferior do teclado, o chamado `underglow`. Então comprei 1 metro de fita led [WS2812B], que tem 30 leds.

Para ativar os leds, eu utilizei 1 dos 2 terminais I2C do ATMEGA328 que eu deixei exposto na PCB caso no futuro eu quisesse adicionar um display, ou até outro microcontrolador na build.

Então comecei os trabalhos:

<div
class="CSS_slideshow"
data-show-indicators="true"
data-indicators-position="in"
data-show-buttons="true"
data-show-wrap-buttons="true"
data-animation-style="slide"
style="-moz-transition-duration: 0.3s; -webkit-transition-duration: 0.3s; transition-duration: 0.3s;"
>
<div class="CSS_slideshow_wrapper">
<input type="radio" name="css3slideshow1" id="slide11" checked />
<label for="slide11"><img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/jzFN9EW9bsTPaqD?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
<input type="radio" name="css3slideshow1" id="slide12" />
<label for="slide12">
<img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/5Yj4FDKG2PjLbMx?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
<input type="radio" name="css3slideshow1" id="slide13" />
<label for="slide13"><img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/KwgKM2neW2tNnEj?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
<input type="radio" name="css3slideshow1" id="slide14" />
<label for="slide14"><img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/9AGYdNgpzZW9a9Q?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
<input type="radio" name="css3slideshow1" id="slide15" />
<label for="slide15"><img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/RDpdyPSxQY7PSk4?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
<input type="radio" name="css3slideshow1" id="slide16" />
<label for="slide16"><img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/wzZLr5bftKoGcBX?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
<input type="radio" name="css3slideshow1" id="slide17" />
<label for="slide17"><img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/tXZzERTB6ganDi2?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
<input type="radio" name="css3slideshow1" id="slide18" />
<label for="slide18"><img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/P43ERMKBxqYdNag?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
<input type="radio" name="css3slideshow1" id="slide19" />
<label for="slide19"><img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/aZCcywWT5NQMy2z?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
<input type="radio" name="css3slideshow1" id="slide20" />
<label for="slide20"><img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/tK7LCNyweLia5Jy?file=/&fileId=80796&x=1366&y=768&a=true" /></label>
</div>
</div>

## Firmware

O firmware do teclado é desenvolvido utilizando o [qmk] e o código pode ser encontrado no repositório [appa-firmware].

# Considerações finais

Desenvolver o meu primeiro teclado foi com certeza uma agradável aventura. Pude fazer o que eu mais gosto, criar dispositivos eletrônicos. Agora eu tenho um teclado que eu posso chamar de meu, pois eu que o criei.

Eu gostaria de agradecer ao [Takuya Urakawa](https://github.com/hsgw) por criar o projeto [plaid], projeto esse que eu utilizei como inspiração.

O [Appa] é um projeto em desenvolvimento, que provavelmente sofrerá alterações no futuro, a primeira delas será trocar o conector USB B por um USB C, pois graças ao USB B o teclado ficou absurdamente alto (cerca de 3cm). E também irei substituir as teclas ALPS por Cherry MX, pois infelizmente é muito difícil encontrar as teclas ALPS para comprar e praticamente impossível encontrar keycaps para estas teclas.

Vale relembrar que os repositórios do projeto são:

* [appa-pcb](https://github.com/Calebe94/appa-pcb);
* [appa-case](https://github.com/Calebe94/appa-case);
* [appa-firmware](https://github.com/Calebe94/appa-firmware).

Por fim, deixo aqui um vídeo sumarizando a montagem do [Appa]:

<center>
<video width="640" height="360" controls><source src="https://cloud.calebe.dev.br/s/nZ35dMQYYjKWWj7/download/Appa%20Keyboard.mp4" type="video/mp4" /></video>
</center>

[Appa]: https://github.com/Calebe94/appa-firmware
[swillkb]: http://builder.swillkb.com/
[appa-case]: https://github.com/Calebe94/appa-case
[Chyrosran22]: https://www.youtube.com/@Chyrosran22
[How to burn the Plaid keyboard bootloader using Arduino Nano]: https://www.algorist.co.uk/post/how-to-burn-the-plaid-keyboard-bootloader-using-arduino-nano/
[qmk]: https://qmk.fm/#/
[appa-firmware]: https://github.com/Calebe94/appa-firmware
[Alps]: https://keyboardsexpert.com/what-are-alps-switches/
[JLCPCB]: https://jlcpcb.com/
[Cherry MX]: https://switchandclick.com/cherry-mx-guide/
[open source]: https://opensource.com/resources/what-open-source
[open hardware]: https://opensource.com/resources/what-open-hardware
[atmega328]: https://www.microchip.com/en-us/product/ATmega328
[hid]: https://en.wikipedia.org/wiki/Human_interface_device
[Plaid]: https://github.com/hsgw/plaid
[keyboard-layout-editor.com]: https://keyboard-layout-editor.com
[KiCAD]: https://www.kicad.org/
[Arduino PRO Mini]: https://docs.arduino.cc/retired/boards/arduino-pro-mini
[USBaspLoader]: https://obdev.at/products/vusb/usbasploader.html
[avr]: https://www.microchip.com/en-us/products/microcontrollers-and-microprocessors/8-bit-mcus/avr-mcus
[usbasp]: https://www.fischl.de/usbasp/
[WS2812B]: https://www.digikey.com/en/datasheets/parallaxinc/parallax-inc-28085-ws2812b-rgb-led-datasheet
[Gertec]: https://www.gertec.com.br/
[Mercado Livre]: https://www.mercadolivre.com.br/
[QMK no Discord]: https://discord.com/invite/Uq7gcHh
