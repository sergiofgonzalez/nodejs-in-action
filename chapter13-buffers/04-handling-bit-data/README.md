# 04-handling-bit-data
> using the `Buffer` class to make sense of binary data at bit level

## Description
In this example, we illustrate how to use the *Buffer API* to create our own binary protocol.

The protocol will involve:
+ using a bitmask to determine which database to store the message in
+ writing data to a particular key, that will be a 1 byte unsigned integer (0-255)
+ storing a message that is compressed data of any length (using zlib)

### Protocol Specification

| Byte      | Contents      | Description                                                             |
|-----------|---------------|-------------------------------------------------------------------------|
| 0         | 1 byte        | Bitmask that represents which database to write to (0-7)                |
| 1         | 1 byte        | A one-byte unsigned int (0-255) used as the DB key to store the data in |                 | 2-n       | 0-n bytes     | The data to store, in compressed format (zlib)                          |

