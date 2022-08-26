# Installation

- [Install fnm](https://github.com/Schniz/fnm#installation) or another node version manager (I *highly* recommend use-on-cd option)
- Use the correct node version: `fnm use`
- [Install pnpm](https://pnpm.io/installation)
- Then run `pnpm install`


## Start the app

What you need to do to (re)start the project:

- Frontend: run `pnpm dev`
- Backend: run `pnpm dev`

if you want to create a new user to sign-up:

```sh
curl --request POST \
  --url http://localhost:8000/users \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "username",
  "email":"username@email.com",
  "password":"password"
}'
```
