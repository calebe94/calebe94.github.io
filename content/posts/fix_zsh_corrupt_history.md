---
title: Resolvendo historico corrompido do ZSH
description: Como resolver o problema de historico corrompido do zsh
date: '2021-04-17 18:04:26'
tags: []
---

## Como resolver o problema de historico corrompido do zsh

Execute os comandos a seguir par resolver o erro e recuperar o seu histórico:

```bash
cd ~/
mv .zsh_history .zsh_history_old
strings .zsh_history_old > .zsh_history
fc -R .zsh_history
```
