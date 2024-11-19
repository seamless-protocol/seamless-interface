# Deployment docs

## Current process

- pull latest changes on main
- make sure you are on main brench
- go to root of a project
- run `npm run build:prod`
- upload `dist` to older backet
- send CID on slack eng channel
- approve CID on cloudflare to preproduction
- approve CID on cloudflare to production

## New process

- push your latest changes to main
- click run workflow in github actions
  - pull latest changes from main
  - run `npm run build:prod`
  - create new backet with timestamp
  - upload to new backet inside of builds folder
  -
- send CID for approvement
