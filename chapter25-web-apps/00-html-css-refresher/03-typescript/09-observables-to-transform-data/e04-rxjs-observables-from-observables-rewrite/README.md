# e04: Using *Observables* to transform data &mdash; *Observables* from *Observables*: a rewrite
> Rewriting an example similar to [05: Observables returning Observables](05-rxjs-observables-returning-observables) to try and *grok* the concept.

In the example, we implement in three different ways a process that simulates the retrieval of the details of a list of elements, as in:
+ you query the database and obtain a list of corresponding product Ids
+ you then use each of the product Ids to fetch each of the product details