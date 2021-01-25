# 06-hello-redis
> basic operations using `redis` module

## Description

A simple program that illustrates how to interact with *Redis* backend.

In the example, it is demonstrated:
+ How to connect and disconnect from a *Redis* backend
+ How to register handlers for the `connect`, `ready` and `error` events
+ How to set and get simple values using `set` and `get`.
+ How to check for existence of keys using `exist`.
+ How to use Unicode in the values 
+ How *Redis* coherce non-string values to strings
+ How *Redis* does not allow to use JavaScript objects as values, or arrays
+ Introduction to hashes (one-level JavaScript objects) using `hmset` and `hget`.
+ Introduction to lists and sets using `lpush`, `lrange`, `sadd` and `smembers`.

