---
title: "Glossário"
description: "Glossário de termos técnicos usados nos posts do blog"
date: "2026-07-31 00:45:00"
tags:
  - PT_BR
  - glossario
  - reference
---

# Glossário

Termos técnicos usados nos posts do blog. Se você não sabe o que algo significa, procure aqui.


## Inteligência Artificial e LLMs

### LLM
Large Language Model — modelo de linguagem treinado em grande escala para entender e gerar texto

### MoE
Mixture of Experts — arquitetura que ativa apenas uma fração dos parâmetros (especialistas) por token, mantendo inferência rápida

### GGUF
Formato de arquivo otimizado para inferência de modelos de linguagem no llama.cpp (sucessor do GGML)

### Reasoning Model
Modelo treinado para gerar raciocínio explícito em texto (thinking process) antes da resposta final

### Thinking Tokens
Tokens gerados internamente por modelos de raciocínio antes de emitir a resposta visível ao usuário

### Tool Calling
Capacidade do modelo de invocar ferramentas externas (executar scripts, buscar na web, ler arquivos) de forma estruturada

### Metal
API de aceleração gráfica de baixo nível e computação de GPU da Apple para macOS e iOS

### KV Cache
Mecanismo que armazena os vetores Key/Value de tokens anteriores para acelerar o processamento do contexto

### BYOK
Bring Your Own Key — modelo de uso onde você fornece sua própria chave de API para pagar pelo consumo direto

### OpenRouter
Serviço agregador que unifica o acesso e o roteamento para dezenas de provedores de LLMs


## Sistemas e macOS

### daemon
Processo de segundo plano que roda continuamente no sistema operacional sem interface gráfica direta

### launchd
Gerenciador de serviços e daemons nativo do macOS (equivalente ao systemd no Linux)

### plist
Property List — formato de arquivo XML ou binário usado pelo macOS para configurações de serviços e apps


## Guitarra e áudio

### Plexi
Apelido do Marshall Super Lead, amp valvulado dos anos 60 que definiu o som do rock britânico

### JCM800
Versão do Marshall dos anos 80, mesma topologia do Plexi com mais ganho

### 1960A
Gabinete 4x12 da Marshall (4 falantes de 12 polegadas), padrão do rock

### Greenback
Celestion G12M-25, falante de 25W com midrange quente e cremoso

### Preamp
Pré-amplificador — estágio que dá ganho e saturação ao sinal da guitarra

### Cab
Gabinete (cabinet) — caixa com falantes onde o amp se conecta

### Cranked
Amp com volume no máximo, saturando naturalmente

### Scooped mids
Frequências médias atenuadas — som "oco" e agressivo

### Twang
Som brilhante e seco, com mais agudos e menos grave

### Tone stack
Circuito de EQ (equalização) de um amp ou pedal

### FMV
Formato de tone stack passivo de 3 knobs (Bass/Mid/Treble), usado pela Fender, Marshall e Vox

### Presence
Controle de agudos via feedback negativo do power amp

### Boost
Aumento de ganho — geralmente um estágio extra de saturação para solos

### Channel switch
Alternar entre dois canais de um amp (ou pedais com 2 vozes)

### Downstrokes
Técnica de palhetada usando apenas batidas para baixo — assinatura do Johnny Ramone

### Mosrite
Marca de guitarras japonesas usada por Johnny Ramone (Mosrite Ventures II)

### Bridge pickup
Captador (microfone) próximo à ponte da guitarra — som mais agressivo e brilhante


## Eletrônica

### JFET
Junction Field-Effect Transistor — transistor com resposta parecida com a de uma válvula

### 12AX7
Válvula de pré-amplificação usada no Plexi (3 estágios de ganho)

### EL34
Válvula de potência usada no power amp do Marshall Plexi

### mu-amp
Configuração de 2 JFETs que emula o push-pull do power amp valvulado

### Push-pull
Estágio final do amp onde 2 válvulas trabalham em oposição pra gerar potência

### Op-amp
Amplificador operacional — IC que amplifica sinal com ganho controlável

### TL072
Op-amp de uso geral, baixo ruído, FET input — padrão em pedais DIY

### Trimpot
Potenciômetro ajustável com chave de fenda — usado pra biasar JFETs

### Bias
Ajuste do ponto de operação de um transistor/válvula — afeta o som

### PCB
Printed Circuit Board — placa de circuito impresso

### Perfboard
Placa perfurada para montagem de circuitos (sem trilhas, usa fios)

### Protoboard
Placa de ensaios sem solda — para testar circuitos antes de soldar

### Diodo Zenner
Diodo que regula tensão — conduz no sentido reverso em uma tensão fixa

### PTH
Plated Through-Hole — componentes com pernas que atravessam a PCB

### Tântalo
Tipo de capacitor eletrolítico — menor e mais estável que o de alumínio


## Pedais e efeitos

### True Bypass
Sinal passa direto do input pro output sem passar pelo circuito quando o pedal está off

### 3PDT
Triple Pole Double Throw — footswitch que comuta 3 circuitos simultaneamente

### Footswitch
Botão de pedal que se aperta com o pé para ligar/desligar efeitos

### TS 1/4"
Jack P2 de 6.35mm (Tip-Sleeve), conector padrão de guitarra

### TRS 1/4"
Jack estéreo de 6.35mm (Tip-Ring-Sleeve) — usado para sinais balanceados ou stereo

### DC 9V
Fonte de 9 volts — padrão para pedais de guitarra

### LED
Light Emitting Diode — indicador visual de status do pedal

### Stompbox
Outro nome para pedal de efeito de guitarra


## Áudio digital

### IR (Impulse Response)
"Impressão digital" da resposta de um gabinete + falante + microfone (arquivo .wav)

### Convolução
Operação matemática que aplica a resposta do IR ao sinal de áudio

### IR Loader
Dispositivo ou software que carrega e aplica IRs em tempo real

### USB Audio Interface
Dispositivo que converte áudio analógico em digital via USB (e vice-versa)

### ADC
Analog-to-Digital Converter — converte sinal analógico em digital

### DAC
Digital-to-Analog Converter — converte sinal digital em analógico

### Balanced (XLR)
Sinal balanceado — 2 sinais (hot+cold) + terra, rejeita ruído em cabos longos

### Unbalanced (RCA/TS)
Sinal desbalanceado — 1 sinal + terra, suscetível a ruído em cabos longos


## Open source e DIY

### Open hardware
Hardware com esquema, PCB e BOM públicos — qualquer um pode construir

### CC BY-NC-SA 3.0
Creative Commons Attribution-NonCommercial-ShareAlike — pode usar/modificar/compartilhar, não pode vender

### AIAB
Amp In A Box — pedal que emula um amp valvulado completo

### DIY
Do It Yourself — faça você mesmo

### BOM
Bill of Materials — lista de componentes com preços

### Runoffgroove
Site com circuitos de pedais open hardware (tubes-to-FETs)

### Zuko
Nome do pedal — príncipe do fogo de Avatar: The Last Airbender. Fogo = saturação, dualidade = 2 canais


## Stem separation (Fase 3+)

### Stem separation
Separar um mix de áudio em faixas individuais (vocal, bateria, baixo, guitarra)

### Demucs
Modelo de AI da Meta/Facebook para stem separation

### RTF
Real-Time Factor — quanto tempo o processador leva para processar 1s de áudio

### Backing track
Trilha de acompanhamento (música sem um instrumento, ex: sem guitarra)


## Teclados mecânicos

### Switch
Mecanismo individual sob cada tecla — define sensação e som da digitação

### Cherry MX
Padrão de switches mecânicos mais comum — variedades Red, Brown, Blue, etc

### ALPS
Tipo de switch mecânico mais antigo — tátil e difícil de encontrar hoje

### Keycap
Capa plástica que vai sobre o switch — a parte que você toca

### Keycap profile
Formato/altura das keycaps (SA, DSA, XDA, Cherry) — afeta ergonomia e visual

### Plate
Placa metálica onde os switches se encaixam — estrutura do teclado

### Case
Gabinete do teclado — abriga PCB, plate e switches

### Sandwich case
Case feita de camadas (acrílico/MDF) sobrepostas e parafusadas

### Handwired
Teclado montado soldando switches com fios direto no microcontrolador (sem PCB)

### Hotswap
Soquetes que permitem trocar switches sem soldar

### Stabilizer
Mecanismo que estabiliza teclas grandes (Space, Enter, Shift)

### Costar
Tipo de stabilizer com barra de metal e ganchos

### Underglow
LEDs na parte inferior do teclado — iluminação que vira pela case translúcida

### Backlight
LEDs sob cada tecla — iluminam as keycaps por baixo

### QMK
Quantum Mechanical Keyboard — firmware open source para teclados custom

### Bootloader
Programa que permite gravar firmware no microcontrolador via USB

### HID
Human Interface Device — classe USB que faz o PC reconhecer teclado/mouse

### ATMEGA328
Microcontrolador AVR 8-bit da Atmel — cérebro do Arduino Pro Mini

### RP2040
Microcontrolador ARM Cortex M0+ da Raspberry Pi — 133MHz, 264kB RAM

### AVR
Família de microcontroladores 8-bit da Atmel/Microchip

### USBaspLoader
Bootloader V-USB que emula USB em AVR sem periférico USB nativo

### USBAsp
Gravador externo para flashar microcontroladores AVR

### Standalone
Circuito ATMEGA328 montado sem a placa Arduino (só o chip + cristal)

### I2C
Barramento de comunicação de 2 fios (SDA/SCL) entre chips

### WS2812B
LED RGB endereçável — cada LED tem endereço próprio na fita

### SK6812
LED RGB endereçável menor que o WS2812B — cabe sob as teclas

### 6028R
LED RGB com 3 canais separados (R/G/B) em um encapsulamento

### swillkb
Ferramenta web que gera arquivos de case para teclados a partir do layout

### keyboard-layout-editor
Ferramenta web para desenhar layouts de teclado

### 40percent.club
Site com projetos de teclados compactos (40% das teclas)

### Gherkin
Teclado 40% (3x10) open source do 40percent.club

### Plaid
Teclado 48-key open source com ATMEGA328 e USBaspLoader


## Git e servidores

### Self-hosted
Software hospedado no seu próprio servidor em vez de serviço de terceiros

### VPS
Virtual Private Server — servidor virtual que você aluga

### CGI
Common Gateway Interface — roda programas no servidor web para gerar páginas

### cgit
Interface web para repositórios git, em C, roda via CGI

### stagit
Gerador de páginas estáticas para repositórios git

### Merge Request
No Gitlab, equivalente ao Pull Request do Github

### Pull Request
Proposta de merge de uma branch para outra no Github

### Mirror
Cópia automática de um repositório entre servidores

### systemd
Gerenciador de serviços (init) padrão do Linux

### journalctl
Comando que consulta logs do systemd

### Suckless
Filosofia de software minimalista — programas pequenos que fazem uma coisa bem


## Desenvolvimento de jogos

### SDL2
Simple DirectMedia Layer 2 — biblioteca C para gráficos, áudio e input 2D

### Engine
Framework que abstrai loop do jogo, rendering, física, etc

### Game loop
Ciclo principal: input → update → render, repetido a cada frame

### Godot
Engine de jogos open source, em C++, com GDScript/GDNative

### GDNative
Interface do Godot para extensões em C/C++ (e outras linguagens)

### Tetrominó
Peça do Tetris — 4 blocos em arranjo (I, O, T, S, Z, L, J)

### Dear ImGui
Biblioteca C++ de UI em immediate mode — menus e debug overlays

### WebAssembly
Formato binário que roda C/C++ no navegador com quase velocidade nativa

### Emscripten
Compilador LLVM → WebAssembly — leva código C/C++ para web

### FOSS
Free and Open Source Software — software livre e de código aberto

### Análise estática
Analisa o código sem rodar — encontra bugs via padrões (ex: gcc -fanalyzer)

### Makefile
Script do `make` que automatiza compilação do projeto

### Nuklear
Biblioteca C de UI em immediate mode — leve e sem dependências

### LVGL
Light and Versatile Graphics Library — gráficos para sistemas embarcados


## Eletrônica embarcada e áudio DIY

### ESP32
Microcontrolador com WiFi+Bluetooth dual-core — base do ESPBoy

### DevKit
Placa de desenvolvimento com o microcontrolador exposto

### GPIO
General Purpose Input/Output — pino digital do microcontrolador

### Menuconfig
Sistema de configuração do ESP-IDF (SDK do ESP32)

### ROM
Arquivo de jogo (Read-Only Memory) — a imagem do cartucho emulado

### Emulação
Reproduzir o hardware de um console em software em outro dispositivo

### TFT
Thin-Film Transistor — tipo de display LCD colorido

### Backlight
Iluminação atrás do display LCD — controla brilho

### PAM8403
IC amplificador de áudio classe D 3W×2 — usado em projetos DIY

### TP4056
IC carregador de bateria de lítio — padrão em projetos com bateria

### Divisor de tensão
Circuito com resistores que divide a tensão para ler múltiplos botões num pino

### Buzzer
Pequeno alto-falante piezo — gera tons (não é polifônico)

### SD Card
Cartão de memória para armazenar ROMs e dados

### MOSI/MISO/SCLK/CS
Pinos do barramento SPI para displays e cartões SD


## Email e infra

### Yunohost
Sistema self-hosted para gerenciar apps web, email e DNS em uma VPS

### Postfix
Servidor de email (MTA) para enviar e receber mensagens SMTP

### Porta 25
Porta SMTP padrão para envio de email — frequentemente bloqueada por provedores

### SMTP Relay
Serviço terceiro (SendGrid, etc) que envia email por você quando a porta 25 está bloqueada

### SendGrid
Serviço de SMTP relay da Twilio — permite envio de email transacional

### iptables
Firewall do Linux — controla portas e tráfego de rede

### Firewall
Camada que filtra tráfego de rede por porta/IP — pode bloquear email


## Web e design

### Keyframe
Ponto de uma animação CSS que define o estado dos elementos em um instante

### @keyframes
Regra CSS que descreve a sequência de keyframes de uma animação

### Prompt
Indicador do terminal (ex: `$`) — onde você digita comandos

### Typewriter effect
Animação que simula digitação caractere por caractere

### dmenu
Menu dinâmico do projeto suckless para X11 — base de várias ferramentas

> Este glossário é atualizado conforme novos posts são publicados. Se você achar que algum termo está faltando, me avise.

---

> Este glossário é atualizado conforme novos posts são publicados. Se você achar que algum termo está faltando, me avise.
\n## Viagens e Turismo\n\n### Cavezalle\nMarca de malas de viagem.\n\n### Aeroparque\nAeroparque Jorge Newbery (AEP) — aeroporto localizado dentro da cidade de Buenos Aires.\n\n### San Telmo\nBairro histórico de Buenos Aires, famoso por suas feiras de antiguidades aos domingos.\n\n### La Boca\nBairro tradicional de Buenos Aires, conhecido pelo estádio La Bombonera e pelo Caminito.\n\n### La Bombonera\nEstádio do Club Atlético Boca Juniors em Buenos Aires.\n\n### Riquelme\nJuan Román Riquelme — ídolo e atual presidente do Boca Juniors.\n\n### Parque Centenário\nParque circular no centro geográfico de Buenos Aires, famoso por sua feira de livros e artesanato.\n\n### MEP\nMercado Electrónico de Pagos — taxa de câmbio na Argentina usada por cartões internacionais (próxima ao Dólar Blue), essencial para turistas.\n\n## Saúde e Neurodivergência\n\n### TDAH\nTranstorno do Déficit de Atenção com Hiperatividade.\n\n### TAG\nTranstorno de Ansiedade Generalizada.\n\n### ANC\nActive Noise Cancellation — tecnologia de fones de ouvido que cancela ruídos externos emitindo ondas sonoras inversas.
