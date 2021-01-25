# 13-async-caveat
> async can lead to the unexpected

## Description
stupid example that illustrates how JavaScript event loop can lead to undesired results when async code is mixed with sync code. In the example, an async function is defined to execute its callback immediately. When calling this function to display some application state the result is unexpected.