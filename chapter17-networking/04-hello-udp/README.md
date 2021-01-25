# 04-hello-udp
> sending a file from a client to a server using *UDP* datagrams

## Description
The example illustrates how to build a UDP server that can be used to transfer files. Note that because it's based on UDP it is subject to data loss, but we're assuming we're interested in speed rather than accuracy.

UDP is a lightweight protocol suitable for query-response application layer protocols (such as DNS). It is volatile and stateless, which means more work on the programming side to handle with its nature.

You must also be aware that because UDP is stateless, you must write data a packet (datagram) at a time, and those packets must be under 65507 bytes.

