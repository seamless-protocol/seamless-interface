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

# Frontend Deployment Workflow Secrets

This repository uses the following secrets for the deployment workflow. These secrets need to be configured in the GitHub repository's settings under the "Secrets and variables" section.

### Environment Variables for `.env.production`

4. **VITE_COIN_GECKO_API_URL**: CoinGecko API URL.
5. **VITE_TRM_LABS_API_URL**: TRM Labs API URL.
6. **VITE_BASE_WALLET_PROJECT_ID**: Base wallet project ID.
7. **VITE_LIFI_INTEGRATOR**: LIFI integrator identifier.
8. **VITE_BASE_RPC_FREE_1**: Base RPC URL.
9. **VITE_TENDERLY_NODE_ACCESS_KEY**: Tenderly node access key.
10. **VITE_SENTRY_AUTH_TOKEN**: Sentry authentication token.
11. **VITE_STYLE_VERSION**: Style version (e.g., `v3`).
12. **VITE_USE_TENDERLY_SIMULATION**: Boolean flag to enable/disable Tenderly simulation.
13. **VITE_QUERY_ERROR_LOGS_DISABLED**: Boolean flag to enable/disable query error logs.
14. **VITE_TENDERLY_RPC_URL**: Tenderly RPC URL.
15. **VITE_ALCHEMY_SIMULATION_RPC_URL**: Alchemy simulation RPC URL.
16. **VITE_EXTENSIVE_OPERATIONS_RPC_URL**: Extensive operations RPC URL.
17. **VITE_DEV_SERVER_URL**: Local development server URL.
18. **VITE_CYPRESS_RPC_ANVIL_TO_CLONE**: Cypress RPC Anvil URL to clone.
19. **VITE_CYPRESS_ANVIL_FORK_BLOCK_NUMBER**: Fork block number for Cypress Anvil.
20. **VITE_CYPRESS_TEST_ENV**: Cypress test environment name.
21. **VITE_CYPRESS_TEST_TENDERLY_PROJECT**: Cypress Tenderly project name.
22. **VITE_CYPRESS_TEST_TENDERLY_PROFILE**: Cypress Tenderly profile name.
23. **VITE_CYPRESS_TEST_TENDERLY_ACCESS_KEY**: Cypress Tenderly access key.
24. **VITE_DUNE_CACHE_API**: Dune cache API URL.
25. **VITE_DUNE_QUERY_KEY**: Dune query key.

### IPFS Secrets

26. **FILEBASE_ACCESS_KEY**: Filebase access key for IPFS upload.
27. **FILEBASE_SECRET_KEY**: Filebase secret key for IPFS upload.
