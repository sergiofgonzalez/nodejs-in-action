# 04: Higher-order functions and callbacks &mdash; Hello, UI callbacks!
> a simple TypeScript client application that illustrates the use of callbacks in event handlers

Note the use of generics when querying the HTML document:
```typescript
const btnElement = document.querySelector<HTMLButtonElement>(`#my-btn`);
const infoTextarea = document.querySelector<HTMLTextAreaElement>('#infoArea');
```