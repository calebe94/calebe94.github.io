---
title: "TinyToolSH: Tiny tools to boost your productivity"
description: "How a shell scripts project grew and became a GitHub organization"
date: "2026-07-17 23:00:00"
tags:
  - EN_US
  - DIY
  - shell
  - suckless
  - FOSS
---

# TinyToolSH: Tiny tools to boost your productivity

[Gabo](https://github.com/gbgabo) and I share a very similar philosophy when it comes to software: small things that do one thing really well. It's no coincidence we're fans of the [suckless philosophy](https://suckless.org/philosophy/).

Sometime in 2020 we started writing small `shell` scripts to automate boring day-to-day tasks. Simple things: a `dmenu` wrapper for creating Markdown notes, a terminal pomodoro timer, a script that downloads satellite images from [GOES](https://www.star.nesdis.noaa.gov/GOES/) and sets them as wallpaper.

Over time these scripts got serious — they got `Makefile`s, manpages, `systemd` services, and even changelogs. And then the problem arose: how to organize all of this?

## The first repository

It all started at [calebe94/tinytools](https://github.com/calebe94/tinytools). A single repository with all the scripts inside subdirectories, as if they were modules of one project.

At the time the repo had 295 commits, 8 branches, and 20 open issues. It wasn't exactly chaotic, but you could already tell some tools had a life of their own. `tgoeswall`, for instance, was way more complex than the others — it had a config file, a `systemd` service, control via `tgoeswallctrl start|stop`, and logging in `journalctl`. Keeping it in the same repository as a 10-line script was starting to not make much sense.

## The name

Here comes the interesting part. We wanted to call the project **TinyTools**, obviously. The name was perfect: tiny tools, straight to the point.

But when we went to create the organization on GitHub, the username `tinytools` was already taken. And it wasn't an active project — it was one of those users who register and vanish.

So we adapted. **TinyToolSH** — Tiny Tools written in **SH**ell script. The acronym made sense because, well, all the tools are written in shell. Some in Python (like `ttodo`), but most in pure `bash` or `sh`.

## Migrating to an organization

Instead of keeping everything in a monolithic repository, we moved each tool to its own repo under the [TinyToolSH](https://github.com/tinytoolsh) organization.

Each tool got its own structure:

```
tgoeswall/
├── tgoeswall          # the main script
├── tgoeswall.conf      # configuration file
├── tgoeswall.service   # systemd unit
├── tgoeswall.1         # manpage
├── Makefile            # install and uninstall
├── CHANGELOG.md
├── LICENSE
└── README.md
```

This solved several problems at once:

- Each tool has its own release cycle;
- `Issues` are separated per tool, not one big mess;
- Each one's `Makefile` is independent;
- If you only want to use `tpomodoro`, you don't need to clone 10 scripts you won't use.

## The tools

Today the organization has 16 repositories, with the main ones being:

| Tool | Description |
|---|---|
| [tgoeswall](https://github.com/tinytoolsh/tgoeswall) | Downloads images from the GOES satellite and sets them as dynamic wallpaper |
| [tlaunch](https://github.com/tinytoolsh/tlaunch) | `dmenu` wrapper for creating custom menus |
| [tnotes](https://github.com/tinytoolsh/tnotes) | Create and access Markdown notes via `dmenu` |
| [tpomodoro](https://github.com/tinytoolsh/tpomodoro) | Pomodoro timer in the terminal |
| [tprogbar](https://github.com/tinytoolsh/tprogbar) | ASCII progress bar generator |
| [tsearch](https://github.com/tinytoolsh/tsearch) | Search the web however you want |
| [ttodo](https://github.com/tinytoolsh/ttodo) | Task list via `dmenu` |
| [tyaml](https://github.com/tinytoolsh/tyaml) | YAML file parser in pure shell |
| [tmdpres](https://github.com/tinytoolsh/tmdpres) | Markdown presentation generator |
| [tbm](https://github.com/tinytoolsh/tbm) | Plain-text URL bookmarks |
| [tmenu](https://github.com/tinytoolsh/tmenu) | `dmenu` wrapper for creating menus |
| [tgit](https://github.com/tinytoolsh/tgit) | List important git repositories on your system |

If you noticed that several tools use `dmenu`, it's no coincidence. `dmenu` is from the [suckless](https://tools.suckless.org/dmenu/) project — lightweight, fast, with no absurd dependencies. It's the most suckless GUI there is for menus on X11.

## Installation

All tools follow the same installation pattern. Each has a `Makefile` you can edit to change the installation prefix (the default is `/usr/local/bin`).

```bash
git clone https://github.com/tinytoolsh/tgoeswall.git
cd tgoeswall
sudo make install
```

To uninstall:

```bash
sudo make uninstall
```

Simple as that. No package manager, no runtime dependency, no 500MB `node_modules`.

## tgoeswall

The tool I'm most proud of is `tgoeswall`. The idea came when I saw the [dynamic wallpaper from macOS Mojave](https://www.apple.com/macos/mojave/) and thought: "I can do this on Linux, in a cooler way."

The script downloads an image from [GOES-16](https://www.star.nesdis.noaa.gov/GOES/), NOAA's geostationary satellite, every 10 minutes, and applies it as wallpaper using `feh`. The result is your wallpaper changing throughout the day as the Earth rotates.

The image below is served directly from NOAA's CDN and is updated every 10 minutes — yes, it's live:

![Full disk GOES image, updated in real time](https://cdn.star.nesdis.noaa.gov/GOES19/ABI/FD/GEOCOLOR/latest.jpg)

To control `tgoeswall` as a `systemd` service:

```bash
tgoeswallctrl start   # starts the service
systemctl --user start tgoeswall
systemctl --user stop tgoeswall
journalctl --user -fu tgoeswall   # view the log
```

You can also download a single image at a specific resolution:

```bash
tgoeswall -r 5424
```

Available resolutions are `678`, `1808`, `5424`, and `10848`. Be careful with `10848` — the image can exceed 72MB.

## Final thoughts

TinyToolSH is a project that started as a handful of scripts and grew into an organization with 16 repositories. It's not a project that's going to take over the world, and that's exactly the point. Each tool does one thing, does it well, and doesn't try to do more than that.

If you're into the Unix philosophy of small tools that work well together, check out the [project website](https://tinytoolsh.github.io) and the [GitHub](https://github.com/tinytoolsh).

And if you want to contribute, all tools are under [GPL v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html). There are open `issue`s across several repositories.

See you next time!!!