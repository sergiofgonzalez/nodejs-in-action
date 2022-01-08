# 02: English irregular verbs quiz &mdash; Importing the irregular verbs JSON file
> imports the list of irregular verbs from a JSON file

## Description

I tried using the TS 4.5 syntax for import assertions but it just wouldn't work no matter how I changed the `tsconfig.json`, so reverted to the old way of importing with CommonJS interoperability.

Note that at the end, with the file being an array it might also be needed to have a map-like view for easier indexing. 