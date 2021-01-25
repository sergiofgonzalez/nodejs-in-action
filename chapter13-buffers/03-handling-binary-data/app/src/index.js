"use strict";

const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);

/*
| Byte      | Contents      | Description                                                          |
|-----------|---------------|----------------------------------------------------------------------|
| 0         | 1 byte        | Valid dBase for Windows table file; bits 0-2 indicate version number |
| 1-3       | 3 bytes       | Date of last update in format YYMMDD                                 |
| 4-7       | 32-bit number | Number of records in the table                                       |
| 8-9       | 16-bit number | Number of bytes in the header                                        |
| 10-11     | 16-bit number | Number of bytes in the record                                        |
| ...       | ...           | ...                                                                  |
| 32-n each | 32 bytes      | Field descriptor array                                               |
| n + 1     | 1 byte        | 0Dh stored as the field terminator                                   |
*/

(async () => {
  const header = {};
  const records = [];


  /* materialize whole file in the buffer: may not be ideal for large files but this is an example */
  const buf = await readFile(path.join(__dirname, "data", "world.dbf"));
  
  function extractDateOfLastUpdateFromHeader() {
    // | 1-3       | 3 bytes       | Date of last update in format YYMMDD                                 |
    
    const date = new Date();
    date.setUTCFullYear(1900 + buf[1]);
    date.setUTCMonth(buf[2]);
    date.setUTCDate(buf[3]);
    
    
    header.lastUpdated = date.toUTCString();
  }


  function extractNumberOfRecordsInTable() {
    // | 4-7       | 32-bit number | Number of records in the table

    // readUInt32LE reads a 32-bit unsigned int in little-endian format
    header.totalRecords = buf.readUInt32LE(4);
  }

  function extractHeaderLength() {
    // | 8-9       | 16-bit number | Number of bytes in the header 
    header.bytesInHeader = buf.readUInt16LE(8);
  }
  
  function extractRecordLength() {
    // | 10-11     | 16-bit number | Number of bytes in the record 
    header.bytesPerRecord = buf.readUInt16LE(10);
  }

  function extractFieldDescriptorArray() {

    // | 32-n each | 32 bytes      | Field descriptor array
    // | n + 1     | 1 byte        | 0Dh stored as the field terminator

    const fields = [];
    let fieldOffset = 32;
    const fieldTerminator = 0x0D;

    while (buf[fieldOffset] !== fieldTerminator) {
      const fieldBuf = buf.slice(fieldOffset, fieldOffset + 32);
      const field = {};
      field.name = extractFieldName(fieldBuf);
      field.type = extractFieldType(fieldBuf);
      field.length = extractFieldLength(fieldBuf);
      fields.push(field);
      fieldOffset += 32;
    }

    header.fields = fields;


    function extractFieldName(fieldBuf) {
      // | 0-10      | 11 bytes      | Field name in ASCII (zero-filled)         |
      return fieldBuf.toString("ascii", 0, 11).replace(/\u0000/g, "");
    }

    function extractFieldType(fieldBuf) {
      // | 11        | 1 byte        | Field Type in ASCII (C, N, ..             |
      const FIELD_TYPES = { "C": "Character", "N": "Numeric" };
      return FIELD_TYPES[fieldBuf.toString("ascii", 11, 12)];
    }

    function extractFieldLength(fieldBuf) {
      // | 16        | 1 byte        | Field Length in binary                    |
      return fieldBuf[16];
    }        
  }


  function parseRecords() {
    const startingRecordOffset = header.bytesInHeader;
    for (let i = 0; i < header.totalRecords; i++) {
      let recordOffset = startingRecordOffset + (i * header.bytesPerRecord);

      const record = {};
      record.isDeleted = buf.readUInt8(recordOffset) == 0x2A;
      recordOffset++;

      // Now we parse the records with the info we learned while parsing the header
      for (let j = 0; j < header.fields.length; j++) {
        const field = header.fields[j];
        const Type = field.type === "Numeric" ? Number : String;
        record[field.name] = Type(buf.toString("ascii", recordOffset, recordOffset + field.length).trim());
        recordOffset += field.length;
      }
      records.push(record);
    }
  }


  extractDateOfLastUpdateFromHeader();
  extractNumberOfRecordsInTable();
  extractHeaderLength();
  extractRecordLength();
  extractFieldDescriptorArray();

  console.log(header);

  parseRecords();
  console.log(records);
})();