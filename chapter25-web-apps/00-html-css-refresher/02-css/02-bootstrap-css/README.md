# CSS &mdash; Bootstrap v5 CSS Framework
> Bootstrap v5 CSS frameworks and concepts

## Table of Contents
+ Bootstrap v5 first steps: Breakpoints and containers
  + Breakpoints
  + Containers
+ Basics of Bootstrap's grid system
  + Using *t-shirt sizes* in the column specification
  + Aligning columns vertically and horizontally
  + Spacing your columns with gutters
    + A few words on utility classes: remembering the CSS box model
    + Horizontal and vertical gutters
+ Buttons
+ Cards



## Bootstrap v5 first steps: Breakpoints and containers

Bootstrap is the most popular CSS framework. It enables web developers to quickly design responsive, mobile-first sites.

### Breakpoints

Bootstrap define a series of *t-shirt sizes* for the dimensions of the screen. Those are used to control how the layout *responds* to different screen sizes. These are known as breakpoints.

Breakpoints are used across the board for many Bootstrap elements: from its grid system, to containers, buttons, etc.

The following table illustrates this idea:

| T-Shirt size (breakpoint) | Class infix | Active for screens...  |
| :-- | :-- | :-- |
| Extra-Small | (none) | < 576px |
| Small | `sm` | ≥ 576px |
| Medium | `md` | ≥ 768px |
| Large | `lg` | ≥ 992px |
| Extra Large | `xl` | ≥ 1200px |
| Double-XL | `xxl` | ≥ 1400px |

| NOTE: |
| :---- |
| Breakpoints can be customized, but there is no reason to do so. |

### Containers

Containers are the most basic element in Bootstrap, and are required when using Bootstrap's grid system.

The most basic container is:

```html
<div class="container border">Content</div>
```

![Bootstrap container](images/bootstrap_container.png)

| NOTE: |
| :---- |
| `.border` is used to demarcate the area that the container spans in a very easy way. |


This will result in a container that will be centered horizontally and that will feature some margins to the left and right of the container until the dimension of the screen hits 576px. Screens smaller than 576px will feature no margins for the basic container.

![Bootstrap container: Extra Small Screens](images/bootstrap_container_xsm.png)

Another popular container is the `.container-fluid`, which will use 100% of the available width:

```html
<div class="container-fluid border">Content</div>
```

![Bootstrap container fluid](images/bootstrap_container_fluid.png)

You can mix the basic container with the t-shirt sizes to make the basic container behave as container-fluid when that breakpoint is reached.

For example, you can use the code below to make a container behave as a container-fluid for widths below 1200px and start adding margins above that width:

```html
<div class="container-xl border">Content</div>
```

![Container XL below breakpoint](images/container-xl_small_screens.png)


![Container XL above breakpoint](images/container-xl_large_screens.png)

| NOTE: |
| :---- |
| The size suffix in containers establish the breakpoint from where the container behaves as a container-fluid and removes the extra margin. As an example, adding the class `container-md` will ensure that no margins are present below widths of 768px. |


As a summary:

+ `.container` &mdash; will feature right and left margin for screens larger than the extra small breakpoint (576px)
+ `.container-fluid` &mdash; will span the whole width of the screen
+ `.container-*` &mdash; will behave as a container fluid below the established size (no margins), and as a container (with margins) above that.

| EXAMPLE: |
| :------- |
| See [02: Hello, Bootstrap containers!](02-hello-containers) for a runnable example illustrating these concepts. |

## Basics of Bootstrap's Grid System

The grid system is the fundamental mechanism in Bootstrap to build mobile-first layouts. It lets you structure a page in a responsive way as a series of rows and columns.

The grid system gives you 12 available *width units* that you can use to accommodate your elements in each row.

| NOTE: |
| :---- |
| As a result, you can have a maximum of 12 columns per row. |


Three elements are involved whe using the grid system:
  + a container &mdash; which will host the grid
  + rows &mdash; used to set out the content vertically
  + columns &mdash; used to set out the content horizontally

When using the grid system, you don't have to explicitly fill out the 12 columns. You can use the columns that you need (up to 12), and Bootstrap will do the math for you and span the 12 available width units.

For example, if you do:

```html
<div class="container-md border">
  <div class="row">
    <div class="col">Col 1</div>
    <div class="col">Col 2</div>
  </div>
</div>
```

![Grid 2 columns](images/grid_2_cols.png)

See how Bootstrap has used the 12 available units by creating two equally sized columns that take up the whole width of the container.

Now, if you include more columns, it will do similarly and span the same width with 4 equally sized columns:

```html
<div class="container-md border">
  <div class="row">
    <div class="col">Col 1</div>
    <div class="col">Col 2</div>
  </div>
</div>
```

![Grid 4 columns](images/grid_4_cols.png)


You can add more rows by simple using `.row` as seen below:

```html
<div class="container-md border">
  <div class="row">
    <div class="col">Col (1, 1)</div>
    <div class="col">Col (1, 2)</div>
    <div class="col">Col (1, 3)</div>
    <div class="col">Col (1, 4)</div>
  </div>
  <div class="row">
    <div class="col">Col (2, 1)</div>
    <div class="col">Col (2, 2)</div>
    <div class="col">Col (2, 3)</div>
    <div class="col">Col (2, 4)</div>
  </div>
</div>
```

![Grid 2x4](images/grid_2x4.png)


Obviously, your are not restricted to have the same amount of columns in every row:

```html
<div class="container-md border">
  <div class="row">
    <div class="col">Col (1, 1)</div>
    <div class="col">Col (1, 2)</div>
    <div class="col">Col (1, 3)</div>
    <div class="col">Col (1, 4)</div>
  </div>
  <div class="row">
    <div class="col">Col (2, 1)</div>
    <div class="col">Col (2, 2)</div>
    <div class="col">Col (2, 3)</div>
  </div>
  <div class="row">
    <div class="col">Col (3, 1)</div>
    <div class="col">Col (3, 2)</div>
  </div>
  <div class="row">
    <div class="col">Col (4, 1)</div>
  </div>
</div>
```

![Grid with different cols](images/grid_different_cols.png)

Up until now, we have only used layouts with equally sized columns, but Bootstrap's grid system allows you to have columns of different sizes.

The following snippet will create a first column taking 4 of the 12 available units, and a second column taking the remaining 8 ones:

```html
<div class="container-md border">
  <div class="row">
    <div class="col-4">Col 1</div>
    <div class="col">Col 2</div>
  </div>
</div>
```

![Differently sized cols](images/grid_differently_sized_cols.png)


| NOTE: |
| :---- |
| See how Bootstrap does not require you to specify the size of the second column. But default, Bootstrap will do the math for you and make the second column span the remaining units. |

The grid system also allows you *not* to use the whole units and leave space to the right:

```html
  <div class="container-md border">
    <div class="row">
      <div class="col-4">Col 1</div>
      <div class="col-2">Col 2</div>
    </div>
  </div>
```

![Leaving space](images/grid_differently_sized_cols_leaving_space.png)

See how this time we define our second to be 2 units wide, so that 6 units are left unused to the right of the row.

### Using t-shirt sizes in the column specification

The latest feature with regards to the grid system consists in also using the *t-shirt sizes* so that you not only specify how you want to look in larger screens, but also how they should be accommodated on smaller ones.

| NOTE: |
| :---- |
| You are encouraged to use both column sizes and *t-shirt sizes* when using Bootstrap grid system to provide flexible layouts. |

For example, the following snippet:

```html
<div class="container-md border">
  <div class="row">
    <div class="col-md-8">Col 1 (col-md-8)</div>
    <div class="col-md-4">Col 2 (col-md-4)</div>
  </div>
</div>
```

will create a layout consisting in two differently sized columns that will be set out in one row for screen sizes larger than the md breakpoint (768px), and that will change into a 2x1 layout with equally sized columns below that breakpoint.

![grid system with t-shirt: large screen](images/grid_t-shirt-md_large_screens.png)

![grid system with t-shirt: small screen](images/grid_t-shirt-md_small_screens.png)


But there's yet another twist: you can also mix and match multiple `.col-*-*` specifications, so that the columns are sized differently depending on the width of the viewport.

For example:

```html
<div class="container-md border">
  <div class="row">
    <div class="col-lg-8 col-md-6">Col 1 (col-lg-8/col-md-6)</div>
    <div class="col-lg-4 col-md-6">Col 2 (col-lg-4/col-md-6)</div>
  </div>
</div>
```

The previous code snippet will behave as follows:
+ For screens wider than 992px it will feature two colums taking 8 and 4 width units respectively.

![Multiple specs: large](images/grid_multiple_specs_large.png)

+ For screens between 768px and 992px it will feature two equally sized columns taking 6 units each.

![Multiple specs: medium](images/grid_multiple_specs_medium.png)

+ For screens narrower than 768px it will feature a 2x1 layout with the columns taking the whole width of the viewport.

![Multiple specs: small](images/grid_multiple_specs_small.png)

### Aligning columns vertically and horizontally

You will also need to know how to align your columns both vertically and horizontally.

To vertically align your row to the top of the available space you can use `.align-items-start` in your row specification.

```html
<div class="container-md border">
  <div class="row align-items-start" style="height: 200px">
    <div class="col">Col 1</div>
    <div class="col">Col 2</div>
    <div class="col">Col 3</div>
  </div>
</div>
```

| NOTE: |
| :---- |
| A specific height is given to the row to illustrate the effect. Otherwise, the row will by default take only the required space. |

![Vertical alignment: top](images/grid_vertical_alignment_top.png)

Similarly, you can use `.align-items-center`:

```html
<div class="container-md border">
  <div class="row align-items-center" style="height: 200px">
    <div class="col">Col 1</div>
    <div class="col">Col 2</div>
    <div class="col">Col 3</div>
  </div>
</div>
```

![Vertical alignment: center](images/grid_vertical_alignment_center.png)

And `.align-items-end`:

```html
<div class="container-md border">
  <div class="row align-items-end" style="height: 200px">
    <div class="col">Col 1</div>
    <div class="col">Col 2</div>
    <div class="col">Col 3</div>
  </div>
</div>
```

![Vertical alignment: bottom](images/grid_vertical_alignment_bottom.png)


For the horizontal alignment, you can use `.justify-content-center` in your row:

```html
<div class="container-md border">
  <div class="row justify-content-center">
    <div class="col-2">Col 1 (.col-2)</div>
    <div class="col-4">Col 2 (.col-4)</div>
  </div>
</div>
```

![Horizontal alignment: center](images/grid_horizontal_alignment_center.png)

And you can use the following classes to align to the left, right, or to distribute the space in different ways:
+ `.justify-content-start` &mdash; align to the left (in L2R)
+ `.justify-content-end` &mdash; align to the right (in L2R)
+ `.justify-content-around`, `.justify-content-between`, `.justify-content-evenly` &mdash; different ways to distribute the space (see below)

![Horizontal alignment: other](images/grid_horizontal_alignment_other.png)

### Spacing your columns with gutters

Gutters are used to introduce padding between your column content, in a responsive way.

#### A few words on utility classes
The gutters use a mechanism that is also used in many other places in Bootstrap, the *utility classes*.

In particular, you can use something like `my-*`, with `*` being a number to add margin in the y-axis, and `mx-*` to add margin in the x-axis. Similarly, you can use `py-*` and `px-*` for the padding.


##### The CSS Box Model in a nutshell

An element in HTML is made of two major components:
+ the **content** box
+ the **border** box &mdash; a rectangular border that surrounds the content.

These components demarcate a few additional areas of interest:
+ the **padding** &mdash; the area between the content and the border.
+ the **margin** &mdash; the area surrounding the border that creates the space between adjacent HTML elements.


![Parts of a CSS box](../01-vanilla-css/images/parts_of_block_box.png)


There are two ways of specifying the dimensions of a given element:
+ **The standard box model** &mdash; the `width` and `height` attribute of the element defines the width and height of the content box. When using this model, to get the total size taken by an element on the screen. you have to add the padding and border.

+ **The alternative box model**/**border-box model** &mdash; the `width` and `height` includes the padding and the border:

Bootstrap uses the `.border-box`, alternative CSS box model. This means that in Bootstrap, an element with the following CSS rule:

```css
.box {
  width: 350px;
  height: 150px;
  margin: 10px;
  padding: 25px;
  border: 5px solid black;
}
```

will have:

![CSS alternative box model](../01-vanilla-css/images/css_alternative_box_model.png)





| NOTE: |
| :---- |
| You can review the box model concepts here [The box model](../01-vanilla-css/README.md#the-box-model) and [What is the CSS box model?](../01-vanilla-css/README.md#what-is-the-css-box-model). |


In summary, by using:

```html
<h2 class="text-center">Gutters</h2>
<div class="container-md border my-5">
```

We are ensuring 5 units of margin between the contents of the `<h2>` and the subsequent container.

#### Horizontal and vertical gutters

Now, back to the gutters. Gutters are applied in the rows to apply spacing between the columns.
These are used to maintain the space in the x- and y- axis in the complex scenarios:

For example, the following screenshot compares two columns when using and not using horizontal gutters:

```html
<div class="container border">
  <div class="row gx-5">
    <div class="col">
      <div class="border bg-light">Col 1 content with .gx-5</div>
    </div>
    <div class="col">
      <div class="border bg-light">Col 2 content with .gx-5</div>
    </div>
  </div>
</div>
```

![Horizontal gutters](images/gutters_horizontal.png)

The easiest way to see the vertical gutters in action can be achieved creating a row that exceeds the 12 units:

```html
<div class="container border">
  <div class="row gy-5">
    <div class="col-6">
      <div class="border bg-light">Col 1 content with .gy-5</div>
    </div>
    <div class="col-6">
      <div class="border bg-light">Col 2 content with with .gy-5</div>
    </div>
    <div class="col-6">
      <div class="border bg-light">Col 3 content with with .gy-5</div>
    </div>
    <div class="col-6">
      <div class="border bg-light">Col 4 content with with .gy-5</div>
    </div>
  </div>
</div>
```

![Vertical gutters](images/vertical_gutters.png)


You can also use the `.g-*` class to apply both vertical and horizontal gutters:

```html
<div class="container border">
  <div class="row g-5">
    <div class="col-6">
      <div class="border bg-light">Col 1 content with .g-5</div>
    </div>
    <div class="col-6">
      <div class="border bg-light">Col 2 content with with .g-5</div>
    </div>
    <div class="col-6">
      <div class="border bg-light">Col 3 content with with .g-5</div>
    </div>
    <div class="col-6">
      <div class="border bg-light">Col 4 content with with .g-5</div>
    </div>
  </div>
</div>
```

![Gutters: vertical and horizontal](images/gutters_vertical_and_horizontal.png)


In a real scenario, vertical gutters will kick in when you reach the breakpoint beyond where the columns are stacked, instead of being set out in a row:

![Gutters: large screen](images/gutters_large_screen.png)

![Gutters: large screen](images/gutters_small_screen.png)


| EXAMPLE: |
| :------- |
| See [03: Hello, Bootstrap grid system!](03-hello-grid-system) and [04: More on gutters!](04-more-on-gutters) for a runnable example illustrating the concepts in this section. |

#### Exercise 1: Practicing the Grid system

Using Bootstrap's grid system, reproduce the following layout:

![Exercise 1: grid system](images/exercise-1_grid_layout.png)

| Solution: |
| :------- |
| See [e01: Practicing the Grid layout!](e01-practicing-grid-layout) for the solution. |

## Buttons

Buttons are one of the most popular components of Bootstraps.

They include several predefined styles that allows you to give semantic purpose to them, and they also come in different sizes and appearance.

The following snippet shows how to create regular buttons.

```html
<div class="container">
  <button type="button" class="btn btn-primary">Primary</button>
  <button type="button" class="btn btn-secondary">Secondary</button>
  <button type="button" class="btn btn-success">Success</button>
  <button type="button" class="btn btn-danger">Danger</button>
  <button type="button" class="btn btn-warning">Warning</button>
  <button type="button" class="btn btn-info">Info</button>
  <button type="button" class="btn btn-light">Light</button>
  <button type="button" class="btn btn-dark">Dark</button>
  <button type="button" class="btn btn-link">Link</button>
</div>
```

You can also create those same buttons with different appearance (outline).

```html
<div class="container">
  <button type="button" class="btn btn-outline-primary">Primary</button>
  <button type="button" class="btn btn-outline-secondary">Secondary</button>
  <button type="button" class="btn btn-outline-success">Success</button>
  <button type="button" class="btn btn-outline-danger">Danger</button>
  <button type="button" class="btn btn-outline-warning">Warning</button>
  <button type="button" class="btn btn-outline-info">Info</button>
  <button type="button" class="btn btn-outline-light">Light</button>
  <button type="button" class="btn btn-outline-dark">Dark</button>
  <button type="button" class="btn btn-outline-link">Link</button>
</div>
```

Buttons come in three different sizes: `.btn-lg`, `.btn-sm` and the regular one:

```html
<div class="container">
  <button type="button" class="btn btn-primary btn-lg">Large button</button>
  <button type="button" class="btn btn-primary">Regular button</button>
  <button type="button" class="btn btn-primary btn-sm">Small button</button>
</div>
```

Buttons can be disabled using the `disabled` attribute as seen below:

```html
<div class="container">
  <button type="button" class="btn btn-primary" disabled>Disabled button</button>
  <button type="button" class="btn btn-primary">Enabled button</button>
</div>
```


![Buttons](images/buttons.png)


| EXAMPLE: |
| :------- |
| See [05: Buttons in action!](05-buttons) for a runnable example. |

## Cards

Cards provide a very flexible way to host content for your pages. It includes options to include images, headers and footers, etc.

The most basic card markup for the card follows below:

```html
<div class="container my-5">
  <div class="card" style="width: 18rem;">
    <img src="https://picsum.photos/300/200" class="card-img-top" alt="Lorem picsum 300x200">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Asperiores optio a blanditiis voluptatibus ea aperiam id
        velit eos ipsam?
      </p>
    </div>
  </div>
</div>
```

![Card with image](images/card_img_top_fixed_width.png)


See how you have to specify the width. If you don't specify the size, the image will take the whole available width.

For the sizing there are a few available options:
+ use the `style="width= nrem;"` as seen above
+ you can use the grid system as seen in the first example below


```html
<div class="container my-5">
  <div class="row">
    <div class="col-4">
      <div class="card">
        <img src="https://picsum.photos/300/200" class="card-img-top" alt="Lorem picsum 300x200">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

The snippet above creates a card that takes 1/3 of the space, as it uses `col-4`.

![Card sizing: grid](images/card_sizing_grid.png)


+ you can use the utility classes like `w-75`:

```html
<div class="container my-5">
    <div class="card w-75">
      <img src="https://picsum.photos/300/200" class="card-img-top" alt="Lorem picsum 300x200">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
</div>
```

In this example, we create a card that takes up 75% of the available width.

![Card sizing: grid](images/card_sizing_utilities.png)

One of the powerful features of cards is that you can compose a very complex card using flexible markup. For example, a bare-bones `.card` will create a panel:

```html
<div class="container my-5">
  <div class="row">
    <div class="col-6">
      <div class="card text-center">
        Lorem ipsum dolor sit amet.
      </div>
    </div>
  </div>
</div>
```

![Card: barebone panel](images/card_barebones_panel.png)


Just by adding a `.card-body` markup, the panel will look much nicer:

```html
<div class="container my-5">
  <div class="row">
    <div class="col-6">
      <div class="card text-center">
        <div class="card-body">
          Lorem ipsum dolor sit amet.
        </div>
      </div>
    </div>
  </div>
</div>
```

![Card: with card body](images/card_with_card_body.png)

And if you just add an `<img>` element on top of your card body, you'll obtain a simple card with an image and a body:

```html
<div class="container my-5">
  <div class="row">
    <div class="col-6">
      <img src="https://picsum.photos/300/200" class="card-img-top" alt="Lorem picsum 300x200">
      <div class="card text-center">
        <div class="card-body">
          Lorem ipsum dolor sit amet.
        </div>
      </div>
    </div>
  </div>
</div>
```

![Card: panel with image](images/card_panel_with_image.png)


Or you can add a header and a footer:

```html
<div class="container my-5">
  <h2>A panel with an image and some text</h2>
  <div class="row">
    <div class="col-6">
      <div class="card">
        <div class="card-header">Card header</div>
        <div class="card-body">
          Lorem ipsum dolor sit amet.
        </div>
        <div class="card-footer text-muted">Card footer</div>
      </div>
    </div>
  </div>
</div>
```

![Card: header and footer](images/card_header_and_footer.png)

You get the idea, you can compose your card just by adding more and more markup: from the bare-bones panel, to the card with header, footer, image, etc.

You can also change the default layout to create horizontal cards:

```html
<div class="container my-5">
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-4">
        <img src="https://picsum.photos/200/300" class="img-fluid rounded-start" alt="Lorem picsum 200x300">
      </div>
      <div class="col-8">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis maiores est nam ipsa totam, dolorem accusantium voluptate incidunt tempora voluptates!</p>
          <p class="card-text"><small class="text-muted">Last updated 5 centuries ago</small></p>
        </div>
      </div>
    </div>
  </div>
</div>
```

![Card: horizontal](images/card_horizontal.png)


Or create groups of cards and set them out side-by-side:

```html
<div class="container my-5">
  <div class="card-group">
    <div class="card">
      <img src="https://picsum.photos/300/200" class="card-img-top" alt="Lorem picsum 300x200">
      <div class="card-body">
        <h5 class="card-title">Left card title</h5>
        <p class="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur modi numquam nam doloremque, quas nemo accusamus ea quisquam ullam temporibus.</p>
        <p class="card-text"><small class="text-muted">Last updated 5 seconds ago</small></p>
      </div>
    </div>
    <div class="card">
      <img src="https://picsum.photos/300/200" class="card-img-top" alt="Lorem picsum 300x200">
      <div class="card-body">
        <h5 class="card-title">Middle card title</h5>
        <p class="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, architecto deserunt totam rem animi veniam?</p>
        <p class="card-text"><small class="text-muted">Last updated 5 mins ago</small></p>
      </div>
    </div>
    <div class="card">
      <img src="https://picsum.photos/300/200" class="card-img-top" alt="Lorem picsum 300x200">
      <div class="card-body">
        <h5 class="card-title">Right card title</h5>
        <p class="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, eaque?</p>
        <p class="card-text"><small class="text-muted">Last updated 5 hours ago</small></p>
      </div>
    </div>
  </div>
</div>
```

![Card group](images/card_group.png)


You can also customize the color of your card using Bootstrap semantic color schemes:

```html
<div class="container my-5">
  <div class="row">
    <div class="col-4">
      <div class="card text-white bg-primary mb-3">
        <div class="card-header">Primary color header</div>
        <div class="card-body">
          <h5 class="card-title">Primary card title</h5>
          <p class="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae sint ipsa atque.</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

![Card_colors](images/card_colors.png)

See that the markup uses the `.bg-primary` class to display the card using the primary color.

Similarly, you can adjust only the outline using `.border-primary`

```html
<div class="container my-5">
  <div class="row">
    <div class="col-4">
      <div class="card border-primary mb-3">
        <div class="card-header">Primary color header</div>
        <div class="card-body text-primary">
          <h5 class="card-title">Primary card title</h5>
          <p class="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae sint ipsa atque.</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

![Card: border color](images/card_border_color.png)


See that it uses `.border-primary` to specify the color of the border and then `.text-primary` to adjust the color of the card body text.

| EXAMPLE: |
| :------- |
| See [06: Cards in action!](06-cards) for a runnable example in which you can see cards in action and practice the different concepts of the previous section. |

## Typography

Bootstraps sets some basic styling regarding typography, so that you don't have to provide your own.

Headers require no classes, only HTML markup:

```html
<div class="container my-5">
  <h1>Header 1</h1>
  <h2>Header 2</h2>
  <h3>Header 3</h3>
  <h4>Header 4</h4>
  <h5>Header 5</h5>
  <h6>Header 6</h6>
</div>
```

![Headers](images/headers.png)

Note also that the actual computed sizes of the headers are adjusted with the viewport size.

For convenience, Bootstrap also defines some classes that you can use to obtain the same styling as the real headers for other HTML elements, for example, paragraphs:

```html
<div class="container my-5">
  <p class="h1">Heading 1 look-alike</p>
  <p class="h2">Heading 2 look-alike</p>
  <p class="h3">Heading 3 look-alike</p>
  <p class="h4">Heading 4 look-alike</p>
  <p class="h5">Heading 5 look-alike</p>
  <p class="h6">Heading 6 look-alike</p>
</div>
```

Bootstrap also comes with display headings with a slightly bigger style to make them stand out:

```html
<div class="container my-5">
  <h1 class="display-1">Heading 1</h1>
  <h2 class="display-2">Heading 2</h2>
  <h3 class="display-3">Heading 3</h3>
  <h4 class="display-4">Heading 4</h4>
  <h5 class="display-5">Heading 5</h5>
  <h6 class="display-6">Heading 6</h6>
</div>
```

![Display headings](images/headings_display.png)


Bootstrap also features a lot of inline elements for semantic and styling purposes:

```html
  <div class="container my-5">

    <!-- highlight -->
    <p>Lorem ipsum <mark>dolor</mark> sit amet.</p>

    <!-- deleted & striked-out text -->
    <p>Lorem ipsum <del>dolor sit</del> amet.</p>
    <p>Lorem ipsum <s>dolor sit</s> amet.</p>

    <!-- inserted & underlined text -->
    <p>Lorem ipsum <ins>dolor sit</ins> amet.</p>
    <p>Lorem ipsum <u>dolor sit</u> amet.</p>

    <!-- small -->
    <p>Lorem ipsum <small>dolor sit</small> amet.</p>

    <!-- strong (will show in bold)-->
    <p>Lorem ipsum <strong>dolor sit</strong> amet.</p>

    <!-- emphasis (will show in italics)-->
    <p>Lorem ipsum <em>dolor sit</em> amet.</p>
  </div>
```

![Inline styles](images/inline_styles.png)

It is recommended to use that markup according to its semantic use. For the purpose of styling Bootstrap also provide equivalent classes such as `.mark`, `.del`, etc.


Another interesting example is the blockquote element:

```html
<div class="container my-5">
  <div class="row">
    <!-- Regular blockquote -->
    <div class="col-4">
      <blockquote class="blockquote">
        <p>Lorem ipsum dolor sit amet.</p>
      </blockquote>
    </div>

    <!-- Styled blockquote with footer -->
    <div class="col-4">
      <figure>
        <blockquote class="blockquote">
          <p>Lorem ipsum dolor sit amet.</p>
        </blockquote>
        <figcaption class="blockquote-footer">
          Lorem ipsum <cite title="source title">dolor</cite> sit amet.
        </figcaption>
      </figure>
    </div>

    <!-- Styled blockquote with footer, and text alignment -->
    <div class="col-4">
      <figure class="text-end">
        <blockquote class="blockquote">
          <p>Lorem ipsum dolor sit amet.</p>
        </blockquote>
        <figcaption class="blockquote-footer">
          Lorem ipsum <cite title="source title">dolor</cite> sit amet.
        </figcaption>
      </figure>
    </div>
  </div>
</div>
```

![Blockquotes](images/blockquotes.png)


Finally, we also have lists. The following block of code creates a list with 5 items that include a sublist. The list is *unstyled* so that it doesn't feature any bullets:

```html
<div class="container my-5">
  <div class="row">
    <ul class="list-unstyled">
      <li>List item #1</li>
      <li>List item #2</li>
      <li>List item #3</li>
      <li>List item #4</li>
      <li>List item #5</li>
      <ul>
        <li>Sublist item #1</li>
        <li>Sublist item #2</li>
        <li>Sublist item #3</li>
      </ul>
    </ul>
  </div>
</div>
```

Note that the `.list-unstyled` does not apply to the sublist items:

![List + sublist unstyles](images/list+sublist_unstyled.png)

| NOTE: |
| :---- |
| You can use Emmet to quicly create lists with sample content using `li*5>{List item #$}`. |

Lists are often used to create navigation bars. In those cases, the lists have to arranged horizontally as inline items. This can be achieved using the code below:

```html
<div class="container my-5">
  <ul class="list-inline">
    <li class="list-inline-item">inline list item 1</li>
    <li class="list-inline-item">inline list item 2</li>
    <li class="list-inline-item">inline list item 3</li>
    <li class="list-inline-item">inline list item 4</li>
    <li class="list-inline-item">inline list item 5</li>
  </ul>
</div>
```

![Lists: inline](images/list_inline.png)


| EXAMPLE: |
| :------- |
| See [07: Hello, Boostrap typography!](07-typography) for a runnable example illustrating the basics of this section. |

## Images

Bootstrap provides support for images, so that controlling sizing and overflow becomes a breeze.

Dealing with images has been traditionally challenging, as seen in the snippet below:

```html
<div class="container my-5">
  <div style="width: 25%; border: 2px solid rebeccapurple">
    <img src="images/food_small.jpg" alt="food">
  </div>
</div>
```

Here, we are setting up a `<div>` which will take 25% of the viewport width and we are trying to use it as a container for an image.

However, we can see that the image overflows:

![Image overflow](images/images_overflow.png)


Bootstrap helps you accomplish that, so that you can size images according to the container div using `.img-fluid`:

```html
<div class="container my-5">
  <div style="width: 25%; border: 2px solid rebeccapurple">
    <img class="img-fluid" src="images/food_small.jpg" alt="food">
  </div>
</div>
```

![Images: fluid](images/images_resize_on_parent_div.png)

Note that adding `.img-fluid` to the image will also make the image responsive.


The class `.img-thumbnail` can be used to create a sort of frame around the picture:

```html
<div class="container my-5">
  <div style="width: 25%">
    <img class="img-thumbnail" src="images/food_small.jpg" alt="food">
  </div>
</div>
```

![Image thumbnail](images/images_thumbnail.png)

To align the images you have to use the float utility:

```html
<div class="container my-5">
  <img class="float-end w-25" src="images/food_small.jpg" alt="food">
</div>
```

| NOTE: |
| :---- |
| The `.w-25` CSS class is used to reduce the image in width to 25%. |

![Images: align end](images/images_alignment_end.png)


Note that when using `.float` you need to use `.clearfix` right afterwards to prevent breaking the normal flow of the document as seen below:


```html
<div class="container my-5">
  <img class="float-end w-25" src="images/food_small.jpg" alt="food">
</div>
<!-- this demonstrates how using float breaks the normal flow of the document -->
<p>
  ...really long text that should be place below previous <div>...
</p>
```

![Images: float overflowing](images/images_float_overflowing.png)

See how the text, that was supposed to be placed right below the `<div>` containing the image is surrounding the `<img>`, thus breaking the expected flow of the HTML document.


The following fixes that problem:

```html
<div class="container my-5">
  <h2 class="bg-light">Image alignment: right</h2>
  <img class="float-end w-25" src="images/food_small.jpg" alt="food">
</div>
<!--
  Comment the next div to see the results with and without clearfix
  this demonstrates how using float breaks the normal flow of the document
-->
<div class="clearfix"></div>
<p>
  ...really long text that should be place below previous...
</p>
```

![Images: clearfix](images/images_clearfix.png)

Therefore, `.clearfix` reestablish the normal flow of the document.


You can also align images in the center of the container `<div>` using Flexbox utilities:


```html
<div class="container my-5">
  <img class="d-block mx-auto w-25" src="images/food_small.jpg" alt="food">
</div>
```

![Images: alignment center](images/images_alignment_center.png)

Finally, Bootstrap also provides a class to add a rounded corners to a given image simply adding the `.rounded` class:

```html
<div class="container my-5">
  <img class="d-block mx-auto w-25 rounded" src="images/food_small.jpg" alt="food">
</div>
```

![Images: rounded corners](images/images_rounded_corners.png)


| EXAMPLE: |
| :------- |
| See [08: Images in action!](08-images) for a runnable example that illustrates the concepts of this section. |


## Utilities

Bootstrap provides a wide range of *utility classes* to control concerns such as spacing, alignment, visibility, etc.

All of them use a consistent notation, so that they become really easy to use.

### Spacing utilities

Bootstrap spacing utilities provide a way to control margin, padding.

The general notation is:

```
{property}{sides}[-{breakpoint}]-{size}
```

where property is shorthand for:
+ `m` &mdash; margin
+ `p` &mdash; padding

where sides is shorthand for:
+ `t` &mdash; for top
+ `b` &mdash; for bottom
+ `s` &mdash; for start
+ `e` &mdash; for end
+ `x` &mdash; for horizontal axis
+ `y` &mdash; for vertical axis
+ `` (blank) &mdash; to set on all sides of an element

where `{breakpoint}` is `sm`, `md`, `lg`, `xl`, and `xxl` (blank means is the xs breakpoint < 576px).

where `{size}` is:
+ `0` &mdash; to eliminate (e.g. marging/padding)
+ numbers from `1` to `5` &mdash; different degrees of spacing
+ `auto` &mdash; shorthand for properties that accept this value (e.g. `margin: auto`)

 For example:
 | spacing utility class | description |
 | :-------------------- | :---------- |
 | mt-5 | apply the largest margin top |


The spacing utilities are also used for alignment, such as horizontal centering of elements and content.

For example, the following markup uses `mx-auto` to center a div horizontally on the available space:

```html
<div class="mx-auto mt-5 border border-1 border-dark w-50">
```

### Border utilities

The border utilities let you apply borders to HTML elements using classes.

For example, the following markup defines a dark border of size 1 to a `<div>`:

```html
<div class="border border-1 border-dark">
  ...
</div>
```

### Color utilities

Bootstrap color utilities define a few semantic properties that can be used for both the foreground and background of elements, as well as for text. The suffixes are used in all the corresponding components that accepts colors such as borders, buttons, cards, etc.

Note that you can also specify gradients and opacity, to obtain variants on a given color.

### Sizing utilities

Bootstrap sizing utilities let you specify the size of an element (width/height) using classes:

```html
<div class="w-50 border border-1 border-dark">
  ...
</div>
```

The previous snipped sets the width of the div to 50% of width of the parent.

### Display utilities

Bootstrap display utilities let you change the display properties of an object using predefined classes.

For example, you can use `.d-none` on an object to make it disappear:

```html
<!-- This paragraph won't show up -->
<p class="d-none">
  Lorem ipsum dolor sit amet consectetur adipisicing elit.
</p>
```

The twist, is that Bootstrap allows you to mix display utilities like `.d-none` with the t-shirt size breakpoints to make items appear/disappear depending on the screen size.

For example, the following markup hides the paragraph on screens larger than the *md* breakpoint (768 px):

```html
<!-- hidden on screens larger than 768px -->
<p class="m-5 d-md-none">
  Lorem ipsum dolor sit amet consectetur adipisicing elit.
</p>
```

The usual case would be the opposite: hide an element below a certain screen size (e.g. below 768px screens)

```html
<p class="m-5 d-none d-md-block d-lg-block d-xl-block d-xxl-block">
  Lorem ipsum dolor sit amet consectetur adipisicing elit.
</p>
```


Use `.d-block` to make an inline element behave as a block element (e.g. usefult to make an inline element take all the available space):

```html
<span class="bg-dark text-white">
  span!
</span>
<span class="d-block bg-dark text-center text-white">
  span with <code>.dblock</code>!
</span>
```

![Display: .d-block](images/display_d-block.png)


Or `.d-inline` for the opposite:

```html
<div class="d-inline bg-dark text-white mx-1">
  div with <code>.d-inline</code>!
</div>
<div class="d-inline bg-dark text-white mx-1">
  div with <code>.d-inline</code>!
</div>
```

| EXAMPLE: |
| :------- |
| See [09: Hello, display utilities!](09-hello-display-utilities) for a runnable example illustrating several examples of the display utilities. |

### Flex utilities

Bootstrap provides a set of classes to manage the flebox capabilities.

### Interactions

The interactions utility classes can be used to change the way certain elements behaves to user actions, such as when a user clicks on a paragraph, etc.

```html
<p class="user-select-all m-5">
  This paragraph will be entirely selected when the user clicks on it.
</p>

<p class="user-select-none m-5">
  This paragraph won't be selectable when clicked.
</p>
```

| EXAMPLE: |
| :------- |
| See [10: Hello, interaction utilities!](10-interactions) for a runnable example on interaction utilities. |

### Opacity utilities

Opacity utilities allow you to change the opacity of elements using CSS classes.

### Overflow utilities

Bootstrap overflow utilities give you a simple way to control how the content of an element overflows the container using simple CSS classes:

```html
  <div class="container my-5">
    <h2 class="text-center">Using Bootstrap overflow utilities</h2>
    <div class="row">
      <div class="col-3">
        <div class="overflow-auto" style="height: 100px">
          ... will display scroll bar when content overflows ...
        </div>
      </div>
      <div class="col-3">
        <div class="overflow-hidden" style="height: 100px">
          ... will automatically hide the content that overflows ...
        </div>
      </div>
      <div class="col-3">
        <div class="overflow-visible border bg-light" style="height: 100px">
          ... will display the text that overflows ...
        </div>
      </div>
      <div class="col-3">
        <div class="overflow-scroll" style="height: 100px">
          ... will display the scroll bars even when content does not overflow...
        </div>
      </div>
    </div>
  </div>
```

![Utilities: overflow](11-overflow/docs/images/overflow_utilities.png)

| EXAMPLE: |
| :------- |
| See [11: Hello, interaction utilities!](11-overflow) for a runnable example. |


### Shadow utilities

Bootstrap features to apply shadows to elements:

```html
<div class="container my-5">
  <div class="shadow-sm bg-body rounded p-3 mb-5">
    small shadow
  </div>
  <div class="shadow bg-body rounded p-3 mb-5">
    regular shadow
  </div>
  <div class="shadow-lg bg-body rounded p-3 mb-5">
    large shadow
  </div>
</div>
```

| EXAMPLE: |
| :------- |
| See [12: Bootstrap v5 &mdash; Hello, shadow utilities!](12-shadows) for a runnable example. |

### Visibility utilities

The visibility utilities are similar to the `.d-none` and related utilities seen on the [Display utilities](#display-utilities) section, but in this case, the elements are simply hidden without modifying their display properties.

As a result, elements will still take place on the layout:

```html
<div class="visible">...this will be shown...</div>
<div class="invisible">
  ...this won't be shown, but will take space on the page...
</div>
```

## Examples, Exercises and mini-projects

### [01: Hello, Bootstrap v5 refresher](01-hello-bootstrap-v5)
Starter project for Bootstrap v5 examples, backed by a Express server that exposes the `public/` directory for frontend development.

### [02: Hello, Bootstrap containers!](02-hello-containers)
Illustrates `.container`, `.container-fluid`, and `.container-*`.

### [03: Hello, Bootstrap grid system!](03-hello-grid-system)
Illustrates the basic concepts of the Bootstrap grid system, including layout, sizing, responsiveness, and vertical and horizontal alignment.

### [04: More on gutters!](04-more-on-gutters)
Illustrates the basics of gutters to control the spacing between columns in the grid system.

### [05: Buttons in action!](05-buttons)
Illustrates the basics of Bootstrap buttons.

### [06: Cards in action!](06-cards)
Illustrates the basics of Bootstrap cards.

### [07: Hello, Boostrap typography!](07-typography)
Illustrates the basics of Bootstrap typography utilities.

### [08: Images in action!](08-images)
Illustrates the basics of Bootstrap image utilities.

### [09: Hello, display utilities!](09-hello-display-utilities)
Illustrates the basics of Bootstrap display utilities

### [10: Hello, interaction utilities!](10-interactions)
Illustrates the basics of Bootstrap interaction utilities.

### [11: Hello, overflow utilities!](11-overflow)
Illustrates the basics of Bootstrap overflow utilities

### [12: Bootstrap v5 &mdash; Hello, shadow utilities!](12-shadows)
Illustrates the basics of Bootstrap shadow utilities

### [e01: Practicing the Grid layout!](e01-practicing-grid-layout)
Using the grid system to obtain three different layouts.

### [e02: Images in action!](e02-practicing-utilities)
Illustrates the basics of Bootstrap image utilities

## Todo

+ [ ] Grokking display utilities: using `d-none` linked to a button to toggle the visibility of elements (e.g. completed
todo tasks)
+ [ ] Review flexbox from vanilla CSS and see how to replicate using Bootstrap flex utilities.