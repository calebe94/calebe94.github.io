---
title: 'Basic Development Principles - Suckless'
description: ''
date: '2021-04-17 18:04:26'
tags:
  - EN_US
  - suckless
---

<main>
<center>
# Fundamental Principles

![](http://lh3.ggpht.com/_6p3hNkUNWrQ/SjpEiMoM3TI/AAAAAAAABdE/9lkeDQLzXUY/s800/bg2009061801.gif)

## [TL:DR](https://www.lifewire.com/what-is-tldr-2483633) (I don't want to read everything, but I want to get the basics)
</center>

* Programs should do only one thing, and do it well.
* Programs should work well with other programs.
* Programs should be stupidly simple.
* A single program should have very few features.
* Write programs that handle text streams, because that is the universal interface.

<center>
<!-- [![](https://miro.medium.com/max/1100/1*2nUxLPrQTJ6FMe3-Ca4M_Q.png)](https://medium.com/web-dev-note/kafka-a-message-broker-778b410908e6) -->

## [Unix Philosophy](http://www.linfo.org/unix_philosophy.html)
</center>

There is no standard statement that defines the Unix philosophy.
But if I had to pick one word, it would be [modularity](http://www.linfo.org/module.html),
which refers to a system composed of several components (modules) that work together, and can also be replaced by other modules — simpler or more complex — depending on the need.

Modularity is common in nature, and its application to man-made products (goods and services) is a key factor in the development and advancement of industrial societies.
However, it was relatively little used for computer software before the development of UNIX, and even today its great benefits are not fully exploited by other operating systems, especially (Microsoft) Windows.

A slightly longer and more conventional statement of the Unix philosophy, but which says essentially the same thing, would be: design programs to do only one thing, but do it well, and to work well together with other programs.

<center>
## [Suckless Philosophy](https://suckless.org/philosophy/)
</center>

Many programmers feel proud when their code reaches many lines of code, because they believe that the more lines of code they write, the more progress they have made.
Therefore, the greater the progress, the more skilled they become.

<center>
![](https://media.calebe.dev.br/images/achou-errado.gif)
</center>

Many programmers don't care about code quality.
So, if they can get something to work and it appears to solve the problem, they stick with that solution.

If this line of thinking is used throughout a project's entire development cycle,
we end up with a huge amount of code, broken code, and a completely vulnerable system.

This comes from a total lack of conceptual clarity and consistency during the development process.

<center>
**Code complexity is the mother of messy, hard-to-use, and inconsistent software.**
</center>

Simplicity is at the heart of the Unix philosophy.
The fewer lines of code your code has, the more skilled you have become, and the less your code is <del>shit</del> bad.

<center>
![Rogerinho do Ingá defends free software, culture, and the environment.](https://media.calebe.dev.br/images/meme-2-opa.gif)
</center>

[Unix Philosophy]: http://www.linfo.org/unix_philosophy.html
[Suckless Philosophy]: https://suckless.org/philosophy/
[TL:DR]: https://www.lifewire.com/what-is-tldr-2483633

## See also

- [[tinytoolsh-ferramentas-minuculas-para-produtividade|tinytoolsh]] — tiny tools for productivity
- [[menos-e-mais-i18n-kiss]] — refactoring the blog i18n with KISS and Unix philosophy
- [[glossary]] — terms like Suckless
</main>