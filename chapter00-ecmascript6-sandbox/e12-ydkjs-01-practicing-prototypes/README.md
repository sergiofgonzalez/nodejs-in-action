# You don't Know JavaScript &mdash; 01: Get Started
## e12 &mdash; Practicing Prototypes
> Practicing Prototypes

### Description
Define a slot machine with three reels that can individually `spin()`, and then `display()` the current contents of all the reels.

The basic behavior of a single reel is defined in the `reel` object. The slot machine needs individual reels &mdash; objects that delegate to `reel`, and which have a `position` property.

A reel only knows how to `display()` its current slot symbol, but a slot machine typically shows three symbols per reel: the current slot (`position`), one slot above (`position - 1`), and one slot below (`position + 1`). Thus, displaying the slot machine should end up displaying a 3x3 grid of slot symbols.

For example:
```
☺ | ♦ | ★
★ | ♣ | ☾
☾ | ☺ | ☀
```

## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS.
Especifically, this example is based on [Practicing Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/apB.md#practicing-prototypes) section.
