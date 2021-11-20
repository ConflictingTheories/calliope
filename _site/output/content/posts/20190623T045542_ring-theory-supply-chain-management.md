# Ring Theory : Supply Chain Management
~ 2019-06-23T04:55:42+00:00 ~
  
---
> In fact, many companies today are realising that in the future, supply chains compete against supply chains. To succeed in difficult as well as prosperous economic times, organisations in a supply chain will need to concurrently “step on the brakes,” as well as “step on the gas.”
> 
> <cite>[https://scm.ncsu.edu/scm-articles/article/the-new-supply-chain-mode](https://scm.ncsu.edu/scm-articles/article/the-new-supply-chain-model)</cite>

I recently stumbled across that quote and the article it is cited from and it got me to thinking – why do we always picture a supply chain in a linear fashion? We always have a producer eventually sending the goods into the retailer or consumer. In the reality I think this serves at best a single product or generalised good, but if fails to take into account the underlying complexities in the global supply networks.

One way I visualise it (still a simplification) is through a series of concentric rings instead of a single line of connected boxes. The reason I prefer this model is that it allows me to group many different providers, wholesalers, and more into a model which accounts for competition.

Goods will naturally flow to the edge of the rings and will take the most efficient route to get there. If a piece stops being more and more effective it can be replaced with another position on the ring through a transference process. To me this is a more accurate representation of the supply chain.

<div class="wp-block-image"><figure class="aligncenter">![](https://docs.google.com/a/kderbyma.com/drawings/d/sfgMtedmzsKSz8Evun0yXFA/image?w=507&h=427&rev=663&ac=1&parent=1lJbsYMcIGQZcwJSkbvGWLml33sryr604sqIWyPc8Bow)</figure></div>Taking it even further would be to recognise that the entire supply chain cannot be captured in either of the two above descriptions – instead it will need a large directed graph structure. I imagine that it would have some cycles so you may have to modify it a bit to get a DAG (directed acyclic graph) by duplicate node based on the ring they most closely align with in that particular function (ie. ACME-Producer and ACME-Consumer, ACME being the entity). The problem with DAGs is that they get complex quickly for the casual observer and you might as well wave around a bundle of string in-front of them for the load of good it will tell them from a glance – good for computers but bad for people.

This would suggest that the best way to interface with it would be to extract the information from the giant graph structure and then fandangle it into a concise and pleasing format for the intended function. Here we could simplify the model down and view it in a ring or linear model for the purposes they each can provide.