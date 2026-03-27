---
title: 'ESPBoy: Um Gameboy com o ESP32'
description: Apenas mais um Gameboy feito com o ESP32
date: '2019-01-03 01:00:00'
tags:
  - DIY
  - PT_BR
---

# Especificação:

Desenvolver um console portátil utilizando o microcontrolador ESP32 para ser apresentado na [Mostra de Profissões](https://www.up.edu.br/blogs/mostra-de-profissoes/) da Universidade Positivo no dia 1.º de agosto de 2018.

O console deverá conseguir emular jogos da (4.º) geração de consoles portáteis como o [Gameboy](https://pt.wikipedia.org/wiki/Game_Boy) e  [Game Gear](https://pt.wikipedia.org/wiki/Game_Gear) e também consoles da (3.º) geração como  [Master System](https://pt.wikipedia.org/wiki/Master_System) e [NES](https://pt.wikipedia.org/wiki/NES). Sendo que,  console seja capaz de rodar pelo menos 1(um) jogo de qualquer um dos consoles acima durante a apresentação, ou seja, não há a necessidade de implementar todos os emuladores e nem a capacidade de inserir diversos jogos no mesmo dispositivo.

Para o desenvolvimento do ESPBoy, iremos utilizar como base o projeto da empresa [**Hardkernel**](https://www.hardkernel.com/main/main.php) chamado [**ODROID-GO**](https://www.hardkernel.com/main/products/prdt_info.php?g_code=G152875062626). O ODROID-GO é um projeto desenvolvido para a comemoração do 10.º aniversario do ODROID que consiste em um dispositivo capaz de emular jogos dos consoles portáteis de 4.ª geração e consoles de mesa da 3.ª geração e capaz também de reproduzir os sons dos games e ler os jogos armazenados em um cartão SD. Além da emulação, o dispositivo pode ser programado utilizando a IDE do Arduino.

# Software:

## Downloads:

Para baixar os jogos, ou melhor, os melhores jogos das plataformas suportadas pelo **ESPBoy** podemos utilizar os links a seguir:

* [Archieve.org](http://archive.org/download/) - Para realizar o download precisa especificar o arquivo na (URL)
* [Zach-Morris dat_files](https://github.com/zach-morris/plugin.program.iarl/tree/79c9f8842f04bc7e8577eba892593b86cdcc8801/resources/data/dat_files) - Nesse repositório o Zach-Morris fez um compilado dos melhores jogos por plataforma em arquivos **.xml**.

# Hardware:

## Nomenclatura dos Componentes:

### Chaves e Switches:

| Prefixo | Nome |
|:-------:|:------:|
| Key 1 | UP |
| SW 1 | UP |
| Key 3 | DOWN |
| SW3  | DOWN |
| Key 2 | RIGHT |
| SW 2 | RIGHT |
| Key 4 | LEFT |
| SW 4 | LEFT |
| KEY 8 | A |
| SW 5 | A |
| Key 7 | B |
| SW 6 | B |
| KEY 9 | MENU |
| KEY 5 | SELECT |
| KEY 6 | START |
| KEY 10 | VOL + |
| KEY 11 | VOL - |

## Dimensões:

## Projeto:

* [EasyEDA - Calebe94-ESPBoy](https://easyeda.com/Calebe94/ESPBoy)

---

# ESPBoy BOM

| Quantity | Component | Image | Price |
|:---:|:---:|:---:|:---:|
| 1  | **ESP32 DevKit** | <img src="https://user-images.githubusercontent.com/9260214/28747595-19a41090-7471-11e7-826c-42c28ea7ae6e.jpeg" alt="drawing" width="50px"/> | [R$ 42](https://produto.mercadolivre.com.br/MLB-984073556-esp32-modulo-wifi-bluetooth-dual-core-_JM) |
| 1 | **Display 2,4" TFT 320x240** | <img src="https://cdn.instructables.com/F6K/HE7N/HV9FW89M/F6KHE7NHV9FW89M.MEDIUM.jpg" alt="drawing" width="50px"/> | [R$ 55](https://produto.mercadolivre.com.br/MLB-938123113-display-lcd-24-tft-320x240-true-color-com-sdcard-_JM) |
| 1 | **Módulo Amplificador PAM8403** | <img src="http://img.dxcdn.com/productimages/sku_347324_1.jpg" alt="drawing" width="50px"/> | [R$ 5](https://produto.mercadolivre.com.br/MLB-1043419825-modulo-amplificador-som-estereo-2ch-3w3w-pam8403-arduino-_JM) |
| 1 | **Módulo Carregador de Bateria de Lítio TP4056** | <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA92OUxTKaQUOB_EKJUX6VIEH7u0vOoNI_9zUhEZbgWjft_AOv6A" alt="drawing" width="50px"/> | [R$ 5](https://produto.mercadolivre.com.br/MLB-891587521-tp4056-mini-usb-carregador-bateria-litio-1a-5v-lithium-_JM) |
| 1 | **Mini Alto Falante 2W 8 Ohms** | <img src="https://http2.mlstatic.com/D_NQ_NP_364815-MLB25313344771_012017-F.jpg" alt="drawing" width="50px"/> | [R$ 8](https://produto.mercadolivre.com.br/MLB-833938086-mini-alto-falante-28mm-2-wats-rms-8-ohms-eletrnicaarduino-_JM) |
| 1 | **Bateria de Litio >600mAh** | <img src="https://images-na.ssl-images-amazon.com/images/I/51MwOUWv5jL._SY355_.jpg" alt="drawing" width="50px"/> |  [R$ 35](https://produto.mercadolivre.com.br/MLB-1005574636-bateria-37v-400mah-litio-polimero-35038-_JM) |
| 10 | **Push Button** | <img src="https://uploads.filipeflop.com/2017/07/pushbutton3.jpg" alt="drawing" width="50px"/>| [R$3](https://www.filipeflop.com/produto/chave-tactil-push-button-x10-unidades/) |

* **TOTAL:** R$152

-------

# LOGS:

## DIA 1:

Clonei os Seguintes repositórios:

* [ESP32 Game Playes with NES](https://github.com/nickfox-taterli/nes-game-with-sound-esp32);
* [esp32-nesemu](https://github.com/espressif/esp32-nesemu)

Fiz o teste do **ESP32 Game Playes with NES**, porém, nos primeiros testes o ESP32 informava no log que havia pouca RAM disponível, e o ESP32 reiniciava a todo momento. Assistindo ao [vídeo](https://www.youtube.com/watch?v=6oSsaTSyXGw) e vi ser recomendado desativar ao módulo WIFI no **menuconfig**.

Resolvi testar o porte "oficial" realizado pela empresa **espressif** o **esp32-nesemu**. Ao iniciar o programa(make flash monitor), o log não informava nenhum erro. Então resolvi gravar a ROM na memória Flash do ESP32 utilizando o script que veio com o projeto chamado **flashrom.sh** (é... o nome é sujestivo). Para tal, eu tive que editar o script para informar a porta serial e o arquivo **.nes** para gravar no endereço 0x100000 da (FLASH). Ao terminar a gravação eu reiniciei o programa, dando o comando **make monitor**, e voilá! O ESP32 **"piscava"** com a imagem de abertura do Super Mário. E o LOG informava estar tudo correto. Porém, a imagem não ficava fixa no jogo, ele desligava a todo momento como se estivesse reiniciando.

Depois de muito ler e estudar o projeto eu percebi haver a opção de inverter o backlight. E esse foi o grand finalle do 1.º dia de execução do projeto. O resultado foi esse:

![ESPBoy](https://i.imgur.com/Mp6zmX2.jpg)

[ESPBoy-GIF](https://i.imgur.com/GFvoeQj.mp4)

## DIA 2:

Realizei alguns testes com o emulador, gravei ROM's diferentes na memória e modifiquei o script para permitir a passagem da porta serial como argumento.

![ESPBoy-Teste2](https://i.imgur.com/73btcPw.jpg)

Em seguida montei o circuito em uma protoboard para realizar alguns testes com o circuito. Montei o **Joypad** também, e para fazer funcionar eu tive que modificar  as funções **psxcontrollerInit()** e **psxReadInput()** no arquivo **psxcontroller.c**.  Precisei fazer a função **psxcontrollerInit()** retornar um inteiro com os bits com os status dos botões da seguinte forma:

* BIT 0: SELECT;
* BIT 1: 1;
* BIT 2: 1;
* BIT 3: START;
* BIT 4: UP;
* BIT 5: RIGHT;
* BIT 6: DOWN;
* BIT 7: LEFT;
* BIT 8: 1;
* BIT 9: 1;
* BIT 10: 1;
* BIT 11: 1;
* BIT 12: SOFT_RESET;
* BIT 13: A;
* BIT 14: B;
* BIT 15: HARD_RESET;

Eu não encontrei referências para o uso dos bits 1, 2, 8, 9, 10, 11, 12 e 15. Mas a emulação funcionou muito bem apenas com os demais bits.

## DIA 3:

Fiz uma pequena modificação no joypad para fins de liberar algumas GPIOs para inserir botões de volume(aumentar e diminuir) e um botão de menu/reset. A modificação foi simples, ao invés de eu utilizar 1 GPIO para cada botão direcional, eu usei 2 linhas analógicas. Cada linha analógica é responsável por ler dois botões através de um divisor de tensão. O conceito pode ser visualizado na imagem abaixo:

![Reading Keys by Analog lines](https://i.stack.imgur.com/Cq9kc.jpg)

Na sequência inseri um buzzer no terminal D26 do ESP32 para experimentar a saída de áudio. A qualidade de som não é das melhores e falta um amplificador de áudio para a saída do som, e também o buzzer não foi feito para reproduzir tons polifônicos. O resultado pode ser observado no vídeo abaixo.

[ESPBoy - Teste 2](https://youtu.be/8dRg0GTs4dQ)

## DIA 4:

Teste com o VOLUME... sem sucesso.

## DIA 5:

Teste com o Volume, um pouco de sucesso, agora consigo pelo menos alterar de leve o volume, nada considerável. A qualidade do som ainda é um problema. Mas só de conseguir alterar o volume já está ótimo.

## DIA 6:

Alterar os terminais e criar o diagrama esquemático para ser confeccionado a placa de circuito impresso.

Tentatei inserir um circuito para a detecção automática do fone de ouvido e assim desligar o alto-falante.

### Terminais Utilizados no projeto.

* Display

| TFT | ESP32 |
|:---------:|:------:|
| DC | 21 |
| CS | 5 |
| BKL | 4 |
| MOSI | 23 |
| MISO | 19 |
| SCLK | 18 |
| RST | EN |

* SD Card

| SD | ESP32 |
|:---:|:-------:|
| MISO | 19 |
| MOSI | 23 |
| CLK | 18 |
| CS | 22 |

## Dia 6:

Nesse dia foi iniciado o desenho do diagrama esquemático e da placa de circuito impresso. Para isso, foi utilizado a plataforma de desenvolvimento online do [EasyEDA](www.easyeda.com).

## Dia 7:

Para o desenvolvimento da placa de circuito impresso irei considerar as dimensões do GameBoy/GameBoy Color e GameBoy Advance. Como será confeccionado o modelo 3D do gabinete eu pretendo utilizar como base o layout dos GameBoys, e a placa deverá ter as dimensões e o layout do Gameboy. Os layouts e dimensões podem ser encontrados abaixo:

### GameBoy/GameBoy Color

![](https://www.the-blueprints.com/modules/vectordrawings/preview-wm/nintendo_gameboy_classic.jpg)

### GameBoy Advance

![](https://vignette.wikia.nocookie.net/mario/images/7/78/Game_Boy_Advance_-_Transparent_Purple_Model.png/revision/latest?cb=20120513192900)

## Dia 8:

Foi utilizado o software de desenvolvimento de circuitos e placas de circuito impresso online [EasyEDA](https://easyeda.com) para o desenvolvimento do diagrama esquemático  e da placa de circuito impresso do [ESPBoy](https://easyeda.com/Calebe94/ESPBoy). E para a confecção da mesma foi utilizada uma máquina CNC.

![cnc](https://i.imgur.com/iY13WMf.jpg)

O resultado pode ser verificado na imagem abaixo:

![ESPBoy-PCB](https://i.imgur.com/mkLqXRc.jpg)
