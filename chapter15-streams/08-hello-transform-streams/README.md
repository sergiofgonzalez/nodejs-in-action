# 08-hello-transform-streams
> implementing a `Transform` stream

## Description
This example illustrates the implementation of a *Transform* stream that parses CSV data and transforms it in JSON. 

In the example, we create a class `CSVParser` which extends from `stream.Transform` and implement the `_transform()` method, which sends the CSV data it receives to the stdout in JSON format.
