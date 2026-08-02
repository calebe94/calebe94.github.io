---
title: Creating a Terminal-Style CSS Animation
description: A Step-by-Step Guide
date: '2023-09-15 16:00:00'
tags:
  - EN_US
  - blog
  - shell
  - animation
---

Sometimes it's the little details that make a site stand out. I wanted to add a terminal-style CSS animation to my site — complete with a typing effect and a blinking cursor. It's an eye-catching touch that gives the page personality. Let me show you how I did it!

## Planning the Animation

Before I started coding, I needed to plan the animation. I wanted to simulate running the `whoami` and `pwd` commands in a terminal. Here's what I needed to do:

1. Simulate typing the `whoami` command character by character.
2. Display the output of the `whoami` command.
3. Simulate typing the `pwd` command character by character.
4. Display the output of the `pwd` command.

## HTML Structure

The HTML structure is simple. I created a `div` element for the terminal prompt and, inside it, used `span` elements to represent the typed text. Here's a snippet of the HTML:

```html
<nav class="nav-top">
    <!-- Other navigation items -->
</nav>

<div class="terminal__prompt--typing">
    <div class="cover cover--whoami"></div>whoami
</div>
<div class="terminal__prompt--whoami-return">
    <span>
        <a href="/">Calebe94</a>
    </span>
</div>

<!-- Other content -->

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

## CSS for the Typing Animation

The magic of the animation lies in CSS keyframes. I defined two keyframes: one to type the text character by character and another to make the cursor blink. Here's the CSS code:

```css
/* Typing animation for whoami */
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

/* Blinking cursor animation */
@keyframes blink {
    0%, 100% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
}
```

## Putting It All Together

To apply the typing animation and blinking cursor to my HTML elements, I used CSS animations. I attached the animations to the appropriate elements. Here's how it's done:

```css
/* Applying the typing animation for whoami */
.terminal__prompt--typing .cover--whoami {
    animation: typing-whoami 10s steps(6, end) 1 normal both;
}

/* Applying the blinking cursor animation for whoami */
.terminal__prompt--whoami-return {
    animation: show-whoami-return 10s 1 normal both;
}

/* Applying the typing animation for pwd */
.terminal__prompt--typing .cover--pwd {
    animation: typing-pwd 10s steps(3, end) 1 normal both;
}

/* Applying the output display animation for pwd */
.terminal__prompt--pwd-return {
    animation: show-pwd-return 10s 1 normal both;
}
```

## Similar Projects

If you're interested in creating terminal-style animations, you can also explore these related projects and resources:

1. **Typewriting.js**
   An example of terminal-style text typing animation using JavaScript.
   [See project](https://www.cssscript.com/terminal-style-text-typing-animation-typewriting-js/)

2. **Retro Terminal Blog Style**
   A blog post exploring how to create a retro terminal style for your blog.
   [See post](https://archive.casouri.cc/note/2018/retro-terminal-blog-style/)

3. **Typing Window**
   A tutorial on creating a text typing window with a terminal effect.
   [See tutorial](https://gmarini.com/blog/blog/coding/2020-08-10-typing-window/)

4. **CSS Tricks - Typewriter Effect**
   A snippet demonstrating how to create a typewriter effect using only CSS.
   [See example](https://css-tricks.com/snippets/css/typewriter-effect/)

5. **Terminal Animation for Your Website using Typed.js**
   A guide on adding terminal animations to your site using Typed.js.
   [See guide](https://dev.to/shahstavan/terminal-animation-for-your-website-using-typed-js-2hcl)

6. **Typed.js**
   A popular JavaScript library for creating text typing animations on your site.
   [See project](https://github.com/mattboldt/typed.js)

7. **Terminal Animation (CodePen)**
   An example of a terminal animation in an interactive CodePen environment.
   [See example](https://codepen.io/glitchedneon/pen/LYpvdqy)

8. **Termynal**
   A JavaScript library for creating terminal animations on your site with ease.
   [See project](https://github.com/ines/termynal)

Exploring these additional resources can provide more insights and options for adding terminal animations to your project or inspiring new creative ideas.

## Conclusion

Creating this terminal-style CSS animation taught me a lot about the power of CSS keyframes and animations. By meticulously planning and applying my animations to the right elements, I was able to successfully simulate running the `whoami` and `pwd` commands in a terminal.

Web development is all about creativity, and little details like this can make your site stand out. So go ahead and experiment with CSS animations to add that extra touch to your web projects. Happy coding!

---

Feel free to adapt this post to your site, add more details, and include any additional insights or challenges you faced while creating your terminal-style animation. Good luck!

## See also

- [[glossary]] — terms like Keyframe, @keyframes, Typewriter effect, Prompt