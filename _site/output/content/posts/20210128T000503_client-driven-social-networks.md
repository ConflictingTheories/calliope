# Client Driven Social Networks
~ 2021-01-28T00:05:03+00:00 ~

So I have been really interested in the idea of client-driven social networks. Previous concepts have been developed which already incorporate this idea, but I feel like a lot of stuff in technology - it has been forgotten and is ripe to be "rediscovered".

#### Client-Driven?

So what do I mean when I say client-driven? I mean that the client is responsible for curating and fetching the data and possibly storing a copy or caching it as well. It may also extend to suggest that they are also relays and network servers of their own.

This would be in contrast to centralized social networks (Twitter, Facebook, etc...) - Centralized social networks hold the data, then you visit the site to access it via their client interface and experience. If you want to see Twitter stuff, you go to Twitter, etc...


#### How would it work?

The user experience has to be polished  a bit, but the concept is somewhat like the following:

[[ mermaid diagram="graph TD;\nA[Alice's Blog] -.- C\nB[Alice's Photos] -.- C{Alice's Feed}\nD[Bob's Blog] -.- F\nE[Bob's Photos] -.- F{Bob's Feed}\nG[Alice's Client]\nH[Bob's Client]\nI[Carol's Client]\nC -.-|shared content| F\nC --> J[Internet]\nF --> J\nJ ---G\nJ --- H\n J --- I" ]]

#### What is a Feed?

A feed is anything which is made available to cache and query - typically these would represent articles, posts, videos, photos, etc. Things you would normally see posted on social media. The type of post would be interpreted by the client, and then the client can choose to take an action or not.

For example - you could have a client which chooses to ignore all photo content, and instead focus on text content. Additionally, you could support various different plugins on your client which could enhance the experience, but as an overlay instead of needing to modify the content itself.

These days, we trust out browser to be our clients - but they do not pull in multiple feeds into a single experience, rather the browser tends to separate each feed and instead redirect you towards those central services.
#### Clients, Clients, everywhere....
In the future - there will many clients - some full-featured, and other lighter. Some will be restictive, and others more free-wheeling - but in each case you will be able to better tailor the experience. It is also likely, that existing services would adopt a feed-like service if it begins to get enough attention.

Anyways - that is all for now. I hope to expand on this concept in more detail with the [Muse.json Standard](/embed/posts/20210103T211300_MusejsonFormatConcept) I am working on.

Cheers! :smile: :boom: