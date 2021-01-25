"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

/*
  Revocable pass-through proxy
*/
function helloRevocableProxy() {
  const target = {};
  const handler = {};
  const {proxy, revoke} = Proxy.revocable(target, handler);

  proxy.message = "Hello to Jason Isaacs";
  console.log(`proxy.message=${ proxy.message }`);
  console.log(target.message);

  revoke();
  try {
    console.log(`proxy.message=${ proxy.message }`);
  } catch (err) {
    console.log(`Error while operating with the proxy`);
  }
  console.log("=====================");
}
helloRevocableProxy();

/*
  A useful scenario for revocable proxies

*/
function preventingAccess() {
  const proxies = new WeakMap();
  const storage = {};

  function getStorage() {
    const handler = {};
    const {proxy, revoke} = Proxy.revocable(storage, handler);
    proxies.set(proxy, {revoke});
    return proxy;
  }

  function revokeStorage(proxy) {
    proxies.get(proxy).revoke();
    proxies.delete(proxy);
  }

  // consumer code
  const cars = getStorage();
  cars.ferrari = { drivers: ["Vettel", "Raikkonen"]};
  cars.mercedes = { drivers: ["Hamilton", "Bottas"]};

  console.log(util.inspect(cars));
  revokeStorage(cars);
  try {
    console.log(util.inspect(cars));
  } catch (err) {
    console.log(`Error accessing cars: ${ err }`);
  }
  console.log("=====================");
}
preventingAccess();