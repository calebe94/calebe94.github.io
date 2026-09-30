---
title: Segurança
description: >-
  Política de segurança do blog.calebe.dev.br — o que está no escopo de
  relatos de vulnerabilidade, o que não está, e como falar comigo.
date: '2026-09-22 00:00:00'
tags:
  - PT_BR
---

# 🔐 Segurança

Este é um blog pessoal estático. Divulgação coordenada de vulnerabilidades é bem-vinda — segue o que realmente importa, para ninguém perder tempo dos dois lados.

## O que é este site

- Site estático em [Quartz 4](https://quartz.jzhao.xyz/), build com Node e publicado no **GitHub Pages** via GitHub Actions.
- Sem contas, sem login, sem banco de dados, sem conteúdo enviado por terceiros, sem cookies. Analytics é o [Plausible](https://plausible.io/) — sem cookies e agregado.
- Não existe painel administrativo, ambiente de staging nem área privada neste domínio.

Isso define o modelo de ameaça: não há sessão para roubar, registro para consultar nem privilégio para escalar. O que sobra é o conteúdo e o pipeline de build.

## No escopo

Se você encontrar qualquer um destes, eu quero saber:

- **Injeção de conteúdo / XSS** — um post, nota ou tag que renderize script controlado por terceiros. O conteúdo é escrito por mim, então isso significa um bug no gerador do site, em um plugin ou no pipeline de markdown/syntax highlighting.
- **Supply chain** — uma dependência ou action de build que seja comprometida e entregue código malicioso no site publicado.
- **Segredos vazados** — token, chave ou credencial commitada no [repositório do blog](https://github.com/Calebe94/calebe94.github.io) ou exposta no build final.
- **Subdomain takeover** — algum host sob `calebe.dev.br` com registro DNS ou CNAME pendurado.
- **Falha de controle de acesso na camada de hospedagem** — algo realmente não público sendo servido.

O relato precisa de uma prova de conceito mínima: a URL exata, os passos, o esperado versus o observado. Relato sem PoC reproduzível é fechado.

## Fora do escopo

Tudo abaixo é propriedade conhecida e intencional desta configuração. Relatos sobre isso são fechados sem correção:

- **`robots.txt`, `sitemap.xml`, `index.xml` (RSS) ou `/.well-known/` serem publicamente legíveis.** Eles existem exatamente para isso. Toda URL do meu sitemap é uma página pública linkada no índice do blog, e todo o conteúdo-fonte está em repositório público — o sitemap não revela nada que já não esteja publicado.
- **Headers de segurança ausentes** (CSP, X-Frame-Options, Permissions-Policy, HSTS e afins) que o GitHub Pages não me deixa definir. Não existe ação sensível que mude estado aqui, então clickjacking de um artigo estático não é achado.
- **Banner de servidor, versão de framework, configuração de TLS** e qualquer outro botão controlado pelo GitHub Pages, não por este site.
- **Saída de scanner automatizado sem impacto demonstrado** — "risco médio", "sensitive path disclosed", "information disclosure" sem apontar nenhum path nomeado e verificável é o exemplo clássico.
- **Rate limiting, brute force e denial of service.** Não há login para quebrar nem endpoint dinâmico que valha estressar.
- **Problemas de autenticação de e-mail (SPF/DKIM/DMARC)** em domínios alheios, e qualquer coisa em outro subdomínio `*.calebe.dev.br` ou em infraestrutura que não é minha — relate ao provedor responsável.
- **Engenharia social**, acesso físico, ou qualquer coisa que exija acesso a uma caixa `@calebe.dev.br`.
- **Self-XSS, tabnabbing** e problemas que exigem a vítima colar código no próprio console.

## Recompensas

**Não existe programa de bug bounty** e **não há recompensa financeira** para este site — é um blog pessoal que eu pago do meu bolso. Se o achado for real e estiver no escopo, eu credito você nesta página e agradeço publicamente.

Relatos que exigem pagamento, ameaçam divulgação ou são claramente templates disparados para vários sites são ignorados.

## Como relatar

- **E-mail:** [contato@calebe.dev.br](mailto:contato@calebe.dev.br) com `[SECURITY]` no assunto.
- **Política legível por máquina:** [`.well-known/security.txt`](https://blog.calebe.dev.br/.well-known/security.txt) (RFC 9116).
- Eu toco isso sozinho, então espere resposta em melhor esforço — normalmente em até uma semana, sem SLA. Se o problema for válido, eu corrijo e aviso quando estiver no ar.
