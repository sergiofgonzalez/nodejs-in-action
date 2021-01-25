# Part 4: Node.js avanced patterns and techniques
## Chapter 32 &mdash; Coding with streams
### Mini-project 3: File share over TCP
> Build a client and a server to transfer files over TCP. Extra points if you add a layer of encryption on top of that and if you can transfer multiple files at once. Hint: you can use mux/demux to receive multiple files at once.

#### Solution details

As this is more like a mini-project, with lots of new things that will be discovered along the way I have structured the final solution in iterative stages.

##### Stage 1: Setting up shop
In this first stage, the server (`receive-files-v0.js`) and client (`send-files-v0.js`) are structured, and allow sending a single file that will be written with a fixed name on the server side.

##### Stage 2: Managing the filename
In the second stage, the server (`receive-files-v1.js`) and clients (`send-files-v1.js`) are enhanced to receive and create the files with a custom filename.