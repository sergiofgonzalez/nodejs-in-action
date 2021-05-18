# 34 &mdash; Images in advanced CSS layouts
> Illustrates how images behave differently in advanced layouts (grid, flex...) than other elements

In the first image, no CSS is given to the `<img>` element and as a result, we see how the `<div>`s fill out the whole space assigned to them, but not the image.

![Image sizing](docs/images/images_advanced_layout.png)

However, if we style the `<img>` with:

```css
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

we can obtain the same effect:

![Image sizing: stretch](docs/images/images_advanced_layout_stretch.png)