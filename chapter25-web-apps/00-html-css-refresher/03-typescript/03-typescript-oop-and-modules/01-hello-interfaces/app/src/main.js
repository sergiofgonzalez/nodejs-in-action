"use strict";
//const idObject: IIdName = { id: 2 }; /* ERROR: name is missing */
const idNameObj = {
    id: 1,
    name: 'Jason Isaacs'
};
console.log(idNameObj);
const optionalId = {
    id: 5
};
const optionalIdName = {
    id: 5,
    name: 'Idris Elba'
};
const weakTypeObj1 = {};
const weakTypeObj2 = { id: 1 };
const weakTypeObj3 = { name: 'Riz Ahmed' };
const weakTypeObj4 = { id: 5, name: 'Ed Norton' };
function printNameOrValue(obj) {
    if ('id' in obj) {
        console.log(`obj.name:`, obj.name);
    }
    if ('descr' in obj) {
        console.log(`obj.value:`, obj.value);
    }
}
function displayProperty(key, obj) {
    console.log(`${key} = ${obj[key]}`);
}
displayProperty('id', { id: 1, name: 'Jason Isaacs' });
displayProperty('name', { id: 1, name: 'Jason Isaacs' });
//# sourceMappingURL=main.js.map