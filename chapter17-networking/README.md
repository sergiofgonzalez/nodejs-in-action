# Chapter 17 &mdash; Networking
> Networking concepts in Node.js

## [01-hello-networking](./01-hello-networking/)
Illustrates how to create a *TCP server* that is established in port 5000 and accepts client connections (*sockets*).

## [02-tcp-server-and-tcp-clients](./02-tcp-server-and-tcp-clients/)
Illlustrates how to create a *TCP server* and *TCP clients* from a Node.js application.

## [03-tcp-nodelay](./03-tcp-nodelay/)
Illlustrates how to enable `TCP_NODELAY` in Node.js to decrease the latency in interactive/real-time applications that communicate using small packages.

## [04-hello-udp](./04-hello-udp/)
Demonstrates how to write an application that transfers file from a client to the server using the UDP protocol.

## [05-client-server-udp](./05-client-server-udp/)
A simple UDP-based chat program.

## [06-hello-http](./06-hello-http/)
Illustrates how to create an HTTP server and how to send a request using the core `http` module.

## [07-hello-redirects](./07-hello-redirects/)
Illustrates how to follow HTTP redirects using only Node.js core modules.

## [08-hello-proxies](./08-hello-proxies/)
Illustrates how to implement an HTTP proxy using Node's core modules.

## [09-hello-dns](./09-hello-dns/)
Illustrates how to resolve a domain name into its IP address using the `dns.lookup` and `dns.resolve` module.

## [10-hello-tls](./10-hello-tls/)
Illustrates how to create a *TCP server* and *TCP client* that uses *TLS/SSL* to communicate in a secure way. The example is configured with certificates on both client and server side.

## [11-hello-https](./11-hello-https/)
Illustrates how to create an *HTTPS server* and *HTTPS client* using certificates on both client and server side. 

## [e01-hello-ssh](./e01-hello-ssh/)
Illustrates how to send commands to remote machines using SSH protocol thanks to the `ssh2` module.