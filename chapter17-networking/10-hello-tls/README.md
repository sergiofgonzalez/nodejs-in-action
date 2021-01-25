# 10-hello-tls
> a secure server-client communication using `tls` 

## Description
This example illustrates how to use the `tls` module to create a *TCP server* that communicates with *TCP client* in a secure way using server and client certificates.

The `tls` module uses *OpenSSL Transport Layer Security/Secure Socket Layer* for encryption. This is public key system that supports both clients and servers to hold a private key.

Note that *TLS/SSL* is complicated, and unless you're a security expert, it's recommended to use the default values when using methods such as `tls.createServer` that allows you to specify a suite of cyphers.

The configuration for the TLS on the server side is as follows:
```javascript
const options = {
  key: fs.readFileSync(path.join(__dirname, "rsrc", "server", "server.pem")),         /* server's private key         */
  cert: fs.readFileSync(path.join(__dirname, "rsrc", "server", "server-cert.pem")),   /* server's public key          */
  ca: [ fs.readFileSync(path.join(__dirname, "rsrc", "client","client-cert.pem")) ],  /* server's CA is client's cert */
  requestCert: true /* server will request a certificate from clients and will fail if none provided */
};
```
The `ca` is only required when using self-signed certificates.


And the configuration of the client is symmetrical:
The configuration for the TLS on the server side is as follows:
```javascript
const options = {
  key: fs.readFileSync(path.join(__dirname, "rsrc", "client", "client.pem")),         /* client's private key         */
  cert: fs.readFileSync(path.join(__dirname, "rsrc", "client", "client-cert.pem")),   /* client's public key          */
  ca: [ fs.readFileSync(path.join(__dirname, "rsrc", "server","server-cert.pem")) ],  /* client's CA is client's cert */
  servername: os.hostname()
};
```

Note that the private key **should not** be distributed to other parties.

### Creating the certificate using OpenSSL
Certificates require a Certificate Authority (CA) and must be signed. To make TLS/SSL work we need at least a private and public key.

The `openssl` tool takes a command as the first argument, then options as subsequent arguments.
+ genrsa &mdash; command to generate an RSA certificate (this is our private key)
+ req &mdash; command to create a Certificate Signing Request (CSR)
+ x509 &mdash; command to sign the private key with the CSR to produce a public key

Thus, to create the certificate on the server side we do:
```bash
# create server's PK using 1024 bits: server.pem will be generated
$ openssl genrsa -out server.pem 1024

# Create the CSR we'll use to sign the PK
$ openssl req -new -key server.pem -out server-csr.pem

# Obtain the server's cert through the PK and CSR (the cert is the public key)
$ openssl x509 -req -in server-csr.pem -signkey server.pem -out server-cert.pem
```

Note that on the server side, when asked about the *Common Name* you should type the hostname for the server, as the client will be configured in the same way (you can also use a string of your choice if you configure the client in the same way)
```bash
Common Name (e.g. server FQDN or YOUR name) []:jsdev
```

And similarly, on the client side we do:
```bash
# create server's PK using 1024 bits: server.pem will be generated
$ openssl genrsa -out client.pem 1024

# Create the CSR we'll use to sign the PK
$ openssl req -new -key client.pem -out client-csr.pem

# Obtain the client's cert
$ openssl x509 -req -in client-csr.pem -signkey client.pem -out client-cert.pem
```

