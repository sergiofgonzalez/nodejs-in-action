
// index types allow you to define a signature for your
// type using an interface.
// You will be defining a type which will be able to
// feature a flexible number of properties
interface ErrorMessage {
  [msg: number]: string;  // index type: can only be string | number | symbol
  apiId: number;
}

const errorMessage: ErrorMessage = {
  0: 'system error',
  1: 'overload',
  apiId: 12345
};

console.log(errorMessage);
console.log(errorMessage[1]);