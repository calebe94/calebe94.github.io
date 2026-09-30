---
title: Security
description: >-
  Security policy for blog.calebe.dev.br — what is in scope for vulnerability
  reports, what is not, and how to reach me.
date: '2026-09-22 00:00:00'
tags:
  - EN_US
---

# 🔐 Security

This is a static personal blog. Coordinated vulnerability disclosure is welcome — here is what actually matters, so nobody wastes time on either side.

## What this site is

- Static [Quartz 4](https://quartz.jzhao.xyz/) site, built with Node and published to **GitHub Pages** through GitHub Actions.
- No accounts, no login, no database, no user-submitted content, no cookies. Analytics is [Plausible](https://plausible.io/) — cookieless and aggregated.
- There is no admin panel, no staging environment and no private area on this domain.

That shapes the threat model: there is no session to steal, no record to query and no privilege to escalate. What is left is the content and the build pipeline.

## In scope

If you find any of these, I want to know:

- **Content injection / XSS** — a post, note or tag that renders attacker-controlled script. Content is authored by me, so this means a bug in the site generator, in a plugin, or in the markdown/syntax-highlighting pipeline.
- **Supply chain** — a dependency or a build action that gets compromised and ships malicious code to the deployed site.
- **Leaked secrets** — a token, key or credential committed to the [blog repository](https://github.com/Calebe94/calebe94.github.io) or exposed in the built output.
- **Subdomain takeover** — a host under `calebe.dev.br` with a dangling DNS or CNAME record.
- **Broken access control at the hosting layer** — something genuinely non-public being served.

Reports must include a minimal proof of concept: the exact URL, the steps, expected versus observed. Reports without a reproducible PoC get closed.

## Out of scope

Everything below is a known and intentional property of this setup. Reports about these are closed without a fix:

- **`robots.txt`, `sitemap.xml`, `index.xml` (RSS) or `/.well-known/` being publicly readable.** They exist for exactly that purpose. Every URL in my sitemap is a public page linked from the blog index, and the entire content source is a public repository — the sitemap discloses nothing that is not already published.
- **Missing security headers** (CSP, X-Frame-Options, Permissions-Policy, HSTS and friends) that GitHub Pages does not let me set. No sensitive state-changing action exists here, so clickjacking of a static article is not a finding.
- **Server banners, framework versions, TLS configuration** and any other knob controlled by GitHub Pages rather than by this site.
- **Automated scanner output with no demonstrated impact** — "medium risk", "sensitive path disclosed", "information disclosure" with no named, verifiable path being the classic example.
- **Rate limiting, brute force and denial of service.** There is no login to brute force and no dynamic endpoint worth stressing.
- **Mail authentication (SPF/DKIM/DMARC) issues** on unrelated domains, and anything on another `*.calebe.dev.br` subdomain or on infrastructure I do not own — report those to the relevant provider.
- **Social engineering**, physical access, or anything that requires access to a `@calebe.dev.br` mailbox.
- **Self-XSS, tabnabbing**, and issues that need the victim to paste code into their own console.

## Rewards

There is **no bug bounty programme** and **no monetary reward** for this site — it is a personal blog I pay for out of my own pocket. If a finding is real and in scope, I will credit you on this page and thank you publicly.

Reports that demand payment, threaten disclosure, or are clearly templates sent to many sites at once are ignored.

## How to report

- **Email:** [contato@calebe.dev.br](mailto:contato@calebe.dev.br) with `[SECURITY]` in the subject line.
- **Machine-readable policy:** [`.well-known/security.txt`](https://blog.calebe.dev.br/.well-known/security.txt) (RFC 9116).
- I run this alone, so expect a best-effort reply — usually within a week, with no SLA. If the issue is valid I will fix it and tell you when it is live.
