# Installation

- [Install fnm](https://github.com/Schniz/fnm#installation) or another node version manager (I _highly_ recommend use-on-cd option)
- Use the correct node version: `fnm use`
- [Install pnpm](https://pnpm.io/installation)
- Then run `pnpm install`
- Then run `pnpm dev` and once launched: `cd apps/backend && pnpm migration:run` in another window to run the initial migrations

## Start the app

What you need to do to (re)start the project: `pnpm dev` will start the frontend and the backend and build the shared code.

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

if you have a 400: relation user does not exist, you need to run the backend migration:

```sh
cd apps/backend
pnpm migration:run
```
