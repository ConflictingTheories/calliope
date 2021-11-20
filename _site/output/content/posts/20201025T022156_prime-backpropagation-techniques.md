# Prime Backpropagation Techniques
~ 2020-10-25T02:21:56+00:00 ~
  
It is widely known that prime numbers continue to fascinate people due to their intrinsically mysterious nature. There are few things are mysterious and ubiquitous in nature as prime numbers.

So much work has been devoted that there are monetary prizes given out to finding new prime numbers that are not previously known. I had until recently believed that this search was only upwards (in that they must always be looking for larger numbers) – but after looking on wikipedia I do not think this is actually the case.

On wikipedia they list the top primes and I noticed that the years do not directly (though definitely tend) towards the upwards trajectory – there are primes which have been found afterwards at lower values (thus we can conclude all methods are probabilistic and do not follow linear computations – it is likely a hashing type of workload in a way similar to blockchain PoW).

If this is the case, then there could be a very lucrative possibility of finding new primes without needing to go above and beyond the current highest limits (albeit — it could also be a wasted effort for all one knows). To me this suggests a possibility for a back-propagation technique for working backwards from known primes.

I found such a technique once myself (albeit only tested it for the first 30 odd primes I think as I was doodling it on paper) – but I have always wanted to go back and see if I can revisit that algorithm because at the time it seemed very consistent. I didn’t think about the utility of such a thing at the time because I was focused on finding a technique to go forwards like most people – but now if there is a financial incentive – I may want to revisit my technique (if I can remember how I did it).

All I remember at this time sadly is that it involves a specific prime topology and used a mutating radix system (prime based radix – *p)*

The other component I clearly remember is that it was modeled on a chain-like system of folds – geometric in nature so they only can be unfolded but you cannot predict how they will fold-forward because they fold on the primes.

Once you had a prime number, you needed to have the knowledge of the previous prime if I remember correctly (thus I believe any twin prime would fit the bill nicely as a good starting point). From these two points of data, you could proceed to work backwards and find every prime that came before it (again – sadly only tested it on the first few dozen). This was done using a very consistently ruled unfolding technique whereby a chain of beads (representing numbers) is slowly unfurled all the way back to zero.

Now – If there was only some way of doing this with only one prime number and I think this method would quickly make some findings and could possibly undermine some of the systems built on the very nature of primes themselves.

From Wikipedia :   
*[**<sup>^ †</sup>**](https://en.wikipedia.org/wiki/Great_Internet_Mersenne_Prime_Search#ref_unverified_index%5E_%E2%80%A0) As of October 24, 2020, 53,483,753 is the largest exponent below which all other prime exponents have been checked twice, so it is not verified whether any undiscovered Mersenne primes exist between the 47th (M<sub>[43112609](https://en.wikipedia.org/wiki/43,112,609_(number))</sub>) and the 51st (M<sub>82589933</sub>) on this chart; the ranking is therefore provisional. Furthermore, 94,028,029 is the largest exponent below which all other prime exponents have been tested at least once, so all Mersenne numbers below the 51st (M<sub>82589933</sub>) have been tested.<sup>[\[19\]](https://en.wikipedia.org/wiki/Great_Internet_Mersenne_Prime_Search#cite_note-19)</sup>*