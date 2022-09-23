#!/bin/sh
# gen __ENV.js for runtime env var import on client side
set -e
scriptname="public/__ENV.js"
sourcename="$1"

if [ -z "$sourcename" ]; then
  echo "No environement supplied"
  echo ""
  echo "usage: gen_env.sh <env>"
  echo "  eg: 'gen_env.sh production' with an .env.production"
  echo "  /!\ never use this script for secrets, thoses should not be injected on client side"
  exit 1
fi

# Recreate config file
rm -rf "$scriptname"
touch "$scriptname"

# Add assignment
echo "window.__ENV = {" >>"$scriptname"

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [ -n "$line" ]; do
  # ignore lines starting with comment '#'
  if printf '%s\n' "$line" | grep -q -e '^#.*'; then
    continue
  fi
  # ignore lines not starting with NEXT_PUBLIC_ (only include public env var for client)
  if printf '%s\n' "$line" | grep -v -q -e '^NEXT_PUBLIC_.*'; then
    continue
  fi

  # ignore empty lines
  if [ -z "$line" ]; then
    continue
  fi

  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  env=$(eval "echo \"\$$varname\"")
  # Otherwise use value from .env file
  if [ -z "$env" ]; then
    value=${varvalue}
  else
    value=${env}
  fi

  sanitized_value=$(printf '%s\n' "$value" | sed -e "s/^[\"']//" | sed -e "s/[\"']$//" | sed -e 's/\"/\\\"/g')
  # Append configuration property to JS file
  echo "  $varname: \"$sanitized_value\"," >>"$scriptname"
done <".env.$sourcename"

echo "}" >>"$scriptname"
