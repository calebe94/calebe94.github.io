---
title: "TinyToolSH: Ferramentas minúsculas para melhorar sua produtividade"
description: "Como um projeto de scripts shell cresceu e virou uma organização no GitHub"
date: "2026-07-17 23:00:00"
tags:
  - PT_BR
  - suckless
  - shell
---

# TinyToolSH: Ferramentas minúsculas para melhorar sua produtividade

Eu e o [Gabo](https://github.com/gbgabo) compartilhamos de uma filosofia bem parecida quando se trata de software: coisas pequenas que fazem uma coisa bem feita. Não é à toa que somos fãs da [filosofia suckless](https://suckless.org/philosophy/).

Em algum momento de 2020 nós começamos a escrever pequenos scripts em `shell` para automatizar tarefas chatas do dia a dia. Coisas simples: um wrapper do `dmenu` para criar notas em Markdown, um cronômetro pomodoro no terminal, um script que baixa imagens de satélite do [GOES](https://www.star.nesdis.noaa.gov/GOES/) e coloca como wallpaper.

Com o tempo esses scripts foram ficando sérios, ganharam `Makefile`, manpage, serviço do `systemd` e até changelog. E aí nasceu o problema: como organizar tudo isso?

## O primeiro repositório

Tudo começou no [calebe94/tinytools](https://github.com/calebe94/tinytools). Um repositório único com todos os scripts dentro de subdiretórios, como se fossem módulos de um projeto só.

Na época o repositório tinha 295 commits, 8 branches e 20 issues abertas. Não é que estivesse caótico, mas já dava para sentir que algumas ferramentas tinham vida própria. O `tgoeswall`, por exemplo, era bem mais complexo que os outros — tinha arquivo de configuração, serviço do `systemd`, controle via `tgoeswallctrl start|stop` e log no `journalctl`. Mantê-lo no mesmo repositório que um script de 10 linhas começava a não fazer muito sentido.

## O nome

Aqui vem a parte interessante. Nós queríamos chamar o projeto de **TinyTools**, óbvio. O nome era perfeito: ferramentas minúsculas, direto ao ponto.

Porém, quando fomos criar a organização no GitHub, o usuário `tinytools` já estava ocupado. E não era um projeto ativo, era um daqueles usuários que registram e somem.

Então resolvemos adaptar. **TinyToolSH** — Tiny Tools written in **SH**ell script. O acrônimo fez sentido porque, bem, todas as ferramentas são escritas em shell. Algumas em Python (como o `ttodo`), mas a maioria em `bash` ou `sh` puro.

## A migração para organização

Ao invés de manter tudo em um repositório monolítico, migramos cada ferramenta para o seu próprio repositório dentro da organização [TinyToolSH](https://github.com/tinytoolsh).

Cada ferramenta ficou com a sua própria estrutura:

```
tgoeswall/
├── tgoeswall          # o script principal
├── tgoeswall.conf      # arquivo de configuração
├── tgoeswall.service   # unit do systemd
├── tgoeswall.1         # manpage
├── Makefile            # instalação e desinstalação
├── CHANGELOG.md
├── LICENSE
└── README.md
```

Isso resolveu vários problemas de uma vez:

- Cada ferramenta tem o seu próprio ciclo de lançamento;
- As `issues` ficam separadas por ferramenta, não uma bagunça só;
- O `Makefile` de cada uma é independente;
- Quem quiser usar só o `tpomodoro` não precisa clonar 10 scripts que não vai usar.

## As ferramentas

Hoje a organização tem 16 repositórios, sendo que os principais são:

| Ferramenta | Descrição |
|---|---|
| [tgoeswall](https://github.com/tinytoolsh/tgoeswall) | Baixa imagens do satélite GOES e define como wallpaper dinâmico |
| [tlaunch](https://github.com/tinytoolsh/tlaunch) | Wrapper do `dmenu` para criar menus personalizados |
| [tnotes](https://github.com/tinytoolsh/tnotes) | Criar e acessar notas em Markdown via `dmenu` |
| [tpomodoro](https://github.com/tinytoolsh/tpomodoro) | Cronômetro pomodoro no terminal |
| [tprogbar](https://github.com/tinytoolsh/tprogbar) | Gerador de barra de progresso em ASCII |
| [tsearch](https://github.com/tinytoolsh/tsearch) | Buscar na web do jeito que você quiser |
| [ttodo](https://github.com/tinytoolsh/ttodo) | Lista de tarefas via `dmenu` |
| [tyaml](https://github.com/tinytoolsh/tyaml) | Parser de arquivos YAML em shell puro |
| [tmdpres](https://github.com/tinytoolsh/tmdpres) | Gerador de apresentações em Markdown |
| [tbm](https://github.com/tinytoolsh/tbm) | Bookmarks de URL em texto puro |
| [tmenu](https://github.com/tinytoolsh/tmenu) | Wrapper do `dmenu` para criar menus |
| [tgit](https://github.com/tinytoolsh/tgit) | Listar repositórios git importantes no seu sistema |

Se você reparou que várias ferramentas usam o `dmenu`, não é coincidência. O `dmenu` é do projeto [suckless](https://tools.suckless.org/dmenu/) — leve, rápido, sem dependências absurdas. É a interface gráfica mais suckless que existe para menus no X11.

## Instalação

Todas as ferramentas seguem o mesmo padrão de instalação. Cada uma tem um `Makefile` que você pode editar para mudar o prefixo de instalação (o padrão é `/usr/local/bin`).

```bash
git clone https://github.com/tinytoolsh/tgoeswall.git
cd tgoeswall
sudo make install
```

Para desinstalar:

```bash
sudo make uninstall
```

Simples assim. Sem gerenciador de pacotes, sem dependência de runtime, sem `node_modules` com 500MB.

## O tgoeswall

A ferramenta que mais orgulho tenho é o `tgoeswall`. A ideia surgiu quando vi o [dynamic wallpaper do macOS Mojave](https://www.apple.com/macos/mojave/) e pensei: "eu consigo fazer isso no Linux, de um jeito mais legal".

O script baixa uma imagem do [GOES-16](https://www.star.nesdis.noaa.gov/GOES/), o satélite geoestacionário da NOAA, a cada 10 minutos, e aplica como wallpaper usando o `feh`. O resultado é o seu wallpaper mudando ao longo do dia conforme a Terra gira.

A imagem abaixo é servida diretamente do CDN da NOAA e é atualizada a cada 10 minutos — sim, ela é ao vivo:

![Imagem full disk do GOES, atualizada em tempo real](https://cdn.star.nesdis.noaa.gov/GOES19/ABI/FD/GEOCOLOR/latest.jpg)

Para controlar o `tgoeswall` como um serviço do `systemd`:

```bash
tgoeswallctrl start   # inicia o serviço
systemctl --user start tgoeswall
systemctl --user stop tgoeswall
journalctl --user -fu tgoeswall   # ver o log
```

Também é possível baixar uma imagem única com uma resolução específica:

```bash
tgoeswall -r 5424
```

As resoluções disponíveis são `678`, `1808`, `5424` e `10848`. Cuidado com a `10848` — a imagem pode passar de 72MB.

## Considerações finais

O TinyToolSH é um projeto que começou como um punhado de scripts e virou uma organização com 16 repositórios. Não é um projeto que vai dominar o mundo, e é exatamente esse o ponto. Cada ferramenta faz uma coisa, faz bem, e não tenta fazer mais do que isso.

Se você curte a filosofia Unix de ferramentas pequenas que trabalham bem juntas, dá uma olhada no [site do projeto](https://tinytoolsh.github.io) e no [GitHub](https://github.com/tinytoolsh).

E se você quiser contribuir, todas as ferramentas estão sob a [GPL v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html). Tem `issue` aberta em vários repositórios.

Até logo!!!

## Veja também

- [[premissas_basicas]] — premissas fundamentais: filosofia Unix e Suckless
- [[glossary]] — termos como Suckless, dmenu, systemd, journalctl