import http from 'http';

export class RequestBuilder {
  setHostname(hostname) {
    this.hostname = hostname;
    return this;
  }

  setPort(port) {
    this.port = port;
    return this;
  }

  setRequestPath(path) {
    this.path = path;
    return this;
  }

  setQueryString(queryString) {
    this.queryString = queryString;
    return this;
  }

  setHeaders(headers) {
    this.headers = headers;
    return this;
  }

  setHttpMethod(method) {
    this.method = method;
    return this;
  }

  setBody(body) {
    this.body = body;
    return this;
  }

  invoke() {
    return new Promise((resolve, reject) => {
      const options =  {
        hostname: this.hostname ?? 'localhost',
        port: this.port ?? 80,
        path: (this.path ?? '/') + (this.queryString ?? ''),
        method: this.method ?? 'GET',
        headers: this.headers ?? {}
      };

      const req = http.request(options, (res) => {
        resolve(res);
      });

      req.on('error', err => {
        console.log(`ERROR: request-builder: problem sending request: ${ err.message }`);
        reject(err);
      });

      if (this.body) {
        console.log(`INFO: request-builder: streaming data`);
        req.write(this.body);
      }

      console.log(`INFO: request-builder: finalizing request`);
      req.end();
    });
  }
}