# Bad Logic! Fix Needed
~ 2019-10-15T07:37:19+00:00 ~
  
---
I just noticed that my puzzle game – [LogiColour](https://kyledm.ca/logicolour/) has a flaw in its circuit logic. The logic blocks that you use to solve the puzzles have a mistake in their calculations.

#### Can you spot the problem?

Now, if you aren’t familiar with the game mechanics you may not be able to spot the error in the top screenshot – I didn’t notice it for years (albeit I haven’t done much with it since I first made it)

The error is that the rules of the “Mixer” block are not acting symmetrically about the colour wheel. The bottom screenshot illustrates the concept. In this example the **Red** is for all purposes considered our **Original Colour** and the **Blue &amp; Yellows** are considered **Additive Colours.** Since blue is the inverse of yellow on the colour wheel, the corresponding colour would be white which when added to any colour will result in the original colour being returned – in this case red. There is also an **Intermediate Colour** which in this case is **Magenta.**

Now – return to the top screenshot and notice the problem. In this example, **Green** is our **Original Colour** and the **Red &amp; Cyan** are our **Additive Colours.** As can be seen, when added red and cyan should cancel out and result in white just as the blue and yellow did, so we should realistically expect to return back our original colour Green, but as can be seen the circuit incorrectly calculates the **intermediate** colour which then is fed into the second mixer and results in white as our result which is incorrect. The correct value of the intermediate colour in this case should have been **Magenta** which when added to red should have returned our Green.

#### How did I miss this?

The solution is actually a bit more complicated than I mentioned. In my current app (with the flaw) it assumes an commutative property for the colours, however – assuming the colours are commutative actually results in a paradox occurring when you flesh out the logic.

ex)

        Red + Magenta = Cyan [R + M = C]  
        Magenta + Red = Green [M + R = G]  
        —  
        M + R != R + M

So, rather than just update the logic table (the game uses lookup tables for the logic blocks), I will have to generate a new logic table that is non-commutative and then rewrite the logic for each block accordingly. This will not impact all of the blocks as the splitter and inverter and deconstructor will remain as is – the demixer block however will also require an update, but only to the logic as the block itself is already non-commutative.

So it looks like I will need to update my code and push a new build to the store to resolve this. Cheers!

PS &gt; Maybe I will now also complete some of the other blocks which I have deferred from my release thus far – namely teleporters, conditional gates, and shifter blocks which I never finished fully.