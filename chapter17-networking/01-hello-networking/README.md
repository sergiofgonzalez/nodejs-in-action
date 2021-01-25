# 01-hello-networking
> introducing Node.js low-level networking API

## Description
This example illustrates how to set up a *TCP server*, bind it to a port and send data over the network.

In order to test it, you can use `telnet localhost 5000` (remember that you can exit a telnet session typing *CTRL+]*)

## Network Concepts in Node.js
To fully understand Node.js the following concepts are required:

| Term        | Layer                                                                                 |
|-------------|---------------------------------------------------------------------------------------|
| Layer       | A slice of related network protocols that represent a logic group, application being the top-level layer and physical the lowest. |
| HTTP        | Hyper Text Transfer Protocol &mdash; the application-layer client server protocol built on top of TCP. |
| TCP         | Transmission Control Protocol &mdash; protocol that allows bi-directional communication between two parties, and that serves as the underlying protocol for other application-layer level protocols such as HTTP. |
| UDP         | User Datagram Protocol &mdash; a lightweight protocol, typically chosen where speed is desired over reliability. |
| Socket      | The combination of an IP address and a port number                                     |
| Packet      | Also known as segments &mdash; the combination of a chunk of data along with a header. |
| Datagram    | The UDP equivalent of a packet                                                         |
| MTU         | Maximum Transmission Unit &mdash; the largest size of a protocol data unit. Each layer can have an MTU: IPv4 is at least 68 bytes, Ethernet v2 is 1500 bytes |


The stack of protocols and standards that make up the internet can be modeled as layers as seen on the following diagram.
![Network Layers](./network_layers.png).

When using a high-level programming language, you will be concerned with the application and transport layers of the Internet Protocol (IP) Suite. Note also that packets are wrapped by protocols at consecutive layers, so a TCP packet will be contained in the Data section of the IP packet, and the IP packet will be contained in the data section of an ethernet packet.

In particular, TCP/IP is the suite of protocols that address network and transport concerns. You can also use UDP when you don't require delivery guarantees, message ordering or protection against duplicated data.

In order to fully identify a party in a network interaction you'll have to use a socket: the combination of an IP address and port number. There are both TCP and UDP sockets.

In Node, you create TCP sockets with the `net` module and UDP sockets with the `dgram`. Note that TCP connections are full-duplex (messages can be sent and received in the same connection), so using the same *channel* messages can be sent and received.

Node also provides modules for specific network related operations such as the `dns` for looking up and resolving addresses, `tls` for protecting the communication, etc.

Behind the scenes, Node's networking modules use `libuv` and `c-ares` which are written in C and C++. Node's just provides an async JavaScript binding to the features in those libraries.
