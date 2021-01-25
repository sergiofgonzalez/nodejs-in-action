# e16-hello-jwt

> grokking *JWT*

## Description

This example illustrates the fundamentals of *JWT tokens* using both a 3rd party module and vanilla Node.js.

> *JWT* is an abbreviaton for *JSON Web Token*, which is a compact URL-safe means of representing claims to be transferred between two parties. The claims in a *JWT* are encoded as a JSON object that is digitally signed using *JSON Web Signature* (JWS).

A JWT token consists of three parts separated by dots `.`:
```
header.payload.signature
```

### JWT components: Header
The header is the first component of the JWT token a typically consists of two keys that identify the type of the token and the algorithm used for the hashing:
```json
{
  "alg": "RS256",
  "typ": "JWT"
}
```

Then, the header object must be *Base64 URL encoded* before becoming the *header* part of the JWT token. This type of encoding is a slight variant over base64 that removes some specific characters from the input:
```javascript
function base64UrlEncode(str) {
  return Buffer
    .from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const jwtHeader = base64UrlEncode(JSON.stringify(header));
```

### JWT components: Payload
The payload is the second component of the JWT token and it contains the *claims*. Claims are simple key-value properties that can be classified as:

+ **Registered claims** &mdash; set of predefined recommended keys that identify the issuer (`iss`), expiration time (`exp`), etc.
+ **Public claims** &mdash; set of custom keys that should not clash with existing ones. Those can be either defined in the *IANA JSON Web Token Registry* or using a URI that ensures that there will be no collision with other claims.
+ **Private claims** &mdash; set of custom key-value pairs created to share info between parties that agree on using them and are neither registered or public claims.

For example, you might have:
```json
{
  "exp": "2019-02-14",
  "message": "Hello to Jason Isaacs!"
}
```

To generate the payload component, you will have to Base64 URL encode the previous JSON object:
```javascript
const jwtPayload = base64UrlEncode(JSON.stringify(payload));
```

### JWT components: Signature
The third component of the JWT token is the Base64 signature of the previous fields: 
```javascript
const crypto = require('crypto');

const jwtSecret = await readFileAsync(path.join(__dirname, 'private-key.pem'), 'utf8');

const signature = crypto.createSign('RSA-SHA256').update(`${ jwtHeader }.${ jwtPayload }`).sign(jwtSecret);
const jwtSignature = base64UrlEncode(signature);
```

Once the components have been computed, you have the JWT token readily available:
```javascript
const jwtToken = `${ jwtHeader }.${ jwtPayload }.${ jwtSignature }`;
```

Note that when using another algorithm, the signature creation might be slightly different:
```javascript
const crypto = require('crypto');
const jwtSecret = "secret";

const jwtSignature = crypto.createHmac('sha256', jwtSecret).update(`${ jwtHeader }.${ jwtPayload }`)
  .digest('base64');
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=/g, '');
```


### The example

In the example, it is demonstrated how to generate a *JWT* using the [njwt module](https://www.npmjs.com/package/njwt) but also, how to generate the exact same token using Node.js.

In the example, it is also demonstrated that when using a PEM file, it doesn't affect the result whether it includes some metadata or not.

That is, both:
```
Bag Attributes
    friendlyName: sample_cert
    localKeyID: 54 69 6D 65 20 31 35 32 30 33 33 33 37 33 32 32 38 36 
Key Attributes: <No Attributes>
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCR5FvMNNr29X+S
...
-----END PRIVATE KEY-----
```

and 
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCR5FvMNNr29X+S
...
-----END PRIVATE KEY-----
```

produce the same signature.

Note that the PEM files have been included for reference only, but should not be committed to the repository.