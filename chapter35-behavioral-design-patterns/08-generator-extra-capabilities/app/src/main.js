/* Extra capability 1: receive arguments from client code */
function* twoWayGenerator() {
  const what = yield null;
  yield `Hello, ${ what }!`;
}

const twoWay = twoWayGenerator();
twoWay.next();
console.log(twoWay.next('world!'));

/* Extra capability 2: throw() */
function* throwTwoWayGenenerator() {
  try {
    const what = yield null;
    yield `Hello, ${ what }!`;
  } catch (err) {
    yield `Error received in the generator: ${ err.message }`;
  }
}

const twoWayException = throwTwoWayGenenerator();
twoWayException.next(); // nothing happens
console.log(twoWayException.throw(new Error('Boom!')));


/* Extra capability 3: return() */
function* returnTwoWayGenenerator() {
  const what = yield null;
  yield `Hello, ${ what }!`;
}

const returnGenerator = returnTwoWayGenenerator();
returnGenerator.next();
console.log(returnGenerator.return('forcing return!'));