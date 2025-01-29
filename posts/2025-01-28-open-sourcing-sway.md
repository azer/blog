---
layout: blog-post.njk
title: "Open-sourcing Sway"
createdAt: "2025-01-28T22:02:00.000Z"
---

Sway is a video communication tool to replace meetings with more in-person like communication for remote teams. And by today Sway is now open source, available on [Github](https://github.com/azer/sway).

Watch this video to see the Sway in action:

<div class="video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/CAodlTKVt24?si=lN6nAo-aWnMs3tmo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## What's Sway?

The idea behind Sway is basically to reduce coordination cost, which [slows down remote teams by average 20%](https://siepr.stanford.edu/publications/working-paper/evolution-working-home).  Since Covid, I've seen these delays pile up in the teams I lead - it's just the default state of remote work, and every delay has a cost. A quick catch up about a PR review gets delayed to tomorrow, or a quick coordination between 3 people in the office turns into a meeting with 10 people that needs to be scheduled.

To address this pain-point, Sway places an icon in OSX' menubar. You can see your team room and quickly jump in and out of conversations fluidly;

<div class="video">
<video style="border-radius:15px;"  src="https://cldup.com/yBrAsCAwpn.mp4" muted="" autoplay="" playsinline="" loop=""></video>
</div>

In the same menubar popup, users can set their availability status and choose their "flow". Notice how Sway always highlights where the focus is in the UI. Its UI state kept track of focus as well;

<div class="video">
<video style="border-radius:20px;" src="https://cldup.com/djFzb21X40.mp4" muted="" autoplay="" playsinline="" loop=""></video>
</div>

Besides of the menubar shortcut, Sway offers a main window where you could see your entire workspace, chat with others via video or text;

<div class="video">
<video style="border-radius:10px;" src="https://cldup.com/KzoRva8Ajy.mp4" muted="" autoplay="" playsinline="" loop=""></video>
</div>

And in the main window, users can enjoy a very polished command palette which allows users to switch devices just using keyboard;

<div class="video">
<video style="border-radius:15px;" src="https://cldup.com/7RW9AfCoKq.mp4" autoplay="" playsinline="" muted="" loop=""></video>
</div>

Sway's command palette is not just list of commands. You can list / test / switch video / devices devices, or even choose which desktop to share right in the command palette, using only keyboard;

<div class="video">
<img src="https://pbs.twimg.com/media/F9UDoqbXgAA5Nbl?format=jpg&name=large" />
</div>

## Reflections

Looking back, here's the learnings I gathered from building Sway:

**1. Market exhaustion**

Users validate the problems and like the solutions, but they do not want to add another communication product to their setup. They're already exhausted about too many tools.

**2. Privacy worries**

Users are worried that they may accidentally be on camera or microphone in an undesired situation. And a new product -no matter how well it's built- can't guarantee that it will never happen.

**3. Think marketing first, build later**

We often hear advise like: solve a problem you have and care about. I truly cared about this problem and obviously that was not enough; there should be a market with potential customers who's willing to pay for the product. Founders should focus on marketing first, building later.

## What's next?

I'm building [Mitte](https://mitte.ai), an AI image generation & editing platform for creatives, in addition to providing other companies AI research & development through my company [Ray Labs](https://raylabs.ai).
