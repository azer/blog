---
layout: blog-post.njk
title: "The 'Less is More' Engine"
createdAt: "2025-05-20T00:01:00.000Z"
---

Successful startups have one thing in common: they turn less input to more output.

I call it **the "less is more" engine**; initial mission of the startup should be creating a system that will minimize the cost to build and deliver what the market wants.

It's similar to [thinking fast and slow](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow). The team constructs itself intentionally to activate its fast-mode; and makes it easy to expand on top of its core.

Successful startups are often multiplayer systems easily playable by both experienced and also inexperienced players; and their systems can last across different stages of product development and even pivots. They're semi-structured just enough to have a lean and productive gameplay, with simple and clear goals and a feedback loop that trains its players to be the "Lebron James" of their domains internally. This is really the secret behind 10x startup speed.

To be more specific, here's how we can break down the *less is more* principle for different domains of a startup;

* **Engineering**: Align all technical work to minimize LoC, maximize deployment frequency.
* **Design:** Design in a way to make engineering ship features without needing design.
* **Product / marketing:** Find the most lean solution for a significant problem. Be intentional about [triple constraint](https://en.wikipedia.org/wiki/Project_management_triangle).

# Engineering

Our brains can make only limited number of high quality decisions per day. After that, the decision quality will drop, we'll start having fatigue and it may lead to burn out.

A good technical foundation tends to minimize the number of decisions a team needs to make while building & delivering features. Good abstractions not only hide irrelevant complexity, they'll also save the team from the cost of irrelevant decision making. I've seen this butterfly effect on quality and speed many times: engineering focus shifts to product, teams eliminate counter-productive coordination on things that don't matter for early success, and the overall quality of decision-making improves.

A good technical foundation will provide the engineering team the right abstractions, tailored for what their need. It'll not only reduce development cost, but also hide irrelevant details, so the engineers can focus on building on top of them without being distracted.

Compare developing with an omakase framework like Ruby on Rails and setting up a simple app with a complex microservices architecture from day 1, using different languages and frameworks. In one case, your focus will be product. In the other one, it won't.

A good technical foundation should eliminate the need to write new code for every feature. For example, imagine a backend system designed so that the frontend can build multiple features on top of it — without requiring backend changes each time. This leads to several advantages:

* Less LoC / dev cost, faster & more output
* Decoupled backend from business logic, less cost for potential pivot
* Less decisions to make
* Less coordination cost

This might remind people of GraphQL. If we re-think about it; GraphQL doesn't actually reduce costs — it just shifts them around. It introduces frontend developers to an entirely new layer of complexity, forcing them to create custom queries for each data requirement while hiding the underlying complexity. In my experience, simpler alternatives like structured JSON APIs with consistent retrieval conventions both reduce development costs and scale better. For instance, in my recent projects, I've used two small libraries —[bind](https://github.com/azer/bind) and [carve](https://github.com/azer/carve)— that embrace this simpler structured JSON API approach.

In other words, engineering team need have two modes of working. The 'fast mode' (which is now vibe coding with AI); expanding functionalities, shipping features. And the 'slow mode'; focusing on systems & conventions that activates the 'fast mode'.

## Design

Successful startups find a way to establish a good design language and find a way to help engineers ship without needing design work for every feature.

Superhuman is a great example for this. They have very high bar for software and quality in both design and engineering. For example, all user interactions must take less than 100ms (see how fast is their offline search), and all text in the screen must sit on a baseline grid.

Even in their early years, they maintained a high quality bar and ship dozens of features in incredible pace.

Here's how they done it:

![](https://blog.superhuman.com/content/images/size/w1000/2021/10/Command-Palette.png)

Command palette.

For a standard product development team, shipping "Remind me later" feature would mean adding buttons and modals to the app. It'd take minimum 3-4 layout changes and would need designers & engineers to figure out not just how to build it but also how to fit it. It'd need design, QA and engineering to coordinate several times, potentially breaking existing stuff, follow up fixes, etc...

For a typical team, design is adding, removing and changing things on the screen as new features come. They tend to map new functionalities into static layout changes, then put them together with code. This is a slow and expensive way to operate, a failure mode.

For exceptional teams, design is eliminating the need for design.

This is exactly how Superhuman's engineering team could focus solely on business logic and ship dozens of high-quality features in their early days. They first activated the "fast mode" by establishing a system, minimized the steps needed to build and deliver features, then used it to ship features fast in the following years.

And because they had a system to ship features with minimum cost, they could do it hundreds of times.

The less LoC, less design, less coordination, less steps to take a feature from 0 to 1, the more features you can deliver it to market.

If you look closely into successful startups, you'll notice the pattern. They're all "less is more" engines. It's what distinguishes them from the competitors.
