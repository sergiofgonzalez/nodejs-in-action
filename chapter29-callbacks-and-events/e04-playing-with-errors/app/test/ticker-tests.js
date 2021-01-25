import tap from 'tap';
import sinon from 'sinon';
import { ticker } from '../src/lib/ticker.js';


tap.pass('file itself can be executed');

tap.test('module can be loaded', assert => {
  assert.ok(ticker, 'ticker is available');
  assert.type(ticker, 'function', 'ticker is a function');
  assert.ok(ticker(0, () => {}), 'the function returns something');
  assert.type(ticker(0, () => {}).on, 'function', `function exposes an 'on' function`);
  assert.type(ticker(0, () => {}).emit, 'function', `function exposes an 'emit' function`);
  assert.end();
});

tap.test('error path, millis less than 50ms, initial time divisible by 5', assert => {
  const doneSpy = sinon.spy();
  const listenerSpy = sinon.spy();
  const errorSpy = sinon.spy();
  const clock = sinon.useFakeTimers({ 
    now: 136684800000,
    toFake: ['setTimeout', 'nextTick', 'Date'] 
  });

  ticker(25, doneSpy)
    .on('tick', listenerSpy)
    .on('error', errorSpy);

  assert.ok(doneSpy.notCalled, 'not called before next event loop');
  assert.ok(listenerSpy.notCalled, 'listener not called before next event loop');
  assert.ok(errorSpy.notCalled, 'error not called before next event loop');  

  clock.tick(25);
  assert.ok(doneSpy.calledOnce, 'done has been called once');
  assert.type(doneSpy.getCall(0).firstArg, 'Error');
  assert.ok(listenerSpy.notCalled, 'listener not called after done');
  assert.end();
});

tap.test('error path, millis less than 50ms, initial time not divisible by 5', assert => {
  const doneSpy = sinon.spy();
  const listenerSpy = sinon.spy();
  const errorSpy = sinon.spy();
  const clock = sinon.useFakeTimers({ 
    now: 136684800001,
    toFake: ['setTimeout', 'nextTick', 'Date'] 
  });

  ticker(25, doneSpy)
    .on('tick', listenerSpy)
    .on('error', errorSpy);

  assert.ok(doneSpy.notCalled, 'not called before next event loop');
  assert.ok(listenerSpy.notCalled, 'listener not called before next event loop');
  assert.ok(errorSpy.notCalled, 'error not called before next event loop');  

  clock.tick(25);
  assert.ok(doneSpy.calledOnceWithExactly(null, 1), 'done called with argument 1');
  assert.ok(listenerSpy.calledOnce, 'listener called once');
  assert.ok(errorSpy.notCalled, 'error listener not called');
  assert.end();
});

tap.test('error path, initial time not divisible by 5', assert => {
  const doneSpy = sinon.spy();
  const listenerSpy = sinon.spy();
  const errorSpy = sinon.spy();
  const clock = sinon.useFakeTimers({ 
    now: 136684800001,
    toFake: ['setTimeout', 'nextTick', 'Date'] 
  });

  ticker(24, doneSpy)
    .on('tick', listenerSpy)
    .on('error', errorSpy);

  assert.ok(doneSpy.notCalled, 'not called before next event loop');
  assert.ok(listenerSpy.notCalled, 'listener not called before next event loop');
  assert.ok(errorSpy.notCalled, 'error not called before next event loop');  

  clock.tick(24);
  assert.ok(doneSpy.calledOnce, 'done has been called once');
  assert.type(doneSpy.getCall(0).firstArg, 'Error');
  assert.ok(listenerSpy.calledOnce, 'listener called once');
  assert.end();
});


tap.test('happy path, exactly 50ms', assert => {
  const doneSpy = sinon.spy();
  const listenerSpy = sinon.spy();
  const errorSpy = sinon.spy();
  const clock = sinon.useFakeTimers({ 
    now: 136684800001,
    toFake: ['setTimeout', 'nextTick', 'Date'] 
  });

  ticker(108, doneSpy)
    .on('tick', listenerSpy)
    .on('error', errorSpy);

  assert.ok(doneSpy.notCalled, 'not called before next event loop');
  assert.ok(listenerSpy.notCalled, 'listener not called before next event loop');

  clock.tick(108);
  assert.ok(listenerSpy.calledThrice, 'listener called three times');
  assert.ok(doneSpy.calledOnceWithExactly(null, 3), 'done called in next event loop with 2+1 as argument');
  assert.ok(errorSpy.notCalled, 'error was not called');
  assert.end();
});
