---
title: 'ESPBoy: A Gameboy with ESP32'
description: Just another Gameboy made with ESP32
date: '2019-01-03 01:00:00'
tags:
  - EN_US
  - DIY
  - gaming
  - embedded
  - esp32
---

# Specification:

Develop a portable console using the ESP32 microcontroller to be presented at the [Mostra de Profissões](https://www.up.edu.br/blogs/mostra-de-profissoes/) (Career Fair) at Universidade Positivo on August 1st, 2018.

The console should be able to emulate games from the 4th generation of portable consoles like the [Gameboy](https://en.wikipedia.org/wiki/Game_Boy) and [Game Gear](https://en.wikipedia.org/wiki/Game_Gear), as well as 3rd generation consoles like the [Master System](https://en.wikipedia.org/wiki/Master_System) and [NES](https://en.wikipedia.org/wiki/Nintendo_Entertainment_System). The console must be capable of running at least one game from any of the above consoles during the presentation — meaning there's no need to implement all emulators or the ability to load multiple games on the same device.

For the ESPBoy project, I used as a base the project from [**Hardkernel**](https://www.hardkernel.com/main/main.php) called [**ODROID-GO**](https://www.hardkernel.com/main/products/prdt_info.php?g_code=G152875062626). The ODROID-GO is a project developed to celebrate ODROID's 10th anniversary, consisting of a device capable of emulating games from 4th-generation portable consoles and 3rd-generation home consoles, while also reproducing game sounds and reading games stored on an SD card. Besides emulation, the device can be programmed using the Arduino IDE.

# Software:

## Downloads:

To download games — or rather, the best games from the platforms supported by **ESPBoy** — we can use the following links:

* [Archive.org](http://archive.org/download/) - To download, you need to specify the file in the URL
* [Zach-Morris dat_files](https://github.com/zach-morris/plugin.program.iarl/tree/79c9f8842f04bc7e8577eba892593b86cdcc8801/resources/data/dat_files) - In this repository, Zach-Morris compiled the best games per platform into **.xml** files.

# Hardware:

## Component Nomenclature:

### Keys and Switches:

| Prefix | Name |
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

## Dimensions:

## Project:

* [EasyEDA - Calebe94-ESPBoy](https://easyeda.com/Calebe94/ESPBoy)

---

# ESPBoy BOM

| Quantity | Component | Image | Price |
|:---:|:---:|:---:|:---:|
| 1  | **ESP32 DevKit** | <img src="https://user-images.githubusercontent.com/9260214/28747595-19a41090-7471-11e7-826c-42c28ea7ae6e.jpeg" alt="drawing" width="50px"/> | [R$ 42](https://produto.mercadolivre.com.br/MLB-984073556-esp32-modulo-wifi-bluetooth-dual-core-_JM) |
| 1 | **Display 2.4" TFT 320x240** | <img src="https://cdn.instructables.com/F6K/HE7N/HV9FW89M/F6KHE7NHV9FW89M.MEDIUM.jpg" alt="drawing" width="50px"/> | [R$ 55](https://produto.mercadolivre.com.br/MLB-938123113-display-lcd-24-tft-320x240-true-color-com-sdcard-_JM) |
| 1 | **PAM8403 Amplifier Module** | <img src="http://img.dxcdn.com/productimages/sku_347324_1.jpg" alt="drawing" width="50px"/> | [R$ 5](https://produto.mercadolivre.com.br/MLB-1043419825-modulo-amplificador-som-estereo-2ch-3w3w-pam8403-arduino-_JM) |
| 1 | **TP4056 Lithium Battery Charger Module** | <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA92OUxTKaQUOB_EKJUX6VIEH7u0vOoNI_9zUhEZbgWjft_AOv6A" alt="drawing" width="50px"/> | [R$ 5](https://produto.mercadolivre.com.br/MLB-891587521-tp4056-mini-usb-carregador-bateria-litio-1a-5v-lithium-_JM) |
| 1 | **Mini Speaker 2W 8 Ohms** | <img src="https://http2.mlstatic.com/D_NQ_NP_364815-MLB25313344771_012017-F.jpg" alt="drawing" width="50px"/> | [R$ 8](https://produto.mercadolivre.com.br/MLB-833938086-mini-alto-falante-28mm-2-wats-rms-8-ohms-eletrnicaarduino-_JM) |
| 1 | **Lithium Battery >600mAh** | <img src="https://images-na.ssl-images-amazon.com/images/I/51MwOUWv5jL._SY355_.jpg" alt="drawing" width="50px"/> |  [R$ 35](https://produto.mercadolivre.com.br/MLB-1005574636-bateria-37v-400mah-litio-polimero-35038-_JM) |
| 10 | **Push Button** | <img src="https://uploads.filipeflop.com/2017/07/pushbutton3.jpg" alt="drawing" width="50px"/>| [R$3](https://www.filipeflop.com/produto/chave-tactil-push-button-x10-unidades/) |

* **TOTAL:** R$152

-------

# LOGS:

## DAY 1:

I cloned the following repositories:

* [ESP32 Game Playes with NES](https://github.com/nickfox-taterli/nes-game-with-sound-esp32);
* [esp32-nesemu](https://github.com/espressif/esp32-nesemu)

I tested **ESP32 Game Playes with NES**, but on the first attempts the ESP32 reported in the log that there wasn't enough RAM available, and it kept rebooting constantly. After watching a [video](https://www.youtube.com/watch?v=6oSsaTSyXGw), I saw it was recommended to disable the WIFI module in **menuconfig**.

I decided to test the "official" port done by **espressif** — **esp32-nesemu**. When I started the program (make flash monitor), the log showed no errors. So I went ahead and flashed the ROM to the ESP32's Flash memory using a script that came with the project called **flashrom.sh** (yeah... the name is suggestive). To do that, I had to edit the script to specify the serial port and the **.nes** file to flash at address 0x100000 of the FLASH. After flashing, I restarted the program with **make monitor**, and voilà! The ESP32 "blinked" with the Super Mario opening screen. The log said everything was correct. However, the image wasn't stable during the game — it kept turning off as if it were rebooting.

After a lot of reading and studying the project, I noticed there was an option to invert the backlight. And that was the grand finale of day 1 of the project. The result was this:

![ESPBoy](https://i.imgur.com/Mp6zmX2.jpg)

[ESPBoy-GIF](https://i.imgur.com/GFvoeQj.mp4)

## DAY 2:

I ran some tests with the emulator, flashed different ROMs to memory, and modified the script to allow passing the serial port as an argument.

![ESPBoy-Teste2](https://i.imgur.com/73btcPw.jpg)

Then I assembled the circuit on a breadboard to run some tests. I also built the **Joypad**, and to make it work I had to modify the **psxcontrollerInit()** and **psxReadInput()** functions in the **psxcontroller.c** file. I needed **psxcontrollerInit()** to return an integer with bits representing the button status as follows:

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

I couldn't find references for using bits 1, 2, 8, 9, 10, 11, 12, and 15. But the emulation worked great with just the remaining bits.

## DAY 3:

I made a small modification to the joypad to free up some GPIOs for adding volume buttons (up and down) and a menu/reset button. The modification was simple — instead of using 1 GPIO per directional button, I used 2 analog lines. Each analog line is responsible for reading two buttons through a voltage divider. The concept can be visualized in the image below:

![Reading Keys by Analog lines](https://i.stack.imgur.com/Cq9kc.jpg)

Next, I connected a buzzer to the ESP32's D26 pin to experiment with audio output. The sound quality isn't the best — it lacks an audio amplifier for the output, and the buzzer isn't designed to reproduce polyphonic tones. The result can be seen in the video below.

[ESPBoy - Teste 2](https://youtu.be/8dRg0GTs4dQ)

## DAY 4:

Tested the VOLUME... no success.

## DAY 5:

Tested the volume again — a little success this time. I can at least slightly change the volume, nothing considerable. Sound quality is still an issue. But just being able to change the volume at all is already great.

## DAY 6:

Changed the terminals and created the schematic diagram to manufacture the printed circuit board.

I attempted to add a circuit for automatic headphone detection and thus disable the speaker.

### Terminals Used in the Project:

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

## Day 6:

On this day, I started drawing the schematic diagram and the printed circuit board layout. For that, I used the online development platform [EasyEDA](www.easyeda.com).

## Day 7:

For the printed circuit board development, I'll consider the dimensions of the GameBoy/GameBoy Color and GameBoy Advance. Since I'll be 3D-printing the case, I plan to use the GameBoy layout as a base, and the board should match the Gameboy's dimensions and layout. The layouts and dimensions can be found below:

### GameBoy/GameBoy Color

![](https://www.the-blueprints.com/modules/vectordrawings/preview-wm/nintendo_gameboy_classic.jpg)

### GameBoy Advance

![](https://vignette.wikia.nocookie.net/mario/images/7/78/Game_Boy_Advance_-_Transparent_Purple_Model.png/revision/latest?cb=20120513192900)

## Day 8:

I used the online circuit and PCB development software [EasyEDA](https://easyeda.com) to design the schematic diagram and printed circuit board for the [ESPBoy](https://easyeda.com/Calebe94/ESPBoy). A CNC machine was used to manufacture the board.

![cnc](https://i.imgur.com/iY13WMf.jpg)

The result can be seen in the image below:

![ESPBoy-PCB](https://i.imgur.com/mkLqXRc.jpg)