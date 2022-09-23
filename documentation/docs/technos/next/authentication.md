---
sidebar_position: 2
---

# Authentication

The project uses a JWT based authentication system with access and refresh tokens to protect the backend API and authenticate the user.

The idea is to have two types of tokens:

- **Access Tokens** are short lived tokens that are used to access protected data from the API.
- **Refresh Tokens** are long lived tokens and are used to get valid access tokens.

Refresh tokens are subject to strict security storage rules. In our case they are stored in the cookies by the API directly with the `httpOnly` and `secure` options set to `true`.

Access tokens can be used directly by the client to fetch data from the API, but they have short validity time (10 minutes). When an access token expire and is used to fetch some data from the backend, an API request is first made in the background to get a new valid access token with the refresh token; finally, the original request is made to the backend.

_WARNING_
If you are using two different domain names for the front server and for the back server, you need to implement a proxy for you api calls.

If you want to know more about this authentication system, feel free to read this [article](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)
