# Calliope &#8211; Static Site Generator
~ 2020-11-07T22:06:05+00:00 ~
  
---
I have begun work on an open source static site generator called Calliope. Calliope was one of the Greek muses and was known to inspire epic poems and the recounting of great adventurers. I hope that Calliope will serve along those lines when it comes to websites – specifically with a focus on speed, functionality, and a separation of content from design.

A lot of website frameworks (such as WordPress which I use on this blog) tend to muddy the waters a little when it comes to the separation of content from design. While they have done a pretty good job of allowing people the simplicity of building rich-content into their sites – they tend to be server-side rendered and bring a lot of baggage. Also – they haven’t fully separated the content and I find myself frequently having to go back and adjust old posts, pages, and the like whenever I change my themes. This is time consuming and tends to result in me just not doing it.

Later I find some pages or posts which are half finished, or they have problems which are unique to the theme. This has made me shirk updating anything other than content, and I have found my posts losing their additional media as a result of this pain. I want to build a more declarative system where I can separate out my content from my templates, my themes, and my layouts.

Enter Calliope – my attempt as such a framework. It aims to provide a quick and easy way to clone content, or swap content between sites and have absolutely no qualms about the design of the site. For publishers – they do not need to worry about what the content is and how to lay it out, but can focus on the layout and the sections of the pages and posts themselves and just drop content into place. Finally, designers can rework themes, focus on new components and plugins and build the styles without concern about layout or content.

By separating everything out, I hope to create a more collaborative framework which works a lot more like a git repo than a website. Finally, I will wrap everything up in a nice and simple Docker image so that it becomes easy for others to get up and running without worrying about the internals.

Keep your eyes peeled and you can follow along at:

https://github.com/ConflictingTheories/calliope

https://git.kderbyma.com/portfolio/calliope-site-generator