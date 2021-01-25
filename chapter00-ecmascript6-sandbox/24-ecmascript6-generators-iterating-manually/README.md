# 24-ecmascript6-generators-iterating-manually
> iterating over generators manually

## Description
Basic example of how to iterate manually over the sequence given by a generator function.

```javascript
const g = numbers();
while (true) {  
  let item = g.next();
  if (item.done) {
    break;
  }
  console.log(`value=${ item.value }`);
}
```

This scaffolding gives you an idea that you can use custom logic (sync and async) while interacting with a generator function.