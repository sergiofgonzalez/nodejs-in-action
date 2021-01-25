/* eslint-disable no-unused-vars */
'use strict';

const myModule = (() => {
  
  const myPrivateFunction = () => {};
  const myPrivateVariable = [];

  const exported = {
    publicFunction: () => {},
    publicVar: []
  };

  return exported;

})();


console.log(myModule);
console.log(myModule.myPrivateFunction, myModule.myPrivateVariable);