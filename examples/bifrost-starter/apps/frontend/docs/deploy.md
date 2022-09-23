# Deploying Frontend

Several options exist, the simplest one being using Vercel/Netlify with git integration for an extremely simple frontend deployment.

For more involved use case you can find a Dockerfile in frontend/devops.

As we need the whole monorepo as context, it should be used from the root, a convenience `build.sh` script is there to do so, invoke it like so `./apps/frontend/devops/build.sh`.
