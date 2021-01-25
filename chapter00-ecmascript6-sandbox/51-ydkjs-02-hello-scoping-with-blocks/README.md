# You don't Know JavaScript &mdash; 02: Scope and Closures
## 51 &mdash; Hello, scoping with blocks
> Practising scoping with blocks to limit exposure of variables

### Scoping with Blocks
In general, any `{...}` curly-brace pair which is a statement will act as a block, but not necessarily as a scope. A block only becomes a scope if necessary, to contain its block-scope declarations (i.e. `let` or `const`).

```javascript
{ // opening block: not necessarily a scope (if wouldn't contain let or const
)
  let thisIsNowAScope = true; // now the block becomes a scope

  for (let i = 0; i < 5; i++) { // this is a another inner scope
    if (i % 2 == 0) { // a block, but not a scope
      console.log(i);
    }
  }
}
```

Explicit standalone `{...}` blocks have always been valid JS syntax, but since they couldn't be a scope prior to ES6 `let`/`const` introduction they are quite rare. They become a useful tool for creating a narrow slice of scope for one or a few variables:

```javascript
if (somethingHappened) {
  {
    let msg = somethingHappened.message();
    notifyOthers(msg);
  }

  recoverFromSomethingHappening();
}
```

Note that this pattern also minimizes the risk of a *TDZ (Uninitialized Variables)* situation.

Another example:

```javascript
function getNextMonthStart(dateStr) {
  var nextMonth, year;
  {
    let curMonth;
    [ , year, curMonth ] = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/) || [];
    nextMonth = (Number(curMonth) % 12) + 1;
  }
  if (nextMonth == 1) {
    year++;
  }

  return `${ year }-${ String(nextMonth).padStart(2, '0') }-01`;
}

getNextMonthStart('2019-12-25');
```

Let's identify the scopes:
1. The outer scope (global) which includes the function identifier `getNextMonthStart`
2. The scope defined by the function `getNextMonthStart` which includes `dateStr`, `nextMonth`, `year`
3. The block scope inside the function, which includes `curMonth`.

Declaring `curMonth` in its own block might seem superfluous (it could have been defined along with `nextMonth` and `year`), but as `curMonth` is only needed for those first statements, it make the code aligned with the *POLE (Principle of Least Exposure)*.


## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS, book 2 on [Scopes & Closures](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures).

Especifically, the summary and examples are based on the section [Scoping with Blocks](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md#scoping-with-blocks) section.