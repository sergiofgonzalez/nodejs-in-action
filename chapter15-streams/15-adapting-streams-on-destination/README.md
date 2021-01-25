# 15-adapting-streams-on-destination
> adapting stream's behavior depending on the destination

## Description
A simple example that adapts its behavior depending on where it has been piped into. When the destination is *TTY* it uses ANSI colors to write the output, and if that is not the case it just uses `console.log`.