const Joi = require('@hapi/joi');
const assert = require('assert').strict;

class List {
  head() { throw new Error('unimplemented'); }
  tail() { throw new Error('unimplemented'); }
  isEmpty() { throw new Error('unimplemented'); }
  filter() { throw new Error('unimplemented'); }
  map() { throw new Error('unimplemented'); }
  foldLeft() { throw new Error('unimplemented'); }
  foldRight() { throw new Error('unimplemented'); }
  foreach() { throw new Error('unimplemented'); }
}

class NonEmptyList extends List {

  constructor(head, tail) {
    super();
    const schema = Joi.object().keys({
      head: Joi.any().invalid(null).required(),
      tail: Joi.any().custom((value, helpers) => {
        if (value instanceof NonEmptyList || Object.is(value, EMPTY_LIST)) {
          return value;
        } else {
          console.log(`ERROR: value was of the unexpected type: ${ value.constructor.name }; should be NonEmptyList or EMPTY_LIST`);
          return helpers.error('any.invalid');
        }
      }).required()
    }).required();

    const { error } = schema.validate({ head, tail });
    if (error) {
      console.log(`ERROR: ${ error }`);
      throw new Error(`Cannot build list with given parameters: ${ error }`);
    }

    this._head = head;
    this._tail = tail;
  }

  head() {
    return this._head;
  }

  tail() {
    return this._tail;
  }

  isEmpty() {
    return false;
  }

  filter(fn) {
    const schema = Joi.function().required();
    const { error } = schema.validate(fn);
    if (error) {
      console.log(`ERROR: ${ error }`);
      throw new Error(`Invalid arguments passed to filter operation: ${ error }`);
    }

    if (fn(this.head())) {
      return list(this.head(), this.tail().filter(fn));
    } else {
      return this.tail().filter();
    }
  }

  map(fn) {
    const schema = Joi.function().required();
    const { error } = schema.validate(fn);
    if (error) {
      console.log(`ERROR: ${ error }`);
      throw new Error(`Invalid arguments passed to map operation: ${ error }`);
    }
    return list(fn(this.head()), this.tail().map(fn));
  }

  foldLeft(seed, fn) {
    const schema = Joi.object().keys({
      seed: Joi.any().required(),
      fn: Joi.function().required()
    }).required();
    const { error } = schema.validate({ seed, fn });
    if (error) {
      console.log(`ERROR: ${ error }`);
      throw new Error(`Invalid arguments passed to foldLeft operation: ${ error }`);
    }
    return this.tail().foldLeft(fn(seed, this.head()), fn);
  }

  foldRight(seed, fn) {
    const schema = Joi.object().keys({
      seed: Joi.any().required(),
      fn: Joi.function().required()
    }).required();
    const { error } = schema.validate({ seed, fn });
    if (error) {
      console.log(`ERROR: ${ error }`);
      throw new Error(`Invalid arguments passed to foldRight operation: ${ error }`);
    }
    return fn(this.head(), this.tail().foldRight(seed, fn));
  }

  foreach(fn) {
    const schema = Joi.function().required();
    const { error } = schema.validate(fn);
    if (error) {
      console.log(`ERROR: ${ error }`);
      throw new Error(`Invalid arguments passed to foreach operation: ${ error }`);
    }
    fn(this.head());
    this.tail().foreach(fn);
  }

  equals(other) {
    if (other instanceof NonEmptyList) {
      let headsAreEqual = true;
      try {
        assert.deepStrictEqual(this.head(), other.head());
      } catch (err) {
        headsAreEqual = false;
      }
      return headsAreEqual && this.tail().equals(other.tail());
    } else {
      return false;
    }
  }

  toString() {
    return `(${ this.head() }, ${ this.tail() })`;
  }
}

class EmptyList extends List {
  head() { throw new Error('Empty list has no head'); }
  tail() { throw new Error('Empty list has no tail'); }
  isEmpty() { return true; }

  filter(fn) {
    const schema = Joi.function().required();
    const { error } = schema.validate(fn);
    if (error) {
      console.log(`ERROR: ${ error }`);
      throw new Error(`Invalid arguments passed to filter operation: ${ error }`);
    }
    return this;
  }

  map(fn) {
    const schema = Joi.function().required();
    const { error } = schema.validate(fn);
    if (error) {
      console.log(`ERROR: ${ error }`);
      throw new Error(`Invalid argumens passed to map operation: ${ error }`);
    }
    return this;
  }

  foldLeft(seed, fn) {
    const schema = Joi.object().keys({
      seed: Joi.any().required(),
      fn: Joi.function().required()
    }).required();
    const { error } = schema.validate({ seed, fn });
    if (error) {
      console.log(`ERROR: ${ error }`);
      throw new Error(`Invalid arguments passed to foldLeft operation: ${ error }`);
    }
    return seed;
  }

  foldRight(seed, fn) {
    const schema = Joi.object().keys({
      seed: Joi.any().required(),
      fn: Joi.function().required()
    }).required();
    const { error } = schema.validate({ seed, fn });
    if (error) {
      console.log(`ERROR: ${ error }`);
      throw new Error(`Invalid arguments passed to foldLeft operation: ${ error }`);
    }
    return seed;
  }

  foreach(fn) {
    const schema = Joi.function().required();
    const { error } = schema.validate(fn);
    if (error) {
      console.log(`ERROR: ${ error }`);
      throw new Error(`Invalid argumens passed to map operation: ${ error }`);
    }
    // NOOP
  }

  equals(other) {
    return other == EMPTY_LIST;
  }

  toString() {
    return '()';
  }
}

const EMPTY_LIST = new EmptyList();

function emptyList() {
  return EMPTY_LIST;
}

function list(head, tail) {
  return new NonEmptyList(head, tail);
}

module.exports = {
  list,
  emptyList,
  EMPTY_LIST
};