# 03-tcp-nodelay
> enabling `TCP_NODELAY` switch in Node.js 

## Description
This example illustrates how to use the `net` module to enable the `TCP_NODELAY` parameter used in the TCP protocol so that smaller packets are not grouped into larger ones, to improve efficiency. 
As a consequnce of this grouping, the latency for your app will be reduced if you're using small packets, as required by interactive/real-time apps like telnet, ssh, etc.

Note that in the example, we tell our clients to use the character mode, by sending the character sequence:
```
\377\375\042\377\373\001
```

This will cause the telnet client to send each of the key events, instead of sending the data on return.