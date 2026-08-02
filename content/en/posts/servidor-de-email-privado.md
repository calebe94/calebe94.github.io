---
title: Self-hosted email server
description: ''
date: '2022-03-01 22:21:33'
tags:
  - EN_US
  - self-hosting
  - email
---

### `The saga of frustration`

As I mentioned in a [[em-busca-de-uma-interface-git|previous post]], I have a [Yunohost] instance running on my VPS. [Yunohost] makes it incredibly easy to install your "web" apps on your server and comes with some handy tools to manage everything. One of those tools is the email server, which notifies you if any errors occur during server diagnostics.

You can also set up email forwarding. Users can register a few email addresses on the platform, and whenever an email arrives, `postfix` takes care of delivering it to the user's personal account.

My plan was to use this feature to set up a few addresses like:

* `contato@calebe.dev.br`: contact email;
* `spam@calebe.dev.br`: an email I could use to sign up for random stuff;

I quickly ran some tests and realized it wasn't working. During one of the diagnostics, I noticed that port `25` was blocked by [Digital Ocean].

![Yunohost diagnostics](https://media.calebe.dev.br/images/blog/diagnostico_yunohost.png)

The diagnostics said it was possible to receive emails — but it wasn't actually possible to receive emails.

I sent a test email from my Google account to my [Yunohost] server, and everything worked fine. I received the email successfully.

Well, if the outbound port is blocked, just unblock it, right? Wrong!

## Trying to unblock port `25`

After checking the diagnostics, I went after unblocking port `25`.

I searched the [Digital Ocean] platform for how to unblock it and couldn't find anything.

I tried unblocking it through the [Yunohost] `Firewall`, and it appeared to already be unblocked. I tested sending emails again — nothing.

I opened a ticket with [Digital Ocean] support and the response was:

```
Hi there,

Thank you for contacting DigitalOcean Support!

Stopping spam is a constant fight and due to this, your account has restrictions specifically on port 25.

However, you are able to use mail services using ports 587, 993, 995 and 465. You will need to open these ports in your firewall. Here is our guide to common iptables commands:
```

In other words... the [Yunohost] email server wasn't going to work.

## SMTP Relay

However, [Yunohost] suggests a few alternatives. One of them is an `SMTP Relay`, where I need to subscribe to an external (third-party) service to use the email server.

After some research online, I found [SendGrid], a service by [Twillio]. I actually discovered [Twillio] a few years back when I needed an SMS sending service for a project I was working on. Since I liked the platform, I decided to give [SendGrid] a try.

The documentation instructions were very clear and straight to the point. Configuring everything was straightforward.

Once I finished, I could confirm everything was working — [SendGrid] even offers diagnostics right on its own platform.

I ran a few tests sending emails from a Google account and confirmed I was still receiving emails, but the forwarding still wasn't working. After hours of debugging without finding the issue and [redoing the entire configuration process](https://io.bikegremlin.com/11964/sendgrid-setup/), I decided to let this problem go.


## Conclusion

Searching through online forums, most users discourage running private email servers because they are REALLY hard to deal with.

Many point out that it's much cheaper to subscribe to a service that manages the server and allows creating multiple email addresses.

So that's what I'll be researching over the next few weeks, and I'll document the process in a new post.

[SendGrid]: https://sendgrid.com
[Twillio]: https://www.twillio.com
[Yunohost]: yunohost.org
[Digital Ocean]: https://www.digitalocean.com/

## See also

- [[em-busca-de-uma-interface-git]] — my search for a self-hosted git interface
- [[glossary]] — terms like Yunohost, VPS, Postfix, SMTP Relay, SendGrid