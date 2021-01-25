'use strict';

const Joi = require('@hapi/joi');
const util = require('util');

util.inspect.defaultOptions.breakLength = Infinity;
util.inspect.defaultOptions.depth = Infinity;

const snippets = [];

/* Snippet 1x: Required numeric argument */
function snippet1a() {
  const schema = Joi.number().integer().required();
  const { error } = schema.validate(5);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
  snippets.push(snippet1a);
}

function snippet1b() {
  const schema = Joi.number().integer().required();
  const { error } = schema.validate(5.1);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

/* Snippet 2x: Optional numeric argument (if it's there, it must be an integer) */
function snippet2a() {
  const schema = Joi.number().integer().optional();
  const { error } = schema.validate(5);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet2b() {
  const arg = undefined;
  const schema = Joi.number().integer().optional();
  const { error } = schema.validate(arg);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet2c() {
  const arg = null;   // null is not allowed
  const schema = Joi.number().integer().optional();
  const { error } = schema.validate(arg);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

/* Snippet 3x: object */
function snippet3a() {
  const schema = Joi.object().keys({
    start: Joi.number().integer().required(),
    end: Joi.number().integer().required(),
    step: Joi.number().integer().optional()
  }).required();

  const { error } = schema.validate({ start: 1, end: 2 });
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet3b() {
  const schema = Joi.object().keys({
    start: Joi.number().integer().required(),
    end: Joi.number().integer().required(),
    step: Joi.number().integer().optional()
  }).required();

  const { error } = schema.validate({ start: 1, end: 2, step: 5 });
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet3c() {
  const schema = Joi.object().keys({
    start: Joi.number().integer().required(),
    end: Joi.number().integer().required(),
    step: Joi.number().integer().optional()
  }).required();

  const { error } = schema.validate({ start: 1, end: 2, step: 5.1 });
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

/* Snippets 4x: Non-empty array of integers */
function snippet4a() {
  const schema = Joi.array().items(Joi.number()).min(1).required();
  const { error } = schema.validate([1, 2, 3]);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet4b() {
  const schema = Joi.array().items(Joi.number()).min(1).required();
  const { error } = schema.validate([]);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet4c() {
  const schema = Joi.array().items(Joi.number()).min(1).required();
  const { error } = schema.validate(['a', 'v']);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

/* Snippets 5x: Non-empty array of any kind */
function snippet5a() {
  const schema = Joi.array().min(1).required();
  const { error } = schema.validate(['one']);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet5b() {
  const schema = Joi.array().min(1).required();
  const { error } = schema.validate([1.2, 3.4]);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet5c() {
  const schema = Joi.array().min(1).required();
  const { error } = schema.validate([]);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

/* Snippet 6x: Empty or non-empty array of any kind */
function snippet6a() {
  const schema = Joi.array().required();
  const { error } = schema.validate([]);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet6b() {
  const schema = Joi.array().required();
  const { error } = schema.validate(['one']);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet6c() {
  const schema = Joi.array().required();
  const { error } = schema.validate([1]);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet6d() {
  const schema = Joi.array().required();
  const { error } = schema.validate();
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

/* Snippet 7:
More complex object (functional list)
  + properties required
  + some property values can be null
  + the object itself can be the empty object
*/
function snippet7a() {
  const schema = Joi.object().keys({
    value: Joi.any().required(),
    rest: Joi.object().allow(null).required()
  }).allow({}).required();

  const { error } = schema.validate();
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet7b() {
  const schema = Joi.object().keys({
    value: Joi.any().required(),
    rest: Joi.object().allow(null).required()
  }).allow({}).required();

  const { error } = schema.validate({});
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet7c() {
  const schema = Joi.object().keys({
    value: Joi.any().required(),
    rest: Joi.object().allow(null).required()
  }).allow({}).required();

  const { error } = schema.validate({ value: 1, rest: null });
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet7d() {
  const schema = Joi.object().keys({
    value: Joi.any().required(),
    rest: Joi.object().allow(null).required()
  }).allow({}).required();

  const { error } = schema.validate({ value: 1, rest: { value: 2, rest: null } });
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

/* Snippets 8: Complex object containing other complex objects */
function snippet8a() {
  const schema = Joi.object().keys({
    element: Joi.any().required(),
    list: Joi.object().keys({
      value: Joi.any().required(),
      rest: Joi.object().allow(null).required()
    }).allow({}).required()
  });

  const { error } = schema.validate({ element: 4, list: { value: 1, rest: { value: 2, rest: null } } });
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet8b() {
  const schema = Joi.object().keys({
    element: Joi.any().required(),
    list: Joi.object().keys({
      value: Joi.any().required(),
      rest: Joi.object().allow(null).required()
    }).allow({}).required()
  });

  const { error } = schema.validate({ element: 4, list: { value: 1, rest: null } });
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet8c() {
  const schema = Joi.object().keys({
    element: Joi.any().required(),
    list: Joi.object().keys({
      value: Joi.any().required(),
      rest: Joi.object().allow(null).required()
    }).allow({}).required()
  });

  const { error } = schema.validate({ element: 'item', list: {} });
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet8d() {
  const schema = Joi.object().keys({
    element: Joi.any().required(),
    list: Joi.object().keys({
      value: Joi.any().required(),
      rest: Joi.object().allow(null).required()
    }).allow({}).required()
  });

  const { error } = schema.validate({});
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

/* Snippet 9: Pojo with regex validation */
function snippet9a() {

  // Step one: simple validation
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required()
  });

  const data = {
    name: 'Jason Isaacs',
    address: 'Main Street, Minnesota',
    email: 'jason.isaacs@wittering.co.uk',
    phone: '555191817'
  };

  const { error } = schema.validate(data);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet9b() {

  // Step two: Add regex to validations
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().trim().regex(/^[a-z\d\s\-.,]*$/i).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().trim().regex(/^\+?[0-9]{7,11}$/).required()
  });

  const data = {
    name: 'Jason Isaacs',
    address: 'Main Street, Minnesota-Downton, Lyndonshire.',
    email: 'jason.isaacs@wittering.co.uk',
    phone: '+44555191817'
  };

  const { error } = schema.validate(data);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

/* Snippet10: Validating Number ranges */
function snippet10a() {

  const schema = Joi.object().keys({
    salary: Joi.number().required(),
    age: Joi.number().min(18).max(65).required()
  });

  const data = {
    salary: '45000',
    age: 46
  };

  const { error } = schema.validate(data);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet10b() {

  const schema = Joi.object().keys({
    salary: Joi.number().required(),
    age: Joi.number().min(18).max(65).required()
  });

  const data = {
    salary: '45000',
    age: '46'
  };

  const { error } = schema.validate(data);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

/* Snippet 11: validate against data reference */
function snippet11a() {

  /* Ensure that savings is less than or equal to total Wealth */

  const schema = Joi.object().keys({
    totalWealth: Joi.number().required(),
    savings: Joi.number().max(Joi.ref('totalWealth')).required()
  });

  const data = {
    totalWealth: 5000,
    savings: 11000
  };

  const { error } = schema.validate(data);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet11b() {

  /* Ensure that savings is less than or equal to total Wealth */

  const schema = Joi.object().keys({
    totalWealth: Joi.number().required(),
    savings: Joi.number().max(Joi.ref('totalWealth')).required()
  });

  const data = {
    totalWealth: 15000,
    savings: 11000
  };

  const { error } = schema.validate(data);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

/* Snippet 12: Conditional Validation */
function snippet12a() {

  /* 
    when the customer has credit cards, the debt and monthly payment
    are both required and must be greater than or equal to zero 
  */

  const schema = Joi.object().keys({
    hasCreditCards: Joi.bool().required(),
    creditCardDebt: Joi.number().when('hasCreditCards', { is: true, then: Joi.number().min(0).required() }),
    creditCardMonthlyPayment: Joi.number().when('hasCreditCards', { is: true, then: Joi.number().min(0).required() })
  });

  const data = {
    hasCreditCards: true,
    creditCardDebt: 750,
    creditCardMonthlyPayment: 75
  };

  const { error } = schema.validate(data);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet12b() {

  /* 
    when the customer has credit cards, the debt and monthly payment
    are both required and must be greater than or equal to zero 
  */

  const schema = Joi.object().keys({
    hasCreditCards: Joi.bool().required(),
    creditCardDebt: Joi.number().when('hasCreditCards', { is: true, then: Joi.number().min(0).required() }),
    creditCardMonthlyPayment: Joi.number().when('hasCreditCards', { is: true, then: Joi.number().min(0).required() })
  });

  const data = {
    hasCreditCards: false
  };

  const { error } = schema.validate(data);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet12c() {

  /* 
    when the customer has credit cards, the debt and monthly payment
    are both required and must be greater than or equal to zero 
  */

  const schema = Joi.object().keys({
    hasCreditCards: Joi.bool().required(),
    creditCardDebt: Joi.number().when('hasCreditCards', { is: true, then: Joi.number().min(0).required() }),
    creditCardMonthlyPayment: Joi.number().when('hasCreditCards', { is: true, then: Joi.number().min(0).required() })
  });

  const data = {
    hasCreditCards: true
  };

  const { error } = schema.validate(data);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet12d() {

  /* 
    when the customer has credit cards, the debt and monthly payment
    are both required and must be greater than or equal to zero 
  */

  const schema = Joi.object().keys({
    hasCreditCards: Joi.bool().required(),
    creditCardDebt: Joi.number().when('hasCreditCards', { is: true, then: Joi.number().min(0).required() }),
    creditCardMonthlyPayment: Joi.number().when('hasCreditCards', { is: true, then: Joi.number().min(0).required() })
  });

  const data = {
    hasCreditCards: true,
    creditCardDebt: -100,
    creditCardMonthlyPayment: 100
  };

  const { error } = schema.validate(data);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

/* Snippets 13: Complex conditional validations with arrays/valid */
function snippet13a() {

  /* 
    The customer might have an array of credit cards
    but only a few of them are supported
  */

  const schema = Joi.object().keys({
    hasCreditCards: Joi.bool().required(),
    allCreditCards: Joi.array().when('hasCreditCards', 
      { is: true, 
        then: Joi.array().items({ 
          type: Joi.string()
            .valid('Visa', 'Mastercard')
            .invalid('American Express')
            .required(), 
          balance: Joi.number().required(), 
          payment: Joi.number().required() 
        }) 
      })
  });

  const data = {
    hasCreditCards: true,
    allCreditCards: [{
      type: 'Visa',
      balance: 250,
      payment: 25
    }, {
      type: 'American Express',
      balance: 1200,
      payment: 100
    }]
  };

  const { error } = schema.validate(data);
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

/* Snippets 14: Validation of hex strings */
function snippet14a() {

  const schema = Joi.string().hex().min(32).max(32).required();

  const { error } = schema.validate('0123456789abcdef1234567890abcdef');
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

/* Snippets 15: Validation of UUIDs */
function snippet15a() {

  const schema = Joi.string().guid({ version: ['uuidv4'] }).required();

  const { error } = schema.validate('bbddba64-eabf-4201-9a3a-490c7b901645');
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}


/* Snippets 16: Validation of alternative types on given field */
function snippet16a() {

  const schema = Joi.alternatives().try(Joi.string().guid({ version: ['uuidv4'] }), Joi.string().hex().min(32).max(32));

  const { error } = schema.validate('0123456789abcdef1234567890abcdef');
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

function snippet16b() {

  const schema = Joi.alternatives().try(Joi.string().guid({ version: ['uuidv4'] }), Joi.string().hex().min(32).max(32));

  const { error } = schema.validate('0123456789abcdef1234567890abcdef');
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

/* Snippets 17: URI validation */
function snippet17a() {

  const schema = Joi.string().uri({ scheme: ['https'] }).required();

  const { error } = schema.validate('https://example.com');
  if (error) {
    console.log(`Validation failed: ${error}`);
  } else {
    console.log(`Successfully validated!`);
  }
}

/* Required integer */
snippet1a();
snippet1b();

/* Optional integer */
snippet2a();
snippet2b();
snippet2c();

/* simple object with require and optional integer keys */
snippet3a();
snippet3b();
snippet3c();

/* Non-empty array of integers */
snippet4a();
snippet4b();
snippet4c();

/* Non-empty Array of any kind */
console.log(`Snippets 5: Non-empty arrays of any kind`);
snippet5a();
snippet5b();
snippet5c();

/* Empty or non-empty array */
console.log(`\n== Snippets 6: Empty or Non-empty arrays of any kind ===`);
snippet6a();
snippet6b();
snippet6c();
snippet6d();

/* More complex object (functional list)
  + properties required
  + some property values can be null
  + the object itself can be the empty object
*/
console.log(`\n== Snippets 7: Complex object ===`);
snippet7a();
snippet7b();
snippet7c();
snippet7d();

/* Complex object containing other complex objects */
console.log(`\n== Snippets 8: Complex object containing complex objects ===`);
snippet8a();
snippet8b();
snippet8c();
snippet8d();

/* Real world POJSO */
console.log(`\n== Snippets 9: Real world POJSO ===`);
snippet9a();
snippet9b();

/* Number within ranges */
console.log(`\n== Snippets 10: Numbers within ranges ===`);
snippet10a();
snippet10b();

/* Validation with cross-references */
console.log(`\n== Snippets 11: Cross-reference validations ===`);
snippet11a();
snippet11b();

/* Conditional validation */
console.log(`\n== Snippets 12: Conditional validation ===`);
snippet12a();
snippet12b();
snippet12c();
snippet12d();

/* Complex conditional validation with arrays */
console.log(`\n== Snippets 13: Complex Conditional Validation ===`);
snippet13a();

/* Validation of hex strings */
console.log(`\n== Snippets 14: Validation of hex strings ===`);
snippet14a();

/* Validation of UUIDs */
console.log(`\n== Snippets 15: Validation of UUIDs ===`);
snippet15a();

/* allow two alternative types of data */
console.log(`\n== Snippets 16: Alternative types of data ===`);
snippet16a();
snippet16b();

/* URI validation */
console.log(`\n== Snippets 17: URI validation ===`);
snippet17a();
