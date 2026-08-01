---
title: Desenvolvendo o jogo Tetris em C++ com SDL2 e WebAssembly
description: ''
date: '2023-09-10 18:00:00'
tags:
  - DIY
  - PT_BR
---

# 🎮 Desenvolvendo o jogo Tetris em C++ com SDL2 e WebAssembly 🚀

No mundo do desenvolvimento de jogos, Tetris é um clássico que dispensa apresentações. Sua jogabilidade simples, porém viciante, cativou jogadores por décadas. Neste post, levaremos você a uma jornada pelo processo de criação de um jogo Tetris em C++ usando a biblioteca SDL2 e exploraremos como levar esse jogo para a web usando WebAssembly. Vamos abordar os passos e conceitos-chave, desde a configuração do ambiente de desenvolvimento até a implementação da mecânica do jogo e das interfaces de usuário.

<center>
<a href="/tetris/"><img src="https://raw.githubusercontent.com/Calebe94/tetris/main/assets/screenshots/game.png" width="500px"></a>
<p><h4><a href="/tetris/">🎮 JOGAR! 🎮</a></h4></p>
</center>


### Configurando o Ambiente de Desenvolvimento

Antes de mergulhar no desenvolvimento de jogos, você precisa das ferramentas e bibliotecas certas. No nosso caso, escolhemos C++ como linguagem de programação e SDL2 como biblioteca multimídia para gráficos, áudio e entrada.

1. **C++**: Essa linguagem fornece o poder e a flexibilidade necessários para o desenvolvimento de jogos. Certifique-se de ter um compilador C++ e ferramentas de compilação instalados.

2. **SDL2**: A Simple DirectMedia Layer é uma escolha popular para o desenvolvimento de jogos 2D. Ela abstrai detalhes específicos da plataforma, facilitando a criação de jogos multiplataforma.

Uma vez que você tenha esses componentes essenciais em mãos, é hora de começar a programar.

### O Loop do Jogo

Todo jogo possui um loop principal responsável por lidar com entrada, atualizar o estado do jogo e renderizar gráficos. No nosso jogo Tetris, o loop se parece com isso:

```cpp
while (!quit) {
    handleInput();
    updateGame();
    renderGame();
}
```

- **handleInput()**: Esta função verifica a entrada do usuário, como comandos do teclado para mover ou girar Tetrominós.

- **updateGame()**: Aqui, atualizamos o estado do jogo, incluindo o movimento dos Tetrominós, verificação de colisões e eliminação de linhas.

- **renderGame()**: Esta etapa envolve a renderização do tabuleiro de jogo, Tetrominós e elementos de interface de usuário na tela.

### Construindo o Tabuleiro do Jogo

No Tetris, o tabuleiro de jogo é uma grade onde Tetrominós caem e interagem. Representamos o tabuleiro de jogo como uma matriz 2D de células, onde cada célula contém informações sobre o estado daquela posição na grade.

```cpp
std.::vector<std::vector<int>> gameBoard(rows, std::vector<int>(cols, 0));
```

Usamos números para representar diferentes estados na grade, com `0` indicando uma célula vazia, `255` para bordas e outros valores para diferentes formas de Tetrominós.

### Tetrominós e Detecção de Colisão

Tetrominós são o coração do jogo. Cada Tetrominó consiste em quatro blocos que se movem como uma única unidade. Usamos classes para representar Tetrominós, o que nos permite definir suas formas e lidar com o movimento.

A detecção de colisões garante que os Tetrominós não passem pelas paredes ou outros blocos. Verificamos se um movimento é válido antes de permiti-lo.

```cpp
if (isValidMove(newPosition)) {
    currentTetromino.move(newPosition);
} else {
    // Lidar com colisões
}
```

### Eliminando Linhas

Quando uma linha é preenchida com Tetrominós, ela é eliminada do tabuleiro. A eliminação de linhas requer a verificação de cada linha em busca de preenchimento e o deslocamento de blocos para baixo, quando necessário.

```cpp
for (int row = boardHeight - 2; row >= 1; --row) {
    bool rowIsFull = true;

    for (int col = 1; col < boardWidth - 1; ++col) {
        if (gameBoard[row][col] == 0) {
            rowIsFull = false;
            break;
        }
    }

    if (rowIsFull) {
        clearRow(row);
    }
}
```

### Adicionando uma Interface de Usuário

Um jogo sem interface de usuário está incompleto. Adicionamos um sistema de menu usando a biblioteca Dear ImGui, permitindo que os jogadores iniciem um novo jogo, acessem configurações e saiam do jogo. ImGui oferece uma maneira conveniente de criar menus interativos e elementos de interface de usuário.

### Pontuação e Avanço de Nível

Para manter os jogadores envolvidos, implementamos pontuação e avanço de nível. Os jogadores ganham pontos ao eliminar linhas, e o jogo avança de nível a cada 1000 pontos. Isso adiciona um senso de progressão e desafio ao jogo.

```

cpp
void calculatePoints(int rowsCleared) {
    score += (rowsCleared * rowsCleared * 100);
    if (score >= level * 1000) {
        level++;
        // Aumentar a velocidade do jogo ou adicionar mais desafios para níveis mais altos
    }
}
```

### 🌐 Leve o Tetris para a Web com WebAssembly

Agora, a parte emocionante: levar nosso jogo Tetris para a web usando WebAssembly. Primeiro, configuramos o ambiente Emscripten no nosso Makefile e criamos um arquivo HTML de shell para hospedar o jogo na web. Usamos o Emscripten para compilar nosso código C++ em WebAssembly.

```makefile
# Emscripten configuration
EMCC = emcc
EMFLAGS = -std=c++11
EMINCLUDE_PATH = -Isrc/ -Ilib/seethe/ -Ilib/imgui/ -Ilib/imgui/backends/
EMLIBS = -s USE_SDL=2 -s USE_SDL_IMAGE=2 -s USE_SDL_MIXER=2 -s USE_SDL_TTF=2 -s ALLOW_MEMORY_GROWTH --preload-file assets/
```

Com essas configurações em vigor, podemos usar o Emscripten para compilar nosso jogo para WebAssembly.

```shell
make web
```

Agora, você pode jogar o Tetris tanto no ambiente desktop quanto na web. O código-fonte do jogo está disponível em [https://github.com/calebe94/tetris](https://github.com/calebe94/tetris), e você pode jogar diretamente em [https://blog.calebe.dev.br/tetris/](https://blog.calebe.dev.br/tetris/).

### Conclusão

Criar um jogo Tetris em C++ e SDL2 é uma jornada gratificante que abrange vários aspectos do desenvolvimento de jogos, desde o gerenciamento da lógica do jogo até a implementação de interfaces de usuário. Este post cobriu os componentes essenciais do nosso jogo Tetris, mas sempre há espaço para melhorias e recursos adicionais. O desenvolvimento de jogos é um processo contínuo de aprendizado, e é empolgante ver o jogo evoluir a cada iteração.

Fique atento para futuras atualizações, à medida que aprimoramos nosso jogo Tetris e exploramos ainda mais conceitos de desenvolvimento de jogos. Esperamos que esta jornada tenha inspirado você a embarcar na sua própria aventura de desenvolvimento de jogos!

Lembre-se de que você pode experimentar o jogo Tetris tanto no ambiente desktop quanto na web, graças ao poderoso WebAssembly. O código-fonte completo do jogo está disponível em [https://github.com/calebe94/tetris](https://github.com/calebe94/tetris), e você pode jogá-lo em [https://blog.calebe.dev.br/tetris/](https://blog.calebe.dev.br/tetris/). Divirta-se jogando e explorando o mundo do desenvolvimento de jogos!
