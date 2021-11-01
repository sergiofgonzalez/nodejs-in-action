interface ErrorMessage {
  [errCode: number]: string;
  apiId: number
}

const errorMessage: ErrorMessage = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  apiId: 12345
};

const errorCodes: number[] = [400, 401, 403];

errorCodes.forEach((code: number) => {
  console.log(errorMessage[code]);
});

