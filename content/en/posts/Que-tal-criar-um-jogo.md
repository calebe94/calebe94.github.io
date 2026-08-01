---
title: How about making a game?
description: ''
date: '2022-05-09 16:30:33'
tags:
  - EN_US
  - gaming
---

# How about making a game?

Recently a friend of mine started taking a
[Unity](https://unity.com/) course, and during a chat we got really
excited about making a game.

I was super excited to make a game in **C**, while he (Rafael) wanted
to develop the game in Unity. I don't judge him for that, but I'm
not very familiar with `C#`, so I didn't want to go the
`Unity` route.

## The Plan

My plan is to learn how a game works — every step of the
creation process, in short, EVERYTHING.

Not only that, but I'd love to make a game that's 100%
`FOSS (Free and Open Source Software)`.

### Engines

After doing some research on *engines*, I didn't have as much
success as I'd hoped.

I found some Open Source *engines* like
[Source](https://developer.valvesoftware.com/wiki/Source_Engine_Features),
used by Valve to create Counter Strike, Portal, and Half-Life.

I also found an *engine* called [Godot],
written in `C++`, but it uses its own syntax for developing games,
called `GDNative`.

So, I decided to go my own way — I'll build my game from
**SCRATCH**, creating the engine in parallel.

### DIY

There are some advantages to building your own engine. I'll list
a few below:

-   Better performance;
-   Smaller codebase;
-   Full control over the code;

In short, **TOTAL CONTROL OVER EVERYTHING** — even the bugs.

And I'm also aware that this "**Total control**" can be a
disadvantage too, since I'll have to study everything about game
development — entity management, collisions, camera, dialogue
management, and more.

But since my focus is to learn how a game works, this disadvantage
becomes a painful advantage.

## SDL2

After more research, I watched the talk [Game Development
with SDL 2.0 (Steam Dev Days
2014)](https://www.youtube.com/watch?v=MeMPCSqQ-34) on YouTube and
discovered it's possible to develop games using the
[SDL2](https://www.libsdl.org/index.php) library, which I had already
used to simulate a graphics library for embedded systems called
[LVGL](https://lvgl.io/).

With `SDL2` I would create a virtual display to demonstrate the
graphical elements, without having to flash the firmware onto the
device every time I made a change.

The first thing that crossed my mind was: why not make a game
from scratch using the `SDL2` library?

And that's where I'll start.

## What game?

But then came the question: what game? How can I make a game if I
don't even have an idea of what I want to build?

So, chatting with my friends, we established some "constraints"
for the game concept. Here they are:

-   Pixel art graphics (8/16 bits);
-   Top-down view;
-   Survival and exploration game with Farm Simulator vibes
    (farming game);
    -   a slightly "cozier" survival game, in the style of
        Stardew Valley;
    -   and exploration in the style of Minecraft, where the world is
        generated procedurally, and it's up to the player to explore
        the world looking for resources;
    -   the player can customize these islands with items that will
        be crafted;
    -   natural resources in the game are finite, forcing the
        player to build farms;

On top of that, I also had the idea of adding natural elements from
Brazilian fauna and flora — trees, plants, and animals commonly
found in Brazil (not necessarily native ones).

## Development tools

Below I'll list some tools I plan to use during game development.

### Graphics

I'll use the [SDL2 - Simple DirectMedia
Layer](https://www.libsdl.org/index.php) library.

### Programming language

I'll be using the `C` programming language. However, I'll use `Python` and
`Shell Script` to write some tools, or whenever it's convenient.

### Static code analysis

Since I'll be programming the game in `C` and using the `gcc` compiler,
I'll use the `-fanalyzer` flag to perform static code analysis.

Details on how `gcc` static analysis works can be found at:
[Static analysis in GCC 10 | Red Hat
Developer](https://developers.redhat.com/blog/2020/03/26/static-analysis-in-gcc-10).

Complete descriptions of error/warning codes can be found at
<https://cwe.mitre.org>.

Information on how to use the `-fanalyzer` flag is available on the
[GNU/gcc](https://gcc.gnu.org/onlinedocs/gcc/Static-Analyzer-Options.html)
documentation site.

### UI

To generate the game's UI, I'll use the [Nuklear](https://immediate-mode-ui.github.io/Nuklear/doc/index.html) library.

Other links:

-   [GNU Hurd - code
    analysis](https://www.gnu.org/software/hurd/open_issues/code_analysis.html);
-   [mygcc the customizable gcc compiler](http://mygcc.free.fr/);
-   [Semgrep](https://semgrep.dev/);
-   [GitHub - foospidy/GrepBugs: A regex based source code
    scanner](https://github.com/foospidy/GrepBugs).

### Schedule

There's no schedule — I only have a vague idea of what I want
to do. The one thing I'm sure of is that I have time to change my
mind.

On this blog I'll record my adventures in the world of game
development.

See you soon!!!

### Updates

* **05/13/2022**:
    * I discovered that [Godot] has third-party Python support. The project is called [godot-python](https://github.com/touilleMan/godot-python).
    * I forgot to mention that we're keeping a collective note with game ideas, tools, tutorials, and videos we've been finding. The note can be accessed through [this link](https://pad.calebe.dev.br/p/jogo).


[Godot]: https://godotengine.org/