# Muse.json - A Proposed Standard
~ 2021-01-03T21:13:00+06:00 ~

In continuation of my attempt to help promote and protect freedom of speech - I have been thinking of improvements for my [Calliope](https://calliope.site) Project. One of these ideas I had today and I think it is worth writing down.

The concept is to have a `muse.json` file which sits in the root directory of a website. This file will act as a central manifest for the website and will provide a number of different avenues to gather this information.

Features will include:
- A timestamp and Checksum for Updates and Audit Purposes
- A Sitemap & Declaration of Configuration & Metadata
- An Index of All Pages, Posts, Media, Files, Etc.
    - This index can support multiple locations
        - IPFS, Http/Https, Onion, I2P, and *priorities* and *Weights*
    - This allows you to query the content of the files should one of the mirrors go down, or should you prefer to utilize a particular means (such as TOR)
- An Authentication Protocol
    - While optional - This will allow for a token to be generated for a set period of time (also setup in the muse.json).

This `muse.json` will provide the means for a central config file which provides all the commponents necessary for the content - but doesn't focus on the client or its representation. This provides a simple means of indexing the websites without needing to fully crawl the pages, its also a simple means of performing snapshots and versioning the site. It also provides a useful means of generating a failsafe mechanism without inconveniencing the user. This `muse.json` file can also be queried by crawlers as a means of addressing the difficulty found within the use of the SPA design.

Finally, by have `muse.json` as a standard, websites can start aggregating websites based on their `muse.json` indices rather than needing to crawl everything each time. This will allow for quick content refreshed, part-wise syncing, reduced bandwidth, and in general a simpler process of managing the mapping. It also will form the basis of Calliope's entire build system. So whilst promoting an agnostic data format which can be easily parsed and utilized by anyone who wishes to (and they are encouraged) whilst also providing me a a great way of organizing my content.

PS. As a final note - since it is too often neglected - this standard will have an accessibility focused area with AREA labels associated with the navigation and indexing components allowing for screen readers and other tools to easily manage the navigation and parsing.

I hope you look forward to seeing these changes come about - I will be working towards implementing them within Calliope over the coming weeks as I continue to improve on it.
