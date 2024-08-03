# Seamless Protocol Interface

React front end application for interacting with [Seamless Protocol](https://seamlessprotocol.com/).

<!-- Badge row 1 - status -->

[![GitHub contributors](https://img.shields.io/github/contributors/seamless-protocol/seamless-interface)](https://github.com/seamless-protocol/seamless-interface/graphs/contributors)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/w/seamless-protocol/seamless-interface)](https://github.com/seamless-protocol/seamless-interface/graphs/contributors)
[![GitHub Stars](https://img.shields.io/github/stars/seamless-protocol/seamless-interface.svg)](https://github.com/seamless-protocol/seamless-interface/stargazers)
![GitHub repo size](https://img.shields.io/github/repo-size/seamless-protocol/seamless-interface)
[![GitHub](https://img.shields.io/github/license/seamless-protocol/seamless-interface?color=blue)](https://github.com/seamless-protocol/seamless-interface/blob/master/LICENSE.md)

<!-- Badge row 2 - links and profiles -->

[![Website](https://img.shields.io/website-up-down-green-red/https/seamlessprotocol.com.svg)](https://seamlessprotocol.com)
[![Docs](https://img.shields.io/badge/docs-up-green)](https://docs.seamlessprotocol.com/)
[![Discord](https://img.shields.io/discord/1067165013397213286?label=discord)](https://discord.com/invite/Uye9jCVgUp)
[![Twitter seamlessfi](https://img.shields.io/twitter/follow/seamlessfi?style=social)](https://twitter.com/seamlessfi)

<!-- Badge row 3 - detailed status -->

[![GitHub pull requests by-label](https://img.shields.io/github/issues-pr-raw/seamless-protocol/seamless-interface)](https://github.com/seamless-protocol/seamless-interface/pulls)
[![GitHub Issues](https://img.shields.io/github/issues-raw/seamless-protocol/seamless-interface.svg)](https://github.com/seamless-protocol/seamless-interface/issues)

## Deployment instructions

### Create .env.production file

Create .env.production file and copy content from .env.production.sample file.
Don't forget to add your `VITE_BASE_WALLET_PROJECT_ID`

- run `npm run build`
- test your prod build locally `npm run preview` (after building it)

## Run application locally

### Create .env.development file

Create .env.development file and copy content from .env.development.sample file.
Don't forget to add your `VITE_BASE_WALLET_PROJECT_ID`

- run `npm run dev`

easy to find icons:
https://icon-sets.iconify.design/

## Run cypress tests with anvil

- make sure to set `test_env` inside of a cypress.config to `anvil`
- run `npm run anvil`
- wait anvil to start (few mins 😕)
- run `npx cypress open`
- start your tests

btw you don't have to kill anvil, it will be killed by next npm run anvil
if you want to to kill anvil run:

- `pkill -f anvil`

## Run cypress tests with tenderly

- make sure to set `test_env` empty or `tenderly`
- run `npx cypress open`
- start your tests
