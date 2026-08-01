---
title: Fixing corrupted ZSH history
description: How to fix a corrupted zsh history file
date: '2021-04-17 18:04:26'
tags:
  - EN_US
  - shell
---

## How to fix a corrupted ZSH history

Run the following commands to fix the error and recover your history:

```bash
cd ~/
mv .zsh_history .zsh_history_old
strings .zsh_history_old > .zsh_history
fc -R .zsh_history
```