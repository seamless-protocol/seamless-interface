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
[![Discord](https://img.shields.io/discord/1067165013397213286?label=discord)](https://discord.com/invite/seamlessprotocol)
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

## Deployment Workflow Secrets

This repository uses the following secrets for the deployment workflow. These secrets need to be configured in the GitHub repository's settings under the "Secrets and variables" section.

### Environment Variables for `.env.production`

- **VITE_COIN_GECKO_API_URL**=
- **VITE_TRM_LABS_API_URL**=
- **VITE_BASE_WALLET_PROJECT_ID**=
- **VITE_LIFI_INTEGRATOR**=
- **VITE_BASE_RPC_FREE_1**=
- **VITE_BASE_MAIN_RPC_URL**=
- **VITE_BASE_RPC_PAID_WS_2**=
- **VITE_SENTRY_AUTH_TOKEN**=
- **VITE_STYLE_VERSION**=
- **VITE_USE_TENDERLY_SIMULATION**=
- **VITE_ALCHEMY_SIMULATION_RPC_URL**=
- **VITE_EXTENSIVE_OPERATIONS_RPC_URL**=

### IPFS Secrets

- **FILEBASE_ACCESS_KEY**= (Filebase access key for IPFS upload.)
- **FILEBASE_SECRET_KEY**= (Filebase secret key for IPFS upload.)
