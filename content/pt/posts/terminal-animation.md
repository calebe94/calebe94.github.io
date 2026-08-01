---
title: Criando uma Animação CSS Estilo Terminal
description: Um Guia Passo a Passo
date: '2023-09-15 16:00:00'
tags:
  - PT_BR
  - CSS
  - animation
  - HTML5
---

# Criando uma Animação CSS Estilo Terminal

No mundo do desenvolvimento web, a criatividade não tem limites. Às vezes, são os pequenos detalhes que fazem um site se destacar. Neste post, vamos levá-lo a uma jornada pelo processo de criação de uma animação CSS estilo terminal, completa com um efeito de digitação e um cursor piscante. Essa animação chamativa pode ser uma adição única ao seu site. Vamos lá!

## Planejando a Animação

Antes de começarmos a codificar, é essencial planejar nossa animação. Queremos simular a execução dos comandos `whoami` e `pwd` em um terminal. Aqui está o que precisamos fazer:

1. Simular a digitação do comando `whoami` caractere por caractere.
2. Exibir o resultado do comando `whoami`.
3. Simular a digitação do comando `pwd` caractere por caractere.
4. Exibir o resultado do comando `pwd`.

## Estrutura HTML

Nossa estrutura HTML será simples. Criaremos um elemento `div` para o prompt do terminal e, dentro dele, usaremos elementos `span` para representar o texto digitado. Aqui está um trecho do HTML:

```html
<nav class="nav-top">
    <!-- Outros itens de navegação -->
</nav>

<div class="terminal__prompt--typing">
    <div class="cover cover--whoami"></div>whoami
</div>
<div class="terminal__prompt--whoami-return">
    <span>
        <a href="/">Calebe94</a>
    </span>
</div>

<!-- Outro conteúdo -->

<h5>
    <div class="terminal__prompt--pwd">
        $<span class="terminal__prompt--typing">
            <div class="cover cover--pwd"></div>pwd
        </span>
    </div>
    <div class="terminal__prompt--pwd-return">
        <span>/<a href="/">home</a>/</span>
    </div>
</h5>
```

## CSS para a Animação de Digitação

A magia da nossa animação está nos keyframes do CSS. Definimos dois keyframes: um para digitar o texto caractere por caractere e outro para fazer o cursor piscar. Aqui está o código CSS:

```css
/* Animação de digitação para whoami */
@keyframes typing-whoami {
    0% {
        width: 100%;
        opacity: 1;
    }
    12% {
        width: 0;
    }
    15% {
        opacity: 1;
    }
    16% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
}

/* Animação de cursor piscante */
@keyframes blink {
    0%, 100% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
}
```

## Colocando Tudo Junto

Para aplicar a animação de digitação e o cursor piscante aos nossos elementos HTML, usamos animações CSS. Anexamos as animações aos elementos apropriados. Aqui está como é feito:

```css
/* Aplicando a animação de digitação para whoami */
.terminal__prompt--typing .cover--whoami {
    animation: typing-whoami 10s steps(6, end) 1 normal both;
}

/* Aplicando a animação de cursor piscante para whoami */
.terminal__prompt--whoami-return {
    animation: show-whoami-return 10s 1 normal both;
}

/* Aplicando a animação de digitação para pwd */
.terminal__prompt--typing .cover--pwd {
    animation: typing-pwd 10s steps(3, end) 1 normal both;
}

/* Aplicando a animação de exibição do resultado para pwd */
.terminal__prompt--pwd-return {
    animation: show-pwd-return 10s 1 normal both;
}
```

## Projetos semelhantes

Se você ficou interessado na criação de animações de estilo terminal, você também pode explorar esses projetos e recursos relacionados:

1. **Typewriting.js**
   Um exemplo de animação de digitação de texto no estilo terminal usando JavaScript.
   [Ver projeto](https://www.cssscript.com/terminal-style-text-typing-animation-typewriting-js/)

2. **Retro Terminal Blog Style**
   Um blog post que explora a criação de um estilo retrô de terminal para seu blog.
   [Ver post](https://archive.casouri.cc/note/2018/retro-terminal-blog-style/)

3. **Typing Window**
   Um tutorial sobre como criar uma janela de digitação de texto com efeito de terminal.
   [Ver tutorial](https://gmarini.com/blog/blog/coding/2020-08-10-typing-window/)

4. **CSS Tricks - Typewriter Effect**
   Um snippet que demonstra como criar um efeito de máquina de escrever usando apenas CSS.
   [Ver exemplo](https://css-tricks.com/snippets/css/typewriter-effect/)

5. **Terminal Animation for Your Website using Typed.js**
   Um guia sobre como adicionar animações de terminal ao seu site usando Typed.js.
   [Ver guia](https://dev.to/shahstavan/terminal-animation-for-your-website-using-typed-js-2hcl)

6. **Typed.js**
   Uma biblioteca JavaScript popular para criar animações de digitação de texto em seu site.
   [Ver projeto](https://github.com/mattboldt/typed.js)

7. **Terminal Animation (CodePen)**
   Um exemplo de animação de terminal em um ambiente interativo do CodePen.
   [Ver exemplo](https://codepen.io/glitchedneon/pen/LYpvdqy)

8. **Termynal**
   Uma biblioteca JavaScript para criar animações de terminal em seu site com facilidade.
   [Ver projeto](https://github.com/ines/termynal)

Explorar esses recursos adicionais pode fornecer mais insights e opções para adicionar animações de terminal ao seu projeto ou inspirar novas ideias criativas.

## Conclusão

Nesta jornada de criação de uma animação CSS estilo terminal, exploramos o poder dos keyframes e das animações CSS. Ao planejar meticulosamente e aplicar nossas animações aos elementos certos, conseguimos simular com sucesso a execução dos comandos `whoami` e `pwd` em um terminal.

Lembre-se de que o desenvolvimento web é tudo sobre criatividade, e pequenos detalhes como este podem fazer o seu site se destacar. Portanto, vá em frente e experimente as animações CSS para adicionar aquele toque extra aos seus projetos web. Feliz codificação!

---

Sinta-se à vontade para adaptar este post ao seu site, adicionar mais detalhes e incluir quaisquer insights adicionais ou desafios que você enfrentou durante a criação da sua animação estilo terminal. Boa sorte!
