# 03-handling-binary-data
> using the `Buffer` class to make sense of binary data

## Description
In this example, we illustrate how to make sense of binary data using the *Buffer API*. For the purpose of the example, we will try to decode a `.dbf` file (dBase 5.0). This will demonstrate how Node.js is powerful enough to decode any type of binary format.

### dBase Header Specification

| Byte      | Contents      | Description                                                          |
|-----------|---------------|----------------------------------------------------------------------|
| 0         | 1 byte        | Valid dBase for Windows table file; bits 0-2 indicate version number |
| 1-3       | 3 bytes       | Date of last update in format YYMMDD                                 |
| 4-7       | 32-bit number | Number of records in the table                                       |
| 8-9       | 16-bit number | Number of bytes in the header                                        |
| 10-11     | 16-bit number | Number of bytes in the record                                        |
| ...       | ...           | ...                                                                  |
| 32-n each | 32 bytes      | Field descriptor array  (see below)                                  |
| n + 1     | 1 byte        | 0Dh stored as the field terminator                                   |

### dBase Field Descriptor Array Specification

| Byte      | Contents      | Description                               |
|-----------|---------------|-------------------------------------------|
| 0-10      | 11 bytes      | Field name in ASCII (zero-filled)         |
| 11        | 1 byte        | Field Type in ASCII (C, N, ..             |
| ...       | ...           | ...                                       |
| 16        | 1 byte        | Field Length in binary                    |

### dBase Records Specification
The records follow the header in the table file.
Data records are preceded by one byte that is a space (0x20) if the records is not deleted or an asterisk (0x2A) if the record is deleted.
Fields are packed into records without field separators or record terminators. 
The end of the file is marked by a single byte, with an end-of-file marker 0x1A.