# Block Paper Scissors &#8211; React!
~ 2019-03-24T07:36:15+00:00 ~
  
---
I have decided to play around a bit with React Native and see if I can port my pet Ethereum project – Block Paper Scissors – to the React Native platform.

My aim is to make it is faster to iterate on new changes and gain a benefit from cross-platform compatibility with Node (as I do a lot of NodeJS). I have previously built it in Kotlin, so why not React this time!

So far I have spent a couple of hours learning the React Native platform and began the porting process. The first thing I notice is how small the code is necessary to complete my intentions – Java / Kotlin both required numerous Classes in order to get a simple RPC call functional – not so with React!

Get a hang of the Render loop might take a little bit of learning, but for the most part I have managed to get state transitions to respond to my RPC updates. The reactive data-binding is quite nice (just took a bit of getting used to)

Porting the RPC library was a cinch, and because of React’s use of Javascript I do not have to do some horrible interfacing in order to work with JSON.

While I have only spent a couple hours – I already am feeling faster than with Kotlin, and I get a sense that when it comes to styling this app, I will have a lot more flexibility thanks to the ability to use CSS which I am quite used to.

Anyways, I will keep you posted on the result. Take care!

PS – A really cool thing I noticed about React Native –&gt; You can compile it and run it on Chromebooks – yep, you heard that right on a CHROMEBOOK! All that is required is that the model can run Android apps via the Play Store. Then just install Termux, git, nodejs, expo (both CLI and Android App) then you can build and simulate it without needing a PC / Mac / Linux workstation – note: you do not need Linux Apps for Chrome.