# 11 &mdash; CSS box model: standard and alternative models
> illustrates the differences between the standard and alternative box models

In the example, you are given two boxes using the standard and alternative models, and you have to style the alternative one so that they have the same size.

In practice, you just have to conside the parts of the standard box model:

![CSS Box model parts](.../images/css_box_model_example.png)

As such:

```
total_width = 5 + 40 + 300 + 40 + 5
total_height = 5 + 40 + 150 + 40 + 5
```

Therefore, styling the *alternative model box* as:

```css
.alternative {
  box-sizing: border-box;
  width: 390px;
  height: 240px;
}
```

makes both look the same.