# Part 3 &mdash; A simple OAuth2 client
> building a simple OAuth2 client

## Contents
+ TBD

## Intro

> The OAuth protocol is all about getting tokens to the **client** and letting the **client** used the access token to access **protected resources** on behalf of the **resource owner**.

## Register an OAuth client with an authorization server

The OAuth client and the authorization server need to know a few things about each other before they can talk. The OAuth protocol itself doesn't care how this happens, only that it must happen.

+ An OAuth **client** is identified by a special string known as the *client identifier*, commonly denoted as `client_id`. This string must be unique for each **client** at a given **authorization server**. Again, the protocol doesn't care about whether the **authorization server** assigns this `client_id` through a *Developer's Portal*, with dynamic client registration, or through some other process (such as manual configuration).

| NOTE |
| :--- |
| We will build an OAuth **client** as a web application running on a web server. The fact that the **client** is actually a server can be confusing. You should remember that an OAuth **client** is the piece of software that gets a token from the **authorization server** and uses that token at a **protected resource** to get access to some content that belongs to the **resource owner**.<br>A web-based **client** it's OAuth's original scenario, and also the most usual one. Mobile, desktop, and in-browser clients are also possible. |

Our authorization server has assigned this client a `client_id=oauth-client-1`.

Our client is known as a *confidential client** in the OAuth world, which means it has a shared secret that it stores in order to authenticate itself when talking to the authorization server. This secret is typically denoted `client_secret`. The `client_secret` can be passed to the authorization server in different ways, in our example we will be using HTTP Basic authentication header. The `client_secret` is almost always assigned by the **authorization server**. In our example, `client_secret=oauth-client-secret-1`.

Many OAuth client libraries also include a few other config options, such as a `redirect_uri`, a set of scopes to request, etc. Those additional options are determined by the **client** and not assigned by the authorization server:

```
client_id: oauth-client-1
client_secret: oauth-client-secret-1
redirect_uris: ['http://localhost:9000/callback']
```

Additionally, the **client** needs to know which server it's talking to: that is, the exact location of the authorization and token endpoints of the **authorization server**:

```
authorizationEndpoint: 'http://localhost:9001/authorize'
tokenEndpoint: 'http://localhost:9001/token'
```

## Get a token using the authorization code grant type

In this flow, the **client** will get a token from the **authorization server** by making the **resource owner** interact with the **authorization server** in order to delegate some of its rights to the **client**.

The **client** must send the **resource owner** to the **authorization server**'s authorization endpoint. Then, the **authorization server** must send an authorization code back to the client using the `redirect_uri`. Finally, the **client** must use that authorization code to the **authorization server**'s token endpoint along with the `client_id` and `client_secret` to receive an OAuth access token. The **client** will then need to parse it, and store it, as that token is the one that must present when interacting with the **protected resource** to get access to the secured content.


### Sending the authorization request

### Processing the authorization response

### Adding cross-site protection with the state parameter

## Use the token with a protected resource

## Refresh the access token

## Summary


## You know you've mastered this chapter when...

### ToDo
