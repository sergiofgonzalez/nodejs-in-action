import { ErrorHelper } from './lib/error-helper';

const failureMessage = {
  responseText: {
    failure: true,
    errorMessage: 'Message from failureMessage'
  }
};

if (ErrorHelper.containsErrors(failureMessage)) {
  ErrorHelper.trace(failureMessage);
}
