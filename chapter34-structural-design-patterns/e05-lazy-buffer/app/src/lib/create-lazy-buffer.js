export function createLazyBuffer(size) {
  const lazyBuffer = new LazyBuffer(size);
  const proxiedLazyBuffer = new Proxy(lazyBuffer, lazyBufferHandler);
  return proxiedLazyBuffer;
}


const lazyBufferHandler = {
  get: (target, property) => {
    /* added method */
    if (property.startsWith('write')) {
      return function (...args) {
        if (!target.isInitialized) {
          console.log(`INFO: lazyBufferHandler: initializing internal buffer as ${ property } has been invoked`);
          target.allocateMemory();
        }
        return target.buffer[property](...args);
      };
    }

    /* delegated methods */
    if (property !== 'constructor' && typeof target.buffer[property] === 'function') {
      const method = target.buffer[property];
      return target.buffer[property].bind(target.buffer);
    } else {
      return target.buffer[property];
    }
  }
};

class LazyBuffer {
  #buffer
  #size

  constructor(size) {
    this.#buffer = Buffer.alloc(0);
    this.#size = size;
    this.isInitialized = false;
  }

  get buffer() {
    return this.#buffer;
  }

  allocateMemory() {
    this.#buffer = Buffer.alloc(this.#size);
    this.isInitialized = true;
  }
}