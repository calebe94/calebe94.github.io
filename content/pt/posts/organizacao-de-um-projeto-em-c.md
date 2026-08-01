---
title: Organização de projeto em C
description: ''
date: '2023-02-23 20:50:26'
tags: []
---

# Organização de projeto em C

Organizar seus arquivos de código fonte em uma estrutura de arquivos lógica e consistente é importante para a manutenibilidade, legibilidade e escalabilidade do código.

Aqui estão algumas das melhores práticas para organizar arquivos de origem em pastas de estrutura de arquivos:

## 1. Separe os arquivos de origem com base em sua finalidade

Agrupe os arquivos de origem relacionados em pastas lógicas com base em sua finalidade, como `core`, `utilities`, `input-output`, `data structures`, etc.

## 2. Use uma convenção de nomenclatura consistente

Use uma convenção de nomenclatura consistente para pastas e arquivos.
Por exemplo, use letras minúsculas e hifens para separar palavras em nomes de pastas.

## 3. Evite aninhamento profundo(deep nesting)

Evite aninhamento profundo de pastas, pois pode dificultar a localização e organização de arquivos.
Uma boa regra geral é manter o aninhamento de pastas a um máximo de três níveis. Exemplo: `projeto/src/core/file.c`

## 4. Use controle de versão

Use um sistema de controle de versão, como o Git, para acompanhar as alterações e colaborar com outros desenvolvedores.

## 5. Crie um diretório de compilação

Crie um diretório separado para armazenar os artefatos de compilação, arquivos de objeto e os executáveis do projeto.

## 6. Mantenha arquivos principais no nível raiz

Mantenha arquivos principais, como `main.c`, no nível raiz do projeto e crie pastas separadas para módulos e bibliotecas relacionados.

## 7. Use comentários e documentação

Use comentários e documentação para descrever a finalidade e a funcionalidade dos arquivos de origem, funções e variáveis.

## 8. Faça um `README`([Make a Readme](https://www.makeareadme.com/))

Faça um arquivo `README` em `Markdown`, `Org-mode`, `HTML` ou em `Plain Text` mesmo.
Um arquivo `README` pode te salvar quando você volta ao seu projeto depois de um tempo de afastamento e pode servir como [documentação do seu projeto](https://tom.preston-werner.com/2010/08/23/readme-driven-development.html)

# Estrutra de arquivos

Aqui está um exemplo de uma possível estrutura de arquivos para um projeto em C:

```sh
projeto/
├── src/
│   ├── core/
│   │   ├── file1.c
│   │   ├── file2.c
│   ├── utilities/
│   │   ├── file3.c
│   ├── data_structures/
│   │   ├── file4.c
│   │   ├── file5.c
│   ├── input_output/
│   │   ├── file6.c
│   │   ├── file7.c
├── include/
│   ├── core/
│   │   ├── file1.h
│   │   ├── file2.h
│   ├── utilities/
│   │   ├── file3.h
│   ├── data_structures/
│   │   ├── file4.h
│   │   ├── file5.h
│   ├── input_output/
│   │   ├── file6.h
│   │   ├── file7.h
├── build/
├── main.c
├── Makefile
├── README.md
```

Neste exemplo, o diretório raiz do projeto contém o arquivo `main.c`, um diretório `build/` para artefatos de compilação, um `Makefile` para compilar o projeto e um arquivo `README.md` para documentação. O diretório `src/` contém subdiretórios para módulos relacionados, e o diretório `include` contém arquivos de cabeçalho para os módulos. Ao organizar os arquivos dessa maneira, é mais fácil manter e escalar a base de código.

# Links úteis

* [File Structure : Broad Institute of MIT and Harvard](https://mitcommlab.mit.edu/broad/commkit/file-structure/);
* [Make a README](https://www.makeareadme.com/);
* [Readme Driven Development](https://tom.preston-werner.com/2010/08/23/readme-driven-development.html).

