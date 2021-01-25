const Joi = require('@hapi/joi');
const assert = require('assert').strict;

class List {
  head() { throw new Error('unimplemented'); }
  tail() { throw new Error('unimplemented'); }
  isEmpty() { throw new Error('unimplemented'); }
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
  isEmpty() {
    return true;
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