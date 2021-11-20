# Ethereum &#038; Android
~ 2019-01-02T03:37:07+00:00 ~

I started to play around with the Ethereum Blockchain today. I decided I wanted to get my hands a little more dirty than I have previously to date (only ever bought / traded with it), so I decided I would try to setup Geth and create a **light client.**

The different between a Light Client and Full Client is that you aren’t required to synchronize the entire blockchain (I just don’t have the space for that). You can still interact with the blockchain like a full client, except that you technically require a Peer who is a Full client to perform the validations which takes some time to find.

The nice thing about having a light client is I can now begin to play around with the JSON RPC API which you can activate using Geth which now means I can start to work with the network as I wish.

Now that I had a client and an address to begin testing with, I created a very basic Android application to start sending out those RPC calls. I will be honest, I didn’t look around to see if a nice library exists, so instead I just manually drafted up API calls for my node.

The final result(for now) is just very simple application which allows me to read my balance, get my storage information, and see my associated accounts. To see me more, check out my [BlockScan page.](https://kyledm.ca/blockscan/)