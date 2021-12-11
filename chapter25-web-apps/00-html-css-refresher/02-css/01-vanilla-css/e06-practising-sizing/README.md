# e06 &mdash; Practising sizing
> exercises on units, value types and sizing in general

## Description

This is the exercise [MDN: Test your skills: Sizing](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Sizing_tasks)

It consists of a series of separate practices, on which you are given a fixed HTML document and you have to use CSS to get the desired final status on the page.


### Exercise 1

In this exercise you're given two boxes. The first one should be sizes so that the height will be at least 100 pixels tall, even if there is less content. Also, the box should not overflow is there is more content than fits in 100 pixels.

The second box should be fixed at 100 pixels tall, so that content will overflow when it doesn't fit in the box.

The final result should look like the following image:

![Final state](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Sizing_tasks/mdn-sizing-height-min-height.png)

### Exercise 2

In this exercise you have a box that contains another box. Your task is to make the inner box 60% of the width of the outer box. The value of `box-sizing` property is set to `border-box`, which means that the total width of the box includes the padding and border.

You should also give the inner box a padding of 10% using the width as the size from which that percentage is calculated.

The final state should look like the following picture:

![Final State](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Sizing_tasks/mdn-sizing-percentages.png)

### Exercise 3

In this exercise you have two images in two boxes. One image is smaller than the box, the other is larger and breaking out of the box.

Apply CSS so that the large image shrinks down into the box while the small image does not stretch without having individualized CSS definitions for the two boxes (that is, you must achieve the behavior with just one rule).

The final state should look like this:

![Final state](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Sizing_tasks/mdn-sizing-max-width.png)

