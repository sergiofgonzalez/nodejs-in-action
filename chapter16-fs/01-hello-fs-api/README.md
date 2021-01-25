# 01-hello-fs
> introducing Node.js file system API

## Description
Illustrates how to use Node.js's `fs` API with some basic sync methods.

The majority of methods in the file system API are wrappers around standard POSIX I/O calles. 

| fs method    | Description                                                                              |
|--------------|------------------------------------------------------------------------------------------|
| fs.rename    | Changes the name of a file                                                               |
| fs.truncate  | Truncates or extends a file to a specified length                                        |
| fs.ftruncate | Same as truncate but takes a file descriptor                                             |
| fs.chown     | Changes file owner and group                                                             |
| fs.fchown    | Same as chown but takes a file descriptor                                                |
| fs.lchown    | Same as chown but does not follow symbolic links                                         |
| fs.chmod     | Changes file permissions                                                                 |
| fs.fchmod    | Same as chmod but takes a file descriptor                                                |
| fs.lchmod    | Same as chmod but does not follow symbolic links                                         |
| fs.stat      | Gets file status                                                                         |
| fs.lstat     | Same as stat but returns info about link if provided rathen than what the link points to |
| fs.fstat     | Same as stat but takes a file descriptor                                                 |
| fs.link      | Makes a hard file link                                                                   |
| fs.symlink   | Makes a symbolic link to a file                                                          |
| fs.readlink  | Reads value of a symbolic link                                                           |
| fs.realpath  | Returns the canonicalized absolute pathname                                              |
| fs.unlink    | Removes directory entry (i.e. a file)                                                    |
| fs.rmdir     | Removes directory                                                                        |
| fs.mkdir     | Makes directory                                                                          |
| fs.readdir   | Reads contents of a directory                                                            |
| fs.close     | Deletes a file descriptor                                                                |
| fs.open      | Opens or creates a file for reading or writing                                           |
| fs.utimes    | Sets file access and modification times                                                  |
| fs.futimes   | Same as utimes but takes a file descriptor                                               |
| fs.fsync     | Synchronized file data with disk                                                         |
| fs.write     | Writes data to a file                                                                    |
| fs.read      | Reads data from a file                                                                   |

                                        
In the example, a fixture file, sample.csv is used to feed data into the module to be tested `CSVParser`. Then, the `assert.deepEqual` method is used to compare expected vs. the actual results. This comparison is triggered on `"exit"` because we want the streams to finish processing data before running the assertion.

This is the pattern used in Node's own stream tests.