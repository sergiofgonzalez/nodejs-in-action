# e02-data-uri
> illustrating how to work with Data URIs with the help of the `Buffer` class

## Description
A data URI allows a resource to be embedded in inline on a web page using the following scheme:
```
data:[MIME-type][;charset=encoding][;base64],<data>
```

For example, for the `bomb.png` *favicon* it would be something like
```
data:image/png;base64,iVBORw0KGgoAAAANSUh...
```

The example illustrates how easy it is to work with *data URIs* when using the *Buffer* class.
