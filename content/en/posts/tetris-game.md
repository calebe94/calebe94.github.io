---
title: Building Tetris in C++ with SDL2 and WebAssembly
description: ''
date: '2023-09-10 18:00:00'
tags:
  - DIY
  - EN_US
---

# 🎮 Building Tetris in C++ with SDL2 and WebAssembly 🚀

In the world of game development, Tetris is a classic that needs no introduction. Its simple yet addictive gameplay has captivated players for decades. In this post, I'll take you on a journey through the process of creating a Tetris game in C++ using the SDL2 library and explore how to bring this game to the web using WebAssembly. We'll cover the key steps and concepts, from setting up the development environment to implementing the game mechanics and user interfaces.

<center>
<a href="/tetris/"><img src="https://raw.githubusercontent.com/Calebe94/tetris/main/assets/screenshots/game.png" width="500px"></a>
<p><h4><a href="/tetris/">🎮 PLAY! 🎮</a></h4></p>
</center>


### Setting Up the Development Environment

Before diving into game development, you need the right tools and libraries. In our case, I chose C++ as the programming language and SDL2 as the multimedia library for graphics, audio, and input.

1. **C++**: This language provides the power and flexibility needed for game development. Make sure you have a C++ compiler and build tools installed.

2. **SDL2**: The Simple DirectMedia Layer is a popular choice for 2D game development. It abstracts platform-specific details, making it easy to create cross-platform games.

Once you have these essential components in hand, it's time to start coding.

### The Game Loop

Every game has a main loop responsible for handling input, updating the game state, and rendering graphics. In our Tetris game, the loop looks like this:

```cpp
while (!quit) {
    handleInput();
    updateGame();
    renderGame();
}
```

- **handleInput()**: This function checks user input, such as keyboard commands to move or rotate Tetrominoes.

- **updateGame()**: Here, we update the game state, including Tetromino movement, collision detection, and line clearing.

- **renderGame()**: This step involves rendering the game board, Tetrominoes, and user interface elements on the screen.

### Building the Game Board

In Tetris, the game board is a grid where Tetrominoes fall and interact. We represent the game board as a 2D matrix of cells, where each cell contains information about the state of that position on the grid.

```cpp
std.::vector<std::vector<int>> gameBoard(rows, std::vector<int>(cols, 0));
```

We use numbers to represent different states on the grid, with `0` indicating an empty cell, `255` for borders, and other values for different Tetromino shapes.

### Tetrominoes and Collision Detection

Tetrominoes are the heart of the game. Each Tetromino consists of four blocks that move as a single unit. We use classes to represent Tetrominoes, which allows us to define their shapes and handle their movement.

Collision detection ensures that Tetrominoes don't pass through walls or other blocks. We check if a move is valid before allowing it.

```cpp
if (isValidMove(newPosition)) {
    currentTetromino.move(newPosition);
} else {
    // Handle collisions
}
```

### Clearing Lines

When a line is filled with Tetrominoes, it gets cleared from the board. Clearing lines requires checking each row for completion and shifting blocks down when necessary.

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

### Adding a User Interface

A game without a user interface is incomplete. I added a menu system using the Dear ImGui library, allowing players to start a new game, access settings, and quit the game. ImGui offers a convenient way to create interactive menus and UI elements.

### Scoring and Level Progression

To keep players engaged, I implemented scoring and level progression. Players earn points by clearing lines, and the game advances a level every 1000 points. This adds a sense of progression and challenge to the game.

```

cpp
void calculatePoints(int rowsCleared) {
    score += (rowsCleared * rowsCleared * 100);
    if (score >= level * 1000) {
        level++;
        // Increase game speed or add more challenges for higher levels
    }
}
```

### 🌐 Bringing Tetris to the Web with WebAssembly

Now, the exciting part: bringing our Tetris game to the web using WebAssembly. First, I set up the Emscripten environment in our Makefile and created a shell HTML file to host the game on the web. We use Emscripten to compile our C++ code into WebAssembly.

```makefile
# Emscripten configuration
EMCC = emcc
EMFLAGS = -std=c++11
EMINCLUDE_PATH = -Isrc/ -Ilib/seethe/ -Ilib/imgui/ -Ilib/imgui/backends/
EMLIBS = -s USE_SDL=2 -s USE_SDL_IMAGE=2 -s USE_SDL_MIXER=2 -s USE_SDL_TTF=2 -s ALLOW_MEMORY_GROWTH --preload-file assets/
```

With these settings in place, we can use Emscripten to compile our game to WebAssembly.

```shell
make web
```

Now, you can play Tetris both on the desktop and on the web. The game's source code is available at [https://github.com/calebe94/tetris](https://github.com/calebe94/tetris), and you can play it directly at [https://blog.calebe.dev.br/tetris/](https://blog.calebe.dev.br/tetris/).

### Conclusion

Building a Tetris game in C++ and SDL2 is a rewarding journey that covers various aspects of game development, from managing game logic to implementing user interfaces. This post covered the essential components of our Tetris game, but there's always room for improvements and additional features. Game development is a continuous learning process, and it's exciting to see the game evolve with each iteration.

Stay tuned for future updates as I improve our Tetris game and explore even more game development concepts. I hope this journey has inspired you to embark on your own game development adventure!

Remember that you can try out the Tetris game both on the desktop and on the web, thanks to the power of WebAssembly. The complete game source code is available at [https://github.com/calebe94/tetris](https://github.com/calebe94/tetris), and you can play it at [https://blog.calebe.dev.br/tetris/](https://blog.calebe.dev.br/tetris/). Have fun playing and exploring the world of game development!