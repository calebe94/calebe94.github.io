---
title: "Template: Novo Post"
description: "One-line description in PT-BR"
date: "YYYY-MM-DD HH:MM:SS"
tags:
  - PT_BR
  - DIY
---

# H1 Title (PT-BR, matches or expands frontmatter title)

Opening paragraph: personal hook or direct question to reader. 2-4 sentences.
Reference a recent event, conversation, or problem. First person ("eu", "meu").

<!-- CONVENÇÃO: Todo post que usar termos técnicos deve linkar para o glossário.
     Use a wikilink ou link relativo: [[notes/glossary|Glossário]] ou [Glossário](/pt/notes/glossary)
     Adicione o link na primeira menção de cada termo técnico, ex:
     "O [Plexi](/pt/notes/glossary#Plexi) é um amp valvulado..." -->

## First Major Phase (e.g., Motivação / Início das pesquisas / Lista de materiais)

Body paragraph. Conversational but technical. Use inline code for commands: `dmesg -w`.

### Sub-step (if needed)

Lead-in sentence explaining what the code block does (never place a bare code block after a heading):

```sh
# Short code snippet with language tag
cd ~/
mv .zsh_history .zsh_history_old
strings .zsh_history_old > .zsh_history
fc -R .zsh_history
```

## Second Phase (e.g., Configurando / Desenvolvimento / Montagem)

If images are available:

<center>
<img src="https://cloud.calebe.dev.br/apps/files_sharing/publicpreview/..." width="500px">
</center>

For BOMs or component lists, use compact tables:

| Componente | Quantidade | Preço |
|:---:|:---:|:---:|
| Diodo 1n4148 | 48 | R$ 5 |
| ATMEGA 328 | 1 | R$ 15 |

## Conclusão (or Considerações finais)

Reflect on the journey. Honest about what worked and what didn't.
Link to repos: [projeto](https://github.com/Calebe94/projeto).

> Não sabe algum termo? Consulte o [Glossário](/pt/notes/glossary).
