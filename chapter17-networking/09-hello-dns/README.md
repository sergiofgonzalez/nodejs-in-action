# 09-hello-dns
> resolving a domain name into their IP address

## Description
This example illustrates how to use the `dns` module to resolve a domain name into its IP address using `dns.lookup` and `dns.resolve`. The `dns.lookup` is backed by a thread pool while `dns.resolve` uses the *c-ares* library which is faster.

*Node.js* has multiple methods for making DNS requests. When you query a DNS record, the results may include answers for different record types. The DNS is a distributed database, so it isn't used purely for resolving IP addresses &mdash; some records like `TXT` are used to build features off the back of the DNS itself.

The following table lists the DNS record types:

| Type  | Method           | Description            |
|-------|------------------|------------------------|
| A     | dns.resolve      | An A record stores the IP address. It can have an associated time-to-live (TTL) field to indicate how often the record should be updated |
| TXT   | dns.resolveTxt   | Text values that can be used by other services for additional features built on top of DNS |
| SRV   | dns.resolveSrv   | Service records define "location" data for a service; this usually includes the port number and host name |
| NS    | dns.resolveNs    | Used for name server themselves |
| CNAME | dns.resolveCname | Canonical name records. These are set to domain names rather than IP addresses. |

