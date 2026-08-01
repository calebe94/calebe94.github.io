---
title: In Search of a Self-Hosted Git Interface
description: ''
date: '2022-02-28 00:02:23'
tags: [EN_US]
---

# In Search of a Self-Hosted Git Interface

I was on the hunt for a `git` interface to host my projects on my own server, serving as a sort of portfolio.

I already knew that [gitlab] allows users to create their own instance (self-host) on their servers, and I had hosted a [gitlab] instance on my VPS myself.

However, I found the platform too heavy — it required a lot of RAM, and a fresh install of [gitlab] already consumed **8 GB** of storage.

So I started my search for a `git` interface that was simple and lightweight.

## Beginning the Search

First, I recalled that the [suckless] project hosts its own repositories using a very simple `git` interface.

After some research, I discovered it was [stagit], a tool that generates static pages for your `git` repositories.

I liked the idea behind [stagit], but this tool needs to be run periodically to generate the repository pages (or on every change).

Digging a bit more, I came across a blog post on [paritybit](https://www.paritybit.ca/blog/choosing-a-self-hosted-git-service) mentioning several platforms the author found during their own journey in search of a git server.

[In that post](https://www.paritybit.ca/blog/choosing-a-self-hosted-git-service) the author cites several servers, but one caught my attention for being written in the `C` language.

This software is called [cgit]. What drew me to [cgit] was the fact that it can be run via [CGI](https://www.geeksforgeeks.org/common-gateway-interface-cgi/), and also that it can render pages on every user access (not necessarily on every repository change). [cgit] also meets my requirements of being lightweight and simple, and as a bonus it follows the [suckless] philosophy.

With this information in hand, I decided that [cgit] would be my `git` interface.

## Configuring `cgit`

To get started with configuring [cgit], I read the [cgit] article on the [Arch Wiki](https://wiki.archlinux.org/title/Cgit).

This article clearly describes the steps to install [cgit] on your **VPS**.

After following the installation steps described on the [Arch Wiki](https://wiki.archlinux.org/title/Cgit), I applied a `css` with a [dark theme](https://gist.github.com/Yoplitein/f4b671a2ec70c9e743fa) I found on the internet.

My `css` file for [cgit] can be found in my repository: [cgit](https://git.calebe.dev.br/cgit/).

## Git Server

To view my repositories rendered by [cgit], I need to have my own `git` server, right?

I was able to set up my own `git` server with ease by following the [git reference guide](https://git-scm.com/book/en/v2/Git-on-the-Server-Git-Daemon).

It was straightforward — I ran into no problems following the steps.

After configuring the git server, I simply told [cgit] which directory my repositories were stored in by filling in the configuration file located at `/etc/cgitrepos`.

## Configuring Mirrors

After setting up the git server, I needed to mirror my projects hosted on both [Github] and [Gitlab] onto my server.

For that, I used a script I found on [Github] called [git-mirror].

[git-mirror] is a simple tool written in `shell script`.

To mirror my projects, I created a directory on my computer to store my repositories, then I used the following command to create the mirror:

```sh
git-mirror setup path/to/directory https://someserver.domain/user/tomirror git@someserver.domain/user/mirror
```

This script needs to be called frequently to update the remotes on every change. To do this, the developer created a `systemd` `target` to perform the `update` action every 5 minutes.

Unfortunately, my mirrors are currently configured only on my personal computer, so if I make any changes to my projects and my computer is turned off, those changes won't be visible on my git server at [git.calebe.dev.br](https://git.calebe.dev.br).

And unfortunately, the mirrors are one-way only — that is, only changes pushed to the [Gitlab] and [Github] remotes can be seen on my git server.

Example:

```
    Gitlab              My Server
    HEAD      ---->          Git
      |                       |
   Commit                   Commit
   cb35f94                  cb35f94
```

In the future, I want to figure out a way to create bidirectional mirrors, meaning changes can be made on both remotes.

Example:

```
    Gitlab              My Server
    HEAD      <>---->        Git
      |                       |
   Commit                   Commit
   cb35f94                  cb35f94
```

# Conclusion

Configuring [cgit] is a relatively easy task if you already have knowledge of how [CGI] applications work, how to configure `nginx`, how `ssh` works, and intermediate command-line skills.

By reading the `git` and [cgit] documentation, I was able to host a simple and lightweight git server, accessible at [git.calebe.dev.br](https://git.calebe.dev.br).

[cgit]: https://git.zx2c4.com/cgit/
[Github]: https://github.com/
[Gitlab]: https://gitlab.com/
[suckless]: https://suckless.org/
[stagi]: https://git.codemadness.org/stagit/file/README.html
[git-mirror]: https://github.com/janbaudisch/git-mirror