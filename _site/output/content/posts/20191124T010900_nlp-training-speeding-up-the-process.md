# NLP Training &#8211; Speeding up the process
~ 2019-11-24T01:09:00+00:00 ~
  
I have been playing around with Natural Language Processing lately and one thing that has become apparent is that training takes a lot of effort.

I have attempted to build a portal to help with generating training datasets. The way it works is that it helps streamline the process of generating content and codifying the entities within it.

It comes with a few features:

- Remote Data Loading (CSV)
- Local CSV Loading
- JSON Exporting
- Quick-loading data-sets
- Multiple Models can be managed (in this example two)
- Streamlined interface for selecting tokens and symbols from content.

When all is said and done it provides a nice formatted output:

~~~
[
  {
    "text":"You can call me any time at 403-123-1234",
    "entities":[
      [ 28, 40, "PHONE"]
    ]
  }
]
 ~~~
