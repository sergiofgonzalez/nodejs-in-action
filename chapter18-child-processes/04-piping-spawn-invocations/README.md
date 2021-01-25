# 04-piping-spawn-invocations
> piping several `spawn` invocations

## Description
This example illustrates how you can pipe external application invocation together using `spawn`, which instead of buffering the results, returns an stream with the information produced by the external command.

In the example, we use spawn to invoke `cat`, `sort` and `uniq` so that we get the contents of a file sorted and with duplicate records removed.

