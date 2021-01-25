# 06-hello-sinon
> an introduction to the `sinon` spy, mock and stub library.

## Description
*Sinon.js* is a popular testing library to write test spies, stubs and mocks.

### Spies
*Spies* lets you replace a method with something you can use to make assertions on, such as verifying if the method has been actually called.

For example, to *mock* the `fs.writeFile` method you'd use:
```javascript
  // before the test
  sinon.spy(fs, "writeFile");

  ... // make assertions on the stubbed method
  
  fs.writeFile.restore(); // bring the original method back
```

### Stubs
*Stubs* lets you change a method implementation to control code flow to (for example), force an error branch to be executed.

The following piece of code is used to stub `fs.writeFile` with our own implementation to verify that `fs.writeFile` and the callback given to `database.save` are called when using `database.save`.
```javascript
  const database = new Database("./sample.json");

  // Give our own implementation of writefile, which just calls the callback
  const stub = sinon.stub(fs, "writeFile").callsFake((file, data, cb) => {
    cb();
  });

  // create a spy for the callback, to assert it will be called
  const saveDone = sinon.spy();

  // Arrange
  database.insert("name", "Jason Isaacs");

  // Act
  database.save(saveDone);

  // Assert
  sinon.assert.calledOnce(stub);
  sinon.assert.calledOnce(saveDone);

  fs.writeFile.restore();
```