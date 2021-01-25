# 02-hello-sap-cf-jwt-microservice
> Express-based Node.js microservice subject of being deployed to SAP Cloud Foundry featuring JWT based authentication.

## Description

This example illustrates how to deploy the simplest *Express* application to SAP Cloud Foundry.
The following API is defined: 
+ `/api/heartbeat`: an *unauthenticated* endpoint that returns a simple JSON with a static message and the current timestamp.
+ `/api/greetme/:name?`: a JWT authenticated endpoint that returns a message, the current timestamp and some user information retrieved from the security context once the user has been authenticated.

## Configuration
Authentication in the SAP CF environment is provided by the UAA service. In this example, *OAuth 2.0* is used as the authentication mechanism.

This section describes the procedure to enable authentication in an Express-based, Node.js application:

1. A file `./xsuaa/xs-security.json` is created with the following contents:
```json
{
  "xsappname": "sap-cf-microservice",
  "tenant-mode": "dedicated"
}
```

2. A service instance of type `xsuaa` is created with the name `sap-cf-microservice-xsuaa`:
```bash
cf create-service xsuaa application sap-cf-microservice-xsuaa -c xsuaa/xs-security.json
```

3. The service is then added in the `manifest.yml` to advertise the binding between our microservice and the recently created *xsuaa service*. Note that it is also added as an environment variable for convenience purposes too.
```yaml
---
applications:

- name: sap-cf-microservice
  buildpacks:
    - nodejs_buildpack
  
  instances: 1
  memory: 128M
  disk_quota: 250M

  services:
  - sap-cf-microservice-xsuaa

  env:
    xsuaa-instance: sap-cf-microservice-xsuaa
```

4. The next step consists in setting up your *Express* application to use *Passport* and the *JWT* strategy provided by the `@sap/xssec` module. In the example, those concerns are addressed by the `authenticator.js` module. 
```javascript

// Middleware configuration
const passport = require('passport');
const JWTStrategy = require('@sap/xssec').JWTStrategy;
...

passport.use(new JWTStrategy(xsenv.getServices({ uaa: xsuaaInstance }).uaa));
passport.initialize();

// Securing the endpoints
app.get('/api/heartbeat', api.heartbeat); // anyone can call this endpoint
app.get('/api/greetme/:name?', authenticator.secureEndpoint(), api.greetMe); // secured endpoint
```

5. The authenticator includes logic to automatically disable authentication when running locally, so you can try accessing the defined endpoints after running `npm start`. When running on SAP Cloud Foundry environment, you will need to obtain a bearer token to access the secured endpoints:
    1. Obtain the client id, client secret and authentication endpoint url by running:
      ```bash
      $ cf env sap-cf-microservice
      System-Provided:
      {
      "VCAP_SERVICES": {
        "xsuaa": [
        {
          "binding_name": null,
          "credentials": {
          "clientid": "<the-client-id>",
          "clientsecret": "<the-client-secret>",
          ...
          "url": "<the-authentication-endpoint>",
          "verificationkey": "-----BEGIN PUBLIC KEY-----...
      ```

    2. Send an HTTP request to the authentication endpoint to obtain the JWT token:
      ```bash
      curl -v -X POST \
      --header "Content-Type: application/x-www-form-urlencoded" \
      -G \
      --data-urlencode "grant_type=password" \
      --data-urlencode "client_id=<the-client-id>" \
      --data-urlencode "client_secret=<the-client-secret>" \
      --data-urlencode "username=<your-SAP-CF-username>" \
      --data-urlencode "password=<your-SAP-CF-password>" \
      <the-authentication-endpoint>/oauth/token
      ```
      If the request is successful, you will obtain a JSON that contains a property `access_token` that you can use to access the secure endpoints.

    3. Send a request for the secured endpoint. The request must include the access token in the *authorization header* as described below:
      ```bash
      curl --verbose \
      --header "Content-Type: application/json" \
      --header "Accept: application/json" \
      --header "Authorization: Bearer <the-access-token-from-the-previous-step>" \
      https://sap-cf-microservice.cfapps.eu10.hana.ondemand.com/api/greetme/inma
      ```