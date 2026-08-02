---
title: "Glossário"
description: "Glossary of technical terms used in the blog posts"
date: "2026-07-31 00:45:00"
tags:
  - EN_US
  - glossario
  - reference
---

# Glossary

Technical terms used in the blog posts. If you don't know what something means, look for it here.

## General AI and LLMs

### LLM
Large Language Model — language model trained on a large scale to understand and generate text

### MoE
Mixture of Experts — architecture that activates only a fraction of parameters (experts) per token, keeping inference fast

### GGUF
Optimized file format for language model inference in llama.cpp (successor to GGML)

### Reasoning Model
Model trained to generate explicit reasoning in text (thinking process) before the final answer

### Thinking Tokens
Tokens generated internally by reasoning models before outputting the user-visible response

### Tool Calling
The model's ability to invoke external tools (run scripts, search the web, read files) in a structured way

### Metal
Low-level graphics and GPU compute API by Apple for macOS and iOS

### KV Cache
Mechanism that stores Key/Value vectors from previous tokens to speed up context processing

### BYOK
Bring Your Own Key — usage model where you provide your own API key to pay for direct consumption

### OpenRouter
Aggregator service that unifies access and routing to dozens of LLM providers


## Systems and macOS

### daemon
Background process that runs continuously on the OS without a direct graphical interface

### launchd
Native service and daemon manager for macOS (equivalent to systemd on Linux)

### plist
Property List — XML or binary file format used by macOS for service and app configurations


## Guitar and audio

### Plexi
Nickname for the Marshall Super Lead, the '60s tube amp that defined the British rock sound

### JCM800
The '80s version of Marshall, same topology as the Plexi with more gain

### 1960A
Marshall 4x12 cabinet (4 12-inch speakers), the rock standard

### Greenback
Celestion G12M-25, 25W speaker with a warm and creamy midrange

### Preamp
Preamplifier — stage that provides gain and saturation to the guitar signal

### Cab
Cabinet — speaker box where the amp is connected

### Cranked
Amp with the volume at max, saturating naturally

### Scooped mids
Attenuated mid frequencies — "hollow" and aggressive sound

### Twang
Bright and dry sound, with more treble and less bass

### Tone stack
EQ (equalization) circuit of an amp or pedal

### FMV
Passive 3-knob tone stack format (Bass/Mid/Treble) used by Fender, Marshall, and Vox

### Presence
Treble control via negative feedback from the power amp

### Boost
Gain increase — usually an extra saturation stage for solos

### Channel switch
Toggle between two amp channels (or pedals with 2 voices)

### Downstrokes
Picking technique using only downward strokes — Johnny Ramone's signature

### Mosrite
Japanese guitar brand used by Johnny Ramone (Mosrite Ventures II)

### Bridge pickup
Pickup (microphone) closest to the guitar's bridge — more aggressive and brighter sound


## Electronics

### JFET
Junction Field-Effect Transistor — transistor with a response similar to a vacuum tube

### 12AX7
Preamp tube used in the Plexi (3 gain stages)

### EL34
Power tube used in the Marshall Plexi power amp

### mu-amp
2-JFET configuration that emulates the push-pull of a tube power amp

### Push-pull
Final amp stage where 2 tubes work in opposition to generate power

### Op-amp
Operational amplifier — IC that amplifies a signal with controllable gain

### TL072
General-purpose op-amp, low noise, FET input — standard in DIY pedals

### Trimpot
Adjustable potentiometer with a screwdriver — used to bias JFETs

### Bias
Adjustment of the operating point of a transistor/tube — affects the sound

### PCB
Printed Circuit Board

### Perfboard
Perforated board for circuit assembly (no traces, uses wires)

### Protoboard
Solderless breadboard — for testing circuits before soldering

### Diodo Zenner
Zener diode, a diode that regulates voltage — conducts in the reverse direction at a fixed voltage

### PTH
Plated Through-Hole — components with legs that go through the PCB

### Tântalo
Tantalum electrolytic capacitor type — smaller and more stable than aluminum


## Pedals and effects

### True Bypass
Signal goes straight from input to output without passing through the circuit when the pedal is off

### 3PDT
Triple Pole Double Throw — footswitch that toggles 3 circuits simultaneously

### Footswitch
Pedal button pressed with the foot to turn effects on/off

### TS 1/4"
6.35mm TS (Tip-Sleeve) jack, standard guitar connector

### TRS 1/4"
6.35mm stereo jack (Tip-Ring-Sleeve) — used for balanced or stereo signals

### DC 9V
9-volt power supply — standard for guitar pedals

### LED
Light Emitting Diode — visual status indicator for the pedal

### Stompbox
Another name for a guitar effects pedal


## Digital audio

### IR (Impulse Response)
"Fingerprint" of the response of a cabinet + speaker + microphone (.wav file)

### Convolução
Mathematical operation that applies the IR response to the audio signal

### IR Loader
Device or software that loads and applies IRs in real time

### USB Audio Interface
Device that converts analog audio to digital via USB (and vice versa)

### ADC
Analog-to-Digital Converter — converts analog signal to digital

### DAC
Digital-to-Analog Converter — converts digital signal to analog

### Balanced (XLR)
Balanced signal — 2 signals (hot+cold) + ground, rejects noise in long cables

### Unbalanced (RCA/TS)
Unbalanced signal — 1 signal + ground, susceptible to noise in long cables


## Open source and DIY

### Open hardware
Hardware with public schematics, PCB, and BOM — anyone can build it

### CC BY-NC-SA 3.0
Creative Commons Attribution-NonCommercial-ShareAlike — can use/modify/share, cannot sell

### AIAB
Amp In A Box — pedal that emulates a complete tube amp

### DIY
Do It Yourself

### BOM
Bill of Materials — list of components with prices

### Runoffgroove
Site with open hardware pedal circuits (tubes-to-FETs)

### Zuko
Pedal name — the fire prince from Avatar: The Last Airbender. Fire = saturation, duality = 2 channels


## Stem separation (Phase 3+)

### Stem separation
Separating an audio mix into individual tracks (vocal, drums, bass, guitar)

### Demucs
Meta/Facebook AI model for stem separation

### RTF
Real-Time Factor — how much time the processor takes to process 1s of audio

### Backing track
Accompaniment track (music without an instrument, e.g., without guitar)


## Mechanical keyboards

### Switch
Individual mechanism under each key — defines typing feel and sound

### Cherry MX
Most common mechanical switch standard — Red, Brown, Blue varieties, etc.

### ALPS
Older mechanical switch type — tactile and hard to find today

### Keycap
Plastic cover that goes over the switch — the part you touch

### Keycap profile
Shape/height of the keycaps (SA, DSA, XDA, Cherry) — affects ergonomics and visuals

### Plate
Metal plate where the switches snap in — keyboard structure

### Case
Keyboard enclosure — houses PCB, plate, and switches

### Sandwich case
Case made of overlapping layers (acrylic/MDF) screwed together

### Handwired
Keyboard built by soldering switches with wires straight to the microcontroller (no PCB)

### Hotswap
Sockets that allow swapping switches without soldering

### Stabilizer
Mechanism that stabilizes large keys (Space, Enter, Shift)

### Costar
Stabilizer type with a metal wire and hooks

### Underglow
LEDs on the bottom of the keyboard — lighting that shines through a translucent case

### Backlight
LEDs under each key — illuminate the keycaps from below

### QMK
Quantum Mechanical Keyboard — open source firmware for custom keyboards

### Bootloader
Program that allows flashing firmware to the microcontroller via USB

### HID
Human Interface Device — USB class that makes the PC recognize the keyboard/mouse

### ATMEGA328
Atmel 8-bit AVR microcontroller — brain of the Arduino Pro Mini

### RP2040
Raspberry Pi ARM Cortex M0+ microcontroller — 133MHz, 264kB RAM

### AVR
Atmel/Microchip 8-bit microcontroller family

### USBaspLoader
V-USB bootloader that emulates USB on AVR without a native USB peripheral

### USBAsp
External programmer for flashing AVR microcontrollers

### Standalone
ATMEGA328 circuit built without the Arduino board (just the chip + crystal)

### I2C
2-wire communication bus (SDA/SCL) between chips

### WS2812B
Addressable RGB LED — each LED has its own address on the strip

### SK6812
Addressable RGB LED smaller than the WS2812B — fits under the keys

### 6028R
RGB LED with 3 separate channels (R/G/B) in one package

### swillkb
Web tool that generates keyboard case files from a layout

### keyboard-layout-editor
Web tool for designing keyboard layouts

### 40percent.club
Site with compact keyboard projects (40% of the keys)

### Gherkin
40% keyboard (3x10) open source from 40percent.club

### Plaid
48-key open source keyboard with ATMEGA328 and USBaspLoader


## Git and servers

### Self-hosted
Software hosted on your own server instead of a third-party service

### VPS
Virtual Private Server — virtual server you rent

### CGI
Common Gateway Interface — runs programs on the web server to generate pages

### cgit
Web interface for git repositories, in C, runs via CGI

### stagit
Static page generator for git repositories

### Merge Request
In Gitlab, equivalent to Github's Pull Request

### Pull Request
Proposal to merge a branch into another on Github

### Mirror
Automatic copy of a repository between servers

### systemd
Default service manager (init) in Linux

### journalctl
Command that queries systemd logs

### Suckless
Minimalist software philosophy — small programs that do one thing well


## Game development

### SDL2
Simple DirectMedia Layer 2 — C library for 2D graphics, audio, and input

### Engine
Framework that abstracts game loop, rendering, physics, etc.

### Game loop
Main cycle: input → update → render, repeated every frame

### Godot
Open source game engine, in C++, with GDScript/GDNative

### GDNative
Godot's interface for C/C++ (and other languages) extensions

### Tetrominó
Tetris piece — 4 blocks in an arrangement (I, O, T, S, Z, L, J)

### Dear ImGui
Immediate mode C++ UI library — menus and debug overlays

### WebAssembly
Binary format that runs C/C++ in the browser at near-native speed

### Emscripten
LLVM → WebAssembly compiler — brings C/C++ code to the web

### FOSS
Free and Open Source Software

### Análise estática
Static analysis. Analyzes code without running it — finds bugs via patterns (e.g., gcc -fanalyzer)

### Makefile
`make` script that automates project compilation

### Nuklear
Immediate mode C UI library — lightweight and dependency-free

### LVGL
Light and Versatile Graphics Library — graphics for embedded systems


## Embedded electronics and DIY audio

### ESP32
Microcontroller with dual-core WiFi+Bluetooth — ESPBoy base

### DevKit
Development board with the exposed microcontroller

### GPIO
General Purpose Input/Output — digital pin of the microcontroller

### Menuconfig
Configuration system of ESP-IDF (ESP32 SDK)

### ROM
Game file (Read-Only Memory) — the emulated cartridge image

### Emulação
Emulation. Reproducing the hardware of a console in software on another device

### TFT
Thin-Film Transistor — type of color LCD display

### Backlight
Lighting behind the LCD display — controls brightness

### PAM8403
3W×2 Class D audio amplifier IC — used in DIY projects

### TP4056
Lithium battery charger IC — standard in battery projects

### Divisor de tensão
Voltage divider. Resistor circuit that divides the voltage to read multiple buttons on one pin

### Buzzer
Small piezo speaker — generates tones (not polyphonic)

### SD Card
Memory card to store ROMs and data

### MOSI/MISO/SCLK/CS
Pins of the SPI bus for displays and SD cards


## Email and infrastructure

### Yunohost
Self-hosted system for managing web apps, email, and DNS on a VPS

### Postfix
Email server (MTA) for sending and receiving SMTP messages

### Porta 25
Port 25. Standard SMTP port for sending email — often blocked by providers

### SMTP Relay
Third-party service (SendGrid, etc) that sends email for you when port 25 is blocked

### SendGrid
Twilio's SMTP relay service — allows sending transactional email

### iptables
Linux firewall — controls ports and network traffic

### Firewall
Layer that filters network traffic by port/IP — can block email


## Web and design

### Keyframe
Point in a CSS animation that defines the state of the elements at an instant

### @keyframes
CSS rule that describes the sequence of keyframes of an animation

### Prompt
Terminal indicator (e.g., `$`) — where you type commands

### Typewriter effect
Animation that simulates typing character by character

### dmenu
Dynamic menu from the suckless project for X11 — base for several tools

> This glossary is updated as new posts are published. If you think a term is missing, let me know.

---

> This glossary is updated as new posts are published. If you think a term is missing, let me know.\n## Travel and Tourism\n\n### Cavezalle\nLuggage brand.\n\n### Aeroparque\nAeroparque Jorge Newbery (AEP) — airport located inside the city of Buenos Aires.\n\n### San Telmo\nHistoric neighborhood in Buenos Aires, famous for its Sunday antique markets.\n\n### La Boca\nTraditional neighborhood in Buenos Aires, known for the La Bombonera stadium and Caminito.\n\n### La Bombonera\nStadium of Club Atlético Boca Juniors in Buenos Aires.\n\n### Riquelme\nJuan Román Riquelme — idol and current president of Boca Juniors.\n\n### Parque Centenario\nCircular park in the geographical center of Buenos Aires, famous for its book and craft market.\n\n### MEP\nMercado Electrónico de Pagos — exchange rate in Argentina used by international cards (close to the Blue Dollar), essential for tourists.\n\n## Health and Neurodivergence\n\n### TDAH\nAttention Deficit Hyperactivity Disorder (ADHD).\n\n### TAG\nGeneralized Anxiety Disorder (GAD).\n\n### ANC\nActive Noise Cancellation — headphone technology that cancels external noise by emitting inverse sound waves.
