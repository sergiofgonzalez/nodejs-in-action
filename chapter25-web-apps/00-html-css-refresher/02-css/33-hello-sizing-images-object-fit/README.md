# 33 &mdash; Hello, sizing images with `object-fit` property
> Illustrates the use of `object-fit` to adapt image sizes to their wrapping boxes.

![object-fit](docs/images/object-fit.png)

Note that to make it work, it is necessary to set the `<img>` width and height to 100%:

```css
.box {
  border: 5px solid darkblue;
  margin: 1em;
  width: 200px;
  height: 200px;
}

img {
  height: 100%;
  width: 100%;
}

.cover {
  object-fit: cover;
}

.contain {
  object-fit: contain;
}

.fill {
  object-fit: fill;
}
```