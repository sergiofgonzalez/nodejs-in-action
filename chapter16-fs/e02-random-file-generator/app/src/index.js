"use strict";

const fs = require("fs");
const path = require("path");
const util = require("util");
const filesize = require("filesize");

const assets = require("./data/assets");
const attributes = require("./data/attributes");
const units = require("./data/units");
const incidentDescriptions = require("./data/incident-descriptions");
const spillTos = require("./data/spill-to");
const incidentCauses = require("./data/incident-cause");
const weatherTypes = require("./data/weather-type");
const basins = require("./data/basins");
const words = require("./data/words");

const writeFileAsync = util.promisify(fs.writeFile);
const fsStatAsync = util.promisify(fs.stat);

(async () => {
  await generateFile("SPILL", 2E3, "1MB");  
  await generateFile("SPILL", 20E3, "10MB");
  await generateFile("SPILL", 200E3, "100MB");
  await generateFile("SENSOR", 15E3, "1MB");  
  await generateFile("SENSOR", 150E3, "10MB");
  await generateFile("SENSOR", 1500E3, "100MB");  
})();

async function generateFile(fileType, numRows, filenameSuffix) {
  try {
    const csvRecords = [];
    for (let i = 0; i < numRows; i++) {
      if (i % 1000 === 0) {
        console.log(`${ fileType } : ${ filenameSuffix } : records generated: ${ i }`);
      }      
      const csvRecord = await getRandomCsvRecord(fileType);
      csvRecords.push(csvRecord);
    }
    const outPath = path.join(__dirname, "output-data", `${ fileType.toLowerCase() }-${ filenameSuffix }.csv`);
    await writeFileAsync(outPath, csvRecords.join("\n"), { encoding: "utf8" });
    const stat = await fsStatAsync(outPath);
    console.log(`File Size: ${ filesize(stat.size) }`);
  } catch (err) {
    console.error(`Could not create csv record: ${ err }`);
  }  
}




async function getRandomCsvRecord(recordType) {
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

  if (recordType === "SPILL") {
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

