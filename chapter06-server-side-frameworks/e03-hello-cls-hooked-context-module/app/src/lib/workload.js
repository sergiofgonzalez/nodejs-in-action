const context = require('./context');


function workload(message) {
  console.log(`3: ${ message }: context.get('myValue') = ${ context.get('myValue') }`);
  setTimeout(() => {
    context.set('myValue', 'Hello to Jason Isaacs');
  }, 1000);
  console.log(`4: ${ message }: context.get('myValue') = ${ context.get('myValue') }`);
  setTimeout(() => {
    console.log(`5: ${ message }: context.get('myValue') = ${ context.get('myValue') }`);    
  }, 1000);
}

module.exports = workload;