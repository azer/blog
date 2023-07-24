---
layout: blog-post.njk
title: Ayrışma Kuralı (Rule of Separation)
desc:
image:
createdAt: "2008-12-17T08:00:00.000Z"
path: "/journal/rule-of-separation"
---

Son zamanlarda auto-generate kod cozumu sunan frameworkler cok moda ve bu yanlisa dusen frameworkler her defasinda gelistiricilere yenilik yapilmiscasina sunuluyor.Ornegin DWR (Direct Web Remoting), Orbited (TCP-Socket), CometD (Bayeux) gibi frameworklerin her biri ayri bir teknoloji gibi sunulsa da hepsi temelde real-time veri transferi yapmaya yarar ve hepsi de birebir ayni teknigi kullanir.Reverse Ajax, Serverside Event Listener ve HtmlFile ActiveX'i.. Saydigim ornekler sadece veri transferi icin yapilmis, arayuz gelistirmek icin yapilanlari saymaya baslasak sonu gelmez.

Bu tip frameworkler belki 20 satir kodla yapilacak isi binlerce satira yayip, dipsiz kuyulara inmeyi denettirebilir, her ornekte gordugum durum bu.Teorik olarak auto-generate kodla herseyi yapmak mumkun olabilir, basit orneklerle de bu teori desteklenebilir.Ancak auto-generate kod, yapilacak is komplekslestikce hem problem uretir hem de cozum yollarini kapatir.Dogru olan client-side programlamayi client-side'da yapmak, arayuzle serverside kismi karistirmamaktir.Eric Raymond'in Unix Philosophy metnini hatirlayalim;

* Rule of Modularity: Write simple parts connected by clean interfaces.
* Rule of Clarity: Clarity is better than cleverness.
* Rule of Composition: Design programs to be connected to other programs.
* **Rule of Separation: Separate policy from mechanism; separate interfaces from engines.**
* Rule of Simplicity: Design for simplicity; add complexity only where you must.
* Rule of Parsimony: Write a big program only when it is clear by demonstration that nothing else will do.
* Rule of Transparency: Design for visibility to make inspection and debugging easier.
* Rule of Robustness: Robustness is the child of transparency and simplicity.
* Rule of Representation: Fold knowledge into data so program logic can be stupid and robust.
* Rule of Least Surprise: In interface design, always do the least surprising thing.
* Rule of Silence: When a program has nothing surprising to say, it should say nothing.
* Rule of Repair: When you must fail, fail noisily and as soon as possible.
* Rule of Economy: Programmer time is expensive; conserve it in preference to machine time.
* Rule of Generation: Avoid hand-hacking; write programs to write programs when you can.
* Rule of Optimization: Prototype before polishing. Get it working before you optimize it.
* Rule of Diversity: Distrust all claims for "one true way".
* Rule of Extensibility: Design for the future, because it will be here sooner than you think.
