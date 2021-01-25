"use strict";

const { Readable } = require("stream");
const assets = require("./data/assets");
const attributes = require("./data/attributes");
const units = require("./data/units");
const incidentDescriptions = require("./data/incident-descriptions");
const spillTos = require("./data/spill-to");
const incidentCauses = require("./data/incident-cause");
const weatherTypes = require("./data/weather-type");
const basins = require("./data/basins");
const words = require("./data/words");


class CsvGenerator extends Readable {
  constructor(recordType, numRecords) {
    super();

    this.recordType = recordType;
    this.numRecords = numRecords;
    this.numRecordsGenerated = 0;
    console.log(`Instantiating CsvGenerator object for ${ recordType }: ${ this.numRecords } record(s) will be generated`);    
  }

  async _read() {
    if (this.numRecordsGenerated > this.numRecords) {
      this.push(null);
    } else {
      const csvRecord = await this._getRandomCsvRecord();
      this.push(`${ csvRecord }\n`);
      this.numRecordsGenerated++;      
      if (this.numRecordsGenerated % 1000 === 0) {
        console.log(`${ this. recordType } : ${ this.numRecordsGenerated }`);
      }      
    }
  }

  async _getRandomCsvRecord() {
    async function getRandomIntBetween(min, max) {
      const minInclusive = Math.ceil(min);
      const maxInclusive = Math.floor(max);
      return Math.floor(Math.random() * (maxInclusive - minInclusive)) + min;
    }
     
    async function getRandomDateBetween(start, end, normalize) {
      const resultDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      if (normalize) {
        resultDate.setMinutes(await getRandomIntBetween(0, 5) * 15);
      }
      return resultDate.toISOString().substring(0, 16);
    }
  
    async function getRandomDoubleValue(minInclusive, maxInclusive) {
      const value = Math.random() * (maxInclusive - minInclusive) + minInclusive;
      let valueStr = value.toString();
      const randomLen = await getRandomIntBetween(5, 10);
      valueStr = valueStr.substring(0, randomLen);
      if (valueStr.endsWith(".")) {
        valueStr += "0";
      }
    
      return valueStr;
    }
  
    async function getRandomAsset() {
      return assets[await getRandomIntBetween(0, assets.length)];
    }
  
    async function getRandomAttribute() {
      return attributes[await getRandomIntBetween(0, attributes.length)];
    }
  
    async function getRandomUnit() {
      return units[await getRandomIntBetween(0, units.length)];
    }
  
    async function getRandomIncidentType() {
      return await getRandomIntBetween(0, 2)? "PUBLIC" : "PRIVATE";
    }
  
    async function getType() {
      return "Sewer Spill";
    }
  
    async function getRandomIncidentDescription() {
      return incidentDescriptions[await getRandomIntBetween(0, incidentDescriptions.length)];
    }
  
    async function getRandomYorN() {
      return await getRandomIntBetween(0, 2)? "Y" : "N";
    }
  
    async function getRandomSpillTo() {
      return spillTos[await getRandomIntBetween(0, spillTos.length)];
    }
  
    async function getRandomSpillSource() {
      return await getRandomIntBetween(0, 2)? "LATERAL" : "MAIN";
    }
  
    async function getRandomIncidentCause() {
      return incidentCauses[await getRandomIntBetween(0, incidentCauses.length)];
    }
  
    async function getRandomWeatherType() {
      return weatherTypes[await getRandomIntBetween(0, weatherTypes.length)];
    }
  
    async function getRandomBasin() {
      return basins[await getRandomIntBetween(0, basins.length)];
    }
  
    async function getRandomDescription() {
      let currentDescription = await words[await getRandomIntBetween(0, words.length)];
      const len = await getRandomIntBetween(150, 450);
      while (currentDescription.length < len) {
        currentDescription = currentDescription + " " + await words[await getRandomIntBetween(0, words.length)];
      }
      return currentDescription;
    }
  
    if (this.recordType === "SPILL") {
      const [ randomDate, randomValue, randomIncidentType, randomType, randomIncidentDescription,
        incidentRefNo, randDate1, randYorN, spillTo, spillSource, randDate2, randDate3, randDate4,
        incidentCause, randNum1, randNum2, randDate5, weatherType, basin, randNum3, randNum4, randNum5, randNum6, randNum7,
        description, randNum8, randNum9, randomYN, randNum10, randNum11
      ] = await Promise.all([
          getRandomDateBetween(new Date("2017-09-01T00:00:00"), new Date("2017-09-08T23:59:59")),
          getRandomIntBetween(0, 10),
          getRandomIncidentType(),
          getType(),
          getRandomIncidentDescription(),
          getRandomIntBetween(1234567, 9999999),
          getRandomDateBetween(new Date("2017-09-01T00:00:00"), new Date("2017-09-08T23:59:59")),
          getRandomYorN(),
          getRandomSpillTo(),
          getRandomSpillSource(),
          getRandomDateBetween(new Date("2017-09-01T00:00:00"), new Date("2017-09-08T23:59:59")),
          getRandomDateBetween(new Date("2017-09-01T00:00:00"), new Date("2017-09-08T23:59:59")),
          getRandomDateBetween(new Date("2017-09-01T00:00:00"), new Date("2017-09-08T23:59:59")),
          getRandomIncidentCause(),
          getRandomIntBetween(0, 999),
          getRandomIntBetween(0, 999),
          getRandomDateBetween(new Date("2017-09-01T00:00:00"), new Date("2017-09-08T23:59:59")),
          getRandomWeatherType(),
          getRandomBasin(),
          getRandomIntBetween(0, 999),
          getRandomIntBetween(123456, 999999),
          getRandomIntBetween(123456, 999999),
          getRandomDoubleValue(0, 100),
          getRandomDoubleValue(-100, 0),
          getRandomDescription(),
          getRandomDoubleValue(0, 1),
          getRandomDoubleValue(1, 10),
          getRandomYorN(),
          getRandomIntBetween(0, 10),
          getRandomIntBetween(1111, 9999)
        ]);
  
      return [ randomDate, randomValue, randomIncidentType, randomType, randomIncidentDescription,
        incidentRefNo, randDate1, randYorN, spillTo, spillSource, randDate2, randDate3, randDate4,
        incidentCause, randNum1, randNum2, randDate5, weatherType, basin,
        randNum3, randNum4, randNum5, randNum6, randNum7, description, randNum8, randNum9, randomYN, randNum10, randNum11
      ].join(",");
    } else {
      const [randomAsset, randomAttribute, randomUnit, randomDate, randomValue] = await Promise.all([
        getRandomAsset(),
        getRandomAttribute(),
        getRandomUnit(),
        getRandomDateBetween(new Date("2017-09-01T00:00:00"), new Date("2017-09-08T23:59:59")),
        getRandomDoubleValue(0, 900)
      ]
      );
  
      return [randomAsset, randomAttribute, randomUnit, randomDate, randomValue].join(",");
    }    
  }
}

module.exports = CsvGenerator;