export const ErrorHelper = (function () {
  return {
    containsErrors: function (response) {
      if (!response || !response.responseText) {
        return false;
      }
      const errorValue = response.responseText;

      if (String(errorValue.failure) === 'true' || Boolean(errorValue.failure)) {
        return true;
      }
      return false;
    },
    trace: function (msg) {
      let traceMessage = msg;
      if (msg.responseText) {
        traceMessage = msg.responseText.errorMessage;
      }
      console.log(`[${new Date().toLocaleTimeString()}] ${traceMessage}`);
    }
  };
})();

