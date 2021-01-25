'use strict';

const tap = require('tap');
const proxyquire = require('proxyquire');


/* Test1: we mock the library but give no behavior to it */
tap.test('when giving no behavior to the mock, it behaves as in an integration test', assert => {
  const fileAllCapsMock = proxyquire('../src/lib/file-all-caps', {});
  
  assert.strictEquals(fileAllCapsMock.extnameAllCaps('file.txt'), '.TXT', 'extension in all caps');
  assert.end();
});

/* 
  Test2: we mock the library, identify the part we want to stub (dependency with `path`),
  but we give not behavior to it
*/
tap.test('when no overrides specified, path.extname behaves normally', assert => {
  const pathStub = {};
  const fileAllCapsMock = proxyquire('../src/lib/file-all-caps', { path: pathStub });
  
  assert.strictEquals(fileAllCapsMock.extnameAllCaps('file.txt'), '.TXT', 'extension in all caps');
  assert.end();
});

// same thing, but with the other function
tap.test('when no overrides specified, path.basename behaves normally', assert => {
  const pathStub = {};
  const fileAllCapsMock = proxyquire('../src/lib/file-all-caps', { path: pathStub });

  assert.strictEquals(fileAllCapsMock.basenameAllCaps('file.txt'), 'FILE.TXT', 'basename in all caps');
  assert.end();
});


/*
  Test3: we mock the library, identify the part we want to stub (dependency with `path`),
  and we give the stub some overriding behavior:
    when `path.extname` is called, it will return 'Hello to Jason Isaacs!' instead of path.extname(file)
*/
tap.test(`when overriding path.extname behavior, path.extname behaves as we told it to`, assert => {
  const fileAllCapsMock = proxyquire('../src/lib/file-all-caps', { path: { extname: () => 'Hello to Jason Isaacs!' }});

  assert.strictEquals(fileAllCapsMock.extnameAllCaps('file.txt'), 'HELLO TO JASON ISAACS!', 'extname behaves as mocked');
  assert.end();
});

// same thing, but for the other function
tap.test(`when overriding path.extname behavior, path.extname behaves as we told it to`, assert => {
  const fileAllCapsMock = proxyquire('../src/lib/file-all-caps', { path: { basename: () => 'Hello to Jason Isaacs!' }});

  assert.strictEquals(fileAllCapsMock.basenameAllCaps('file.txt'), 'HELLO TO JASON ISAACS!', 'basename behaves as mocked');
  assert.end();
});

/* Test 4: when one part of the library is mocked, the other behaves normally */
tap.test(`when overriding path.extname behavior, path.extname behaves as we told it to`, assert => {
  const fileAllCapsMock = proxyquire('../src/lib/file-all-caps', { path: { extname: () => 'Hello to Jason Isaacs!' }});

  assert.strictEquals(fileAllCapsMock.basenameAllCaps('/a/b/c/file.txt'), 'FILE.TXT', 'basename behaves as expected');
  assert.end();
});