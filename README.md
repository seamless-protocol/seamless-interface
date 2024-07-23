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

## Run cypress tests
- Make sure that 0x818DB96e1b5c64bBE6307c95473E313c743FF7d0 has enough funds on tenderly rpc: https://virtual.base.rpc.tenderly.co/55ec1a11-fb48-4d5e-a7b3-dea034a0f06c
- run `npx cypress open`
- start your tests
