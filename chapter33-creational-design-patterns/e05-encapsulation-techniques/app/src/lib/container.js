export function Container(param) {

  // this is a private method... it can only be called by private or privileged methods
  function dec() {
    if (secret > 0) {
      secret--;
      return true;
    } else {
      return false;
    }
  }

  // this is a privileged method: it can access private variables and methods,
  // and it is accessible from public methods and the outside as well
  this.service = function (line) {
    console.log(line);
    return dec() ? `${ secret } usage(s) remaining` : 'object drained';
  };

  this.member = param;
  let secret = 3;

  // private methods like dec() can be called within the constructor
  dec();
}

// this is a public method
Container.prototype.toString = function () {
  //return `param=${ this.param }; secret=${ secret }`; // nope, public methods do not have access to private properties or methods
  return `param=${ this.member }`;
};

Container.prototype.use = function (line) {
  return this.service(line);
};
