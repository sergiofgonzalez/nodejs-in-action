"use strict";

const redis = require("redis");

const db = redis.createClient(6379, "127.0.0.1"); // you can omit port and ip address if connecting to localhost:6379
db.on("connect", () => console.log(`Redis client connected to the server @ localhost:6379`));
db.on("ready", () => console.log(`Redis server is ready to accept commands!`));
db.on("error", err => console.error(`Redis error: ${ err }`));


(async () => {
  await setKeyAndValue();
  const doesKeyExist = await checkKeyExists("color");
  console.log(`doesKeyExist with "color": ${ doesKeyExist }`);

  const doesKeyExist1 = await checkKeyExists("users");
  console.log(`doesKeyExist with "users": ${ doesKeyExist1 }`);
  
  await usingUnicode();
  const unicodeValue = await getValueByKey("greeting");
  console.log(`greeting = ${ unicodeValue }`);

  await cohercingToStrings(); // db.set("catorce", 14)
  const numCohercedToString = await getValueByKey("catorce");
  console.log(`catorce = ${ numCohercedToString }; typeof catorce = ${ typeof numCohercedToString }`);

  await cannotUseObjectsAsValues();
  const videogame = await getValueByKey("videogame");
  console.log(`videogame = ${ videogame }; typeof videogame = ${ typeof videogame }`); // Err: not an object

  try {
    await cannotUseArraysAsValues();
  } catch (e) {
    console.log(`==> Err: Could not use an array as value: ${ e }`);
  }

  await usingHashes(); 
  const holidayHotel = await getHash("summerHolidays", "hotel");
  console.log(`holidayHotel = ${ holidayHotel }`);

  await usingListsAddValues("Buy Flowers");
  await usingListsAddValues("Collect Tickets for Concert");
  const todos = await getAllListItems("todos");
  todos.forEach(todo => console.log(`task = ${ todo }`));

  await usingSetsAddValues("Samuel");
  await usingSetsAddValues("Claire");
  const friends = await getAllSetItems("friends");
  friends.forEach(friend => console.log(`friend = ${ friend }`));

  db.quit();
  console.log(`Connection finished!`);

})();



function setKeyAndValue() {
  return new Promise((resolve, reject) => {
    db.set("color", "red", (err, result) => {
      if (err) {
        console.log(`Error using db.set: ${ err }`);
        return reject(err);
      }
      console.log(`result = ${ result }`); // result = OK, can be omitted as it does not provide anything interesting
      resolve();
    }); 
  });
}

function checkKeyExists(key) {
  return new Promise((resolve, reject) => {
    db.exists(key, (err, doesExist) => {
      if (err) {
        console.log(`Error using db.exists: ${ err }`);
        return reject(err);
      }
      console.log(`doesExist = ${ doesExist }`);
      resolve(doesExist);
    });
  });
}

function usingUnicode() {
  return new Promise((resolve, reject) => {
    db.set("greeting", "Здравствулте мир", (err, result) => {
      if (err) {
        console.log(`Error using db.set: ${ err }`);
        return reject(err);
      }
      console.log(`result = ${ result }`); // result = OK, can be omitted as it does not provide anything interesting
      resolve();
    }); 
  });
}

function getValueByKey(key) {
  return new Promise((resolve, reject) => {
    db.get(key, (err, result) => {
      if (err) {
        console.log(`Error using db.get for key ${ key }: ${ err }`);
        return reject(err);
      }
      console.log(`result = ${ result }`); // result = OK, can be omitted as it does not provide anything interesting
      resolve(result);
    }); 
  });
}

function cohercingToStrings() {
  return new Promise((resolve, reject) => {
    db.set("catorce", 14, (err, result) => {
      if (err) {
        console.log(`Error using db.set: ${ err }`);
        return reject(err);
      }
      console.log(`result = ${ result }`); // result = OK, can be omitted as it does not provide anything interesting
      resolve();
    }); 
  });
}

function cannotUseObjectsAsValues() {
  return new Promise((resolve, reject) => {
    db.set("videogame", { title: "Legend of Zelda", platform: "Switch" }, (err, result) => {
      if (err) {
        console.log(`Error using db.set: ${ err }`);
        return reject(err);
      }
      console.log(`result = ${ result }`); // result = OK, can be omitted as it does not provide anything interesting
      resolve();
    }); 
  });
}

function cannotUseArraysAsValues() {
  return new Promise((resolve, reject) => {
    db.set("sports", ["soccer", "lacrosse"], (err, result) => {
      if (err) {
        console.log(`Error using db.set: ${ err }`);
        return reject(err);
      }
      console.log(`result = ${ result }`); // result = OK, can be omitted as it does not provide anything interesting
      resolve();
    }); 
  });
}

function usingHashes() {
  return new Promise((resolve, reject) => {
    db.hmset("summerHolidays", {
      place: "Valencia",
      hotel: "Valencia Palace Luxurious Hotel",
      durationInDays: 10
    }, (err, result) => {
      if (err) {
        console.log(`Error using hmset.set: ${ err }`);
        return reject(err);
      }
      console.log(`result = ${ result }`); // result = OK, can be omitted as it does not provide anything interesting
      resolve();
    }); 
  });
}

function getHash(redisKey, hashKey) {
  return new Promise((resolve, reject) => {
    db.hget(redisKey, hashKey, (err, result) => {
      if (err) {
        console.log(`Error using db.hget for redis key ${ redisKey } and hash key ${ hashKey }: ${ err }`);
        return reject(err);
      }
      console.log(`result = ${ result }`); 
      resolve(result);
    }); 
  });  
}

function usingListsAddValues(value) {
  return new Promise((resolve, reject) => {
    db.lpush("todos", value,
    (err, result) => {
      if (err) {
        console.log(`Error using lpush: ${ err }`);
        return reject(err);
      }
      console.log(`result = ${ result }`); // result = OK, can be omitted as it does not provide anything interesting
      resolve();
    }); 
  });
}

function getAllListItems(key) {
  return new Promise((resolve, reject) => {
    db.lrange(key, 0, - 1, (err, result) => {
      if (err) {
        console.log(`Error using lrange for redis key ${ key }: ${ err }`);
        return reject(err);
      }
      console.log(`result = ${ result }`); 
      resolve(result);
    }); 
  });  
}

function usingSetsAddValues(value) {
  return new Promise((resolve, reject) => {
    db.sadd("friends", value,
    (err, result) => {
      if (err) {
        console.log(`Error using sadd: ${ err }`);
        return reject(err);
      }
      console.log(`result = ${ result }`); // result = OK, can be omitted as it does not provide anything interesting
      resolve();
    }); 
  });
}

function getAllSetItems(key) {
  return new Promise((resolve, reject) => {
    db.smembers(key, (err, result) => {
      if (err) {
        console.log(`Error using smembers for redis key ${ key }: ${ err }`);
        return reject(err);
      }
      console.log(`result = ${ result }`); 
      resolve(result);
    }); 
  });  
}