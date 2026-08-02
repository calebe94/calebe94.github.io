---
title: Organizing a C project
description: ''
date: '2023-02-23 20:50:26'
tags:
  - EN_US
  - c
---

I love keeping my source files organized in a logical, consistent file structure — it's absolutely essential for the maintainability, readability, and scalability of my code!

Here are some of the best practices I follow when organizing source files into a file structure hierarchy:

## 1. Separate source files based on their purpose

I group related source files into logical folders based on their purpose, such as `core`, `utilities`, `input-output`, `data structures`, etc.

## 2. Use a consistent naming convention

I always use a consistent naming convention for my folders and files.
For example, I use lowercase letters and hyphens to separate words in folder names.

## 3. Avoid deep nesting

I avoid deep nesting of folders, as it can make locating and organizing files much harder.
A good rule of thumb I follow is to keep folder nesting to a maximum of three levels. Example: `projeto/src/core/file.c`

## 4. Use version control

I use a version control system, such as Git, to track changes and collaborate with other developers.

## 5. Create a build directory

I always create a separate directory to store build artifacts, object files, and my project's executables.

## 6. Keep main files at the root level

I keep main files, such as `main.c`, at the root level of my project, and I create separate folders for related modules and libraries.

## 7. Use comments and documentation

I use comments and documentation to describe the purpose and functionality of my source files, functions, and variables.

## 8. Make a `README`([Make a Readme](https://www.makeareadme.com/))

I make a `README` file in `Markdown`, `Org-mode`, `HTML`, or even `Plain Text`.
A `README` file can save me when I come back to my project after some time away, and it can serve as [documentation for my project](https://tom.preston-werner.com/2010/08/23/readme-driven-development.html).

# File structure

Here's an example of a file structure I love using for my C projects:

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

In this example, the project's root directory contains the `main.c` file, a `build/` directory for build artifacts, a `Makefile` to compile the project, and a `README.md` file for documentation. The `src/` directory contains subdirectories for related modules, and the `include/` directory contains header files for the modules. By organizing my files this way, I find it much easier to maintain and scale my codebase!

# Useful links

* [File Structure : Broad Institute of MIT and Harvard](https://mitcommlab.mit.edu/broad/commkit/file-structure/);
* [Make a README](https://www.makeareadme.com/);
* [Readme Driven Development](https://tom.preston-werner.com/2010/08/23/readme-driven-development.html).

## See also

- [[pong]] — my first game in C, Pong with SDL2
- [[pong-em-c-sdl2]] — detailed Pong in C with SDL2
- [[tetris-game]] — Tetris in C++ with SDL2 and WebAssembly
- [[glossary]] — terms like SDL2, Makefile