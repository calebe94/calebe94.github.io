---
title: Migrating repositories from Gitlab to Github
description: ''
date: '2022-05-30 16:48:12'
tags:
  - EN_US
  - self-hosting
  - git
---

Migrating repositories from Gitlab to Github {#migrando-do-gitlab-para-o-github-1}
================================

At [T2I Group](http://t2igroup.com/) we have a self-hosted instance of
*Gitlab* on a
[VPS](https://en.wikipedia.org/wiki/Virtual_private_server) to host
our repositories.

We used this instance for at least 2 years, until we started having
trouble updating **Gitlab**. We also began to notice that the **Gitlab**
interface was very cluttered and slow.

So we decided to migrate all our repositories to *Github*, since most
developers already know the platform.

Migration process
------------------

To migrate the repositories, I created an account for *T2I Group* on
**Github** and then created some **Organizations** for *FatorBLE*,
*Projeto MIP*, and for the new Projeto MIP, which we called *MIPv2*.

Then I manually imported the repositories by clicking the **"+"**
button on the **Github** homepage.

![](https://media.calebe.dev.br/images/2022-05-30_16-14.png)

Next, I chose the Organization to import the repository into.

![](https://media.calebe.dev.br/images/2022-05-30_16-15.png)

However, this process has a problem. It doesn't import *issues* and
*Merge Requests*.

### Importing issues and merge requests

To do this, I used a project called
[node-gitlab-2-github](https://github.com/piceaTech/node-gitlab-2-github).

This project is very simple to use — just copy the `sample_settings.ts`
file to `settings.ts` and edit the file with the **Gitlab** and
**Github** access keys, then run the project.

On the first run, `node-gitlab-2-github` lists all repositories that the
**Gitlab** access key has access to. With that in hand, just edit the
file with the code, name, and group of the repository on **Gitlab**
and the repository name on **Github**, then run the project.

Done! `node-gitlab-2-github` will import all open and closed *issues* to
Github, along with the *Merge Requests*. If `node-gitlab-2-github`
detects the presence of an open *branch* for the *Merge Request*, it
creates a *Pull Request*. If it doesn't detect one, it creates an
*issue* with the *Merge Request* content.

Conclusion
=========

In a few hours I managed to import dozens of repositories from our
private **Gitlab** instance to **Github**, without losing absolutely
any information in the process.

All projects that had *issues* and *Merge Requests* were successfully
imported to **Github**.

## See also

- [[em-busca-de-uma-interface-git]] — my search for a self-hosted git interface
- [[glossary]] — terms like Merge Request, Pull Request, VPS