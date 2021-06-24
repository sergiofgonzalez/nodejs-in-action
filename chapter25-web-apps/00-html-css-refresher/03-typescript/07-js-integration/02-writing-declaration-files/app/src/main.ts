import { ErrorHelper } from './lib/error-helper';

const failureMessage = {
  responseText: {
    failure: true,
    errorMessage: 'Message from failureMessage'
  }
};

const failureMessageString = {
  responseText: {
    failure: 'true',
    errorMessage: 'Message from failureMessageString'
  }
};

const successMessage = {
  responseText: {
    failure: false
  }
};

if (ErrorHelper.containsErrors(failureMessage)) {
  ErrorHelper.trace(failureMessage);
}

if (ErrorHelper.containsErrors(failureMessageString)) {
  ErrorHelper.trace(failureMessageString);
}

if (!ErrorHelper.containsErrors(successMessage)) {
  ErrorHelper.trace('success!');
}