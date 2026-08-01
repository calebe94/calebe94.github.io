---
title: "Glossary"
description: "Glossary of technical terms used in blog posts"
date: "2026-07-31 00:45:00"
tags:
  - EN_US
  - glossary
  - reference
---

# Glossary

Technical terms used in blog posts. If you don't know what something means, look it up here.

## Guitar and Audio

### Plexi
Nickname for the Marshall Super Lead, a '60s tube amp that defined the British rock sound

### JCM800
Marshall '80s version, same topology as the Plexi with more gain

### 1960A
Marshall 4x12 cabinet (4 x 12-inch speakers), the rock standard

### Greenback
Celestion G12M-25, a 25W speaker with warm, creamy midrange

### Preamp
Preamplifier — the stage that adds gain and saturation to the guitar signal

### Cab
Cabinet — the speaker enclosure the amp connects to

### Cranked
Amp with volume maxed out, naturally saturating

### Scooped mids
Midrange frequencies attenuated — a "hollow," aggressive sound

### Twang
Bright, dry sound with more treble and less bass

### Tone stack
EQ (equalization) circuit of an amp or pedal

### FMV
Passive 3-knob tone stack format (Bass/Mid/Treble), used by Fender, Marshall, and Vox

### Presence
Treble control via negative feedback from the power amp

### Boost
Gain increase — usually an extra saturation stage for solos

### Channel switch
Switching between two amp channels (or pedals with 2 voicings)

### Downstrokes
Picking technique using only downward strokes — Johnny Ramone's signature

### Mosrite
Japanese guitar brand used by Johnny Ramone (Mosrite Ventures II)

### Bridge pickup
Pickup near the guitar's bridge — brighter, more aggressive sound

## Electronics

### JFET
Junction Field-Effect Transistor — transistor with response similar to a vacuum tube

### 12AX7
Preamplifier tube used in the Plexi (3 gain stages)

### EL34
Power tube used in the Marshall Plexi's power amp

### mu-amp
Configuration of 2 JFETs that emulates the push-pull of a tube power amp

### Push-pull
Final amp stage where 2 tubes work in opposition to generate power

### Op-amp
Operational amplifier — IC that amplifies a signal with controllable gain

### TL072
General-purpose op-amp, low noise, FET input — standard in DIY pedals

### Trimpot
Adjustable potentiometer turned with a screwdriver — used to bias JFETs

### Bias
Adjusting the operating point of a transistor/tube — affects the sound

### PCB
Printed Circuit Board

### Perfboard
Perforated board for circuit assembly (no traces, uses wires)

### Protoboard
Solderless breadboard — for testing circuits before soldering

### Diodo Zenner
Zener diode — a diode that regulates voltage, conducting in reverse at a fixed voltage

### PTH
Plated Through-Hole — components with leads that pass through the PCB

### Tântalo
Tantalum — a type of electrolytic capacitor, smaller and more stable than aluminum

## Pedals and Effects

### True Bypass
Signal passes straight from input to output without going through the circuit when the pedal is off

### 3PDT
Triple Pole Double Throw — footswitch that switches 3 circuits simultaneously

### Footswitch
Pedal button pressed with the foot to turn effects on/off

### TS 1/4"
1/4" (6.35mm) Tip-Sleeve jack — standard guitar connector

### TRS 1/4"
1/4" (6.35mm) Tip-Ring-Sleeve stereo jack — used for balanced or stereo signals

### DC 9V
9-volt power supply — standard for guitar pedals

### LED
Light Emitting Diode — visual status indicator on a pedal

### Stompbox
Another name for a guitar effects pedal

## Digital Audio

### IR (Impulse Response)
Digital "impression" of a cabinet + speaker + microphone response (a .wav file)

### Convolução
Convolution — mathematical operation that applies the IR response to the audio signal

### IR Loader
Device or software that loads and applies IRs in real time

### USB Audio Interface
Device that converts analog audio to digital via USB (and vice versa)

### ADC
Analog-to-Digital Converter — converts an analog signal to digital

### DAC
Digital-to-Analog Converter — converts a digital signal to analog

### Balanced (XLR)
Balanced signal — 2 signals (hot+cold) + ground, rejects noise in long cables

### Unbalanced (RCA/TS)
Unbalanced signal — 1 signal + ground, susceptible to noise in long cables

## Open Source and DIY

### Open hardware
Hardware with public schematics, PCB, and BOM — anyone can build it

### CC BY-NC-SA 3.0
Creative Commons Attribution-NonCommercial-ShareAlike — use/modify/share allowed, selling is not

### AIAB
Amp In A Box — pedal that emulates a complete tube amp

### DIY
Do It Yourself

### BOM
Bill of Materials — component list with prices

### Runoffgroove
Site with open hardware pedal circuits (tubes-to-FETs)

### Zuko
Pedal name — the fire prince from Avatar: The Last Airbender. Fire = saturation, duality = 2 channels

## Stem Separation (Phase 3+)

### Stem separation
Separating an audio mix into individual tracks (vocals, drums, bass, guitar)

### Demucs
AI model from Meta/Facebook for stem separation

### RTF
Real-Time Factor — how long the processor takes to process 1s of audio

### Backing track
Accompaniment track (music without one instrument, e.g., without guitar)

## Mechanical Keyboards

### Switch
Individual mechanism under each key — defines typing feel and sound

### Cherry MX
Most common mechanical switch standard — varieties Red, Brown, Blue, etc

### ALPS
Older type of mechanical switch — tactile and hard to find today

### Keycap
Plastic cap that sits on the switch — the part you touch

### Keycap profile
Keycap shape/height (SA, DSA, XDA, Cherry) — affects ergonomics and appearance

### Plate
Metal plate where switches mount — the keyboard's structure

### Case
Keyboard housing — contains PCB, plate, and switches

### Sandwich case
Case made of layered (acrylic/MDF) sheets bolted together

### Handwired
Keyboard built by soldering switches with wires directly to the microcontroller (no PCB)

### Hotswap
Sockets that allow swapping switches without soldering

### Stabilizer
Mechanism that stabilizes large keys (Space, Enter, Shift)

### Costar
Type of stabilizer with a metal bar and hooks

### Underglow
LEDs on the underside of the keyboard — lighting visible through a translucent case

### Backlight
LEDs under each key — illuminate keycaps from below

### QMK
Quantum Mechanical Keyboard — open source firmware for custom keyboards

### Bootloader
Program that allows flashing firmware to the microcontroller via USB

### HID
Human Interface Device — USB class that makes a PC recognize a keyboard/mouse

### ATMEGA328
8-bit AVR microcontroller from Atmel — the brain of the Arduino Pro Mini

### RP2040
ARM Cortex M0+ microcontroller from Raspberry Pi — 133MHz, 264kB RAM

### AVR
Family of 8-bit microcontrollers from Atmel/Microchip

### USBaspLoader
V-USB bootloader that emulates USB on AVR without native USB hardware

### USBAsp
External programmer for flashing AVR microcontrollers

### Standalone
ATMEGA328 circuit built without the Arduino board (just the chip + crystal)

### I2C
2-wire communication bus (SDA/SCL) between chips

### WS2812B
Addressable RGB LED — each LED has its own address on the strip

### SK6812
Addressable RGB LED, smaller than WS2812B — fits under keys

### 6028R
RGB LED with 3 separate channels (R/G/B) in one package

### swillkb
Web tool that generates keyboard case files from a layout

### keyboard-layout-editor
Web tool for designing keyboard layouts

### 40percent.club
Site with compact keyboard projects (40% of keys)

### Gherkin
40% (3x10) open source keyboard from 40percent.club

### Plaid
48-key open source keyboard with ATMEGA328 and USBaspLoader

## Git and Servers

### Self-hosted
Software hosted on your own server instead of a third-party service

### VPS
Virtual Private Server — a virtual server you rent

### CGI
Common Gateway Interface — runs programs on the web server to generate pages

### cgit
Web interface for git repositories, in C, runs via CGI

### stagit
Static page generator for git repositories

### Merge Request
In GitLab, the equivalent of a GitHub Pull Request

### Pull Request
Proposal to merge one branch into another on GitHub

### Mirror
Automatic copy of a repository between servers

### systemd
Service manager (init) standard on Linux

### journalctl
Command to query systemd logs

### Suckless
Minimalist software philosophy — small programs that do one thing well

## Game Development

### SDL2
Simple DirectMedia Layer 2 — C library for 2D graphics, audio, and input

### Engine
Framework that abstracts the game loop, rendering, physics, etc

### Game loop
Main cycle: input → update → render, repeated every frame

### Godot
Open source game engine, in C++, with GDScript/GDNative

### GDNative
Godot's interface for C/C++ extensions (and other languages)

### Tetrominó
Tetris piece — 4 blocks in an arrangement (I, O, T, S, Z, L, J)

### Dear ImGui
C++ immediate-mode UI library — menus and debug overlays

### WebAssembly
Binary format that runs C/C++ in the browser at near-native speed

### Emscripten
LLVM → WebAssembly compiler — brings C/C++ code to the web

### FOSS
Free and Open Source Software

### Análise estática
Static analysis — analyzes code without running it, finding bugs via patterns (e.g., gcc -fanalyzer)

### Makefile
`make` script that automates project compilation

### Nuklear
C immediate-mode UI library — lightweight, no dependencies

### LVGL
Light and Versatile Graphics Library — graphics for embedded systems

## Embedded Electronics and DIY Audio

### ESP32
Microcontroller with WiFi+Bluetooth, dual-core — the ESPBoy base

### DevKit
Development board with the microcontroller exposed

### GPIO
General Purpose Input/Output — digital pin on a microcontroller

### Menuconfig
ESP-IDF configuration system (ESP32 SDK)

### ROM
Game file (Read-Only Memory) — the emulated cartridge image

### Emulação
Emulation — reproducing a console's hardware in software on another device

### TFT
Thin-Film Transistor — a type of color LCD display

### Backlight
Lighting behind the LCD display — controls brightness

### PAM8403
Class D audio amplifier IC, 3W×2 — used in DIY projects

### TP4056
Lithium battery charger IC — standard in battery-powered projects

### Divisor de tensão
Voltage divider — resistor circuit that divides voltage to read multiple buttons on one pin

### Buzzer
Small piezo speaker — generates tones (not polyphonic)

### SD Card
Memory card for storing ROMs and data

### MOSI/MISO/SCLK/CS
SPI bus pins for displays and SD cards

## Email and Infrastructure

### Yunohost
Self-hosted system for managing web apps, email, and DNS on a VPS

### Postfix
Email server (MTA) for sending and receiving SMTP messages

### Porta 25
Port 25 — standard SMTP port for email sending, frequently blocked by ISPs

### SMTP Relay
Third-party service (SendGrid, etc) that sends email on your behalf when port 25 is blocked

### SendGrid
Twilio's SMTP relay service — enables transactional email sending

### iptables
Linux firewall — controls ports and network traffic

### Firewall
Layer that filters network traffic by port/IP — can block email

## Web and Design

### Keyframe
Point in a CSS animation that defines element state at a specific moment

### @keyframes
CSS rule that describes the keyframe sequence of an animation

### Prompt
Terminal indicator (e.g., `$`) — where you type commands

### Typewriter effect
Animation that simulates typing character by character

### dmenu
Dynamic menu from the suckless project for X11 — basis for many tools

> This glossary is updated as new posts are published. If you think a term is missing, let me know.