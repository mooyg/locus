# Locus

![CommitBadge](https://img.shields.io/github/last-commit/mooyg/locus)

Locus is an app which will help you to share your location with your loved one's with all other necessary features.

# Development

Currently building the webpage will start with mobile app as soon as this is done 😄.

# Getting Started

To contribute you to Locus you can check the [issues](https://github.com/mooyg/locus/issues) and then you can fork the repo and clone it.

**Requires Basic Knowledge Of -**

- [ReactJS](https://reactjs.org/)
- [Next.JS](https://nextjs.org/)
- [GraphQL](https://graphql.org/) / [TypeGraphQL](https://typegraphql.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [ExpressJS](https://expressjs.com/) / [Node.js](https://nodejs.org/en/)
- [TailwindCSS](https://tailwindcss.com/)
- [URQL](https://formidable.com/open-source/urql/)
- [Prisma ORM](https://prisma.io/)

After cloning the repo to get started you need to

- Run `npm i -g lerna` ( We use lerna for the monorepo )
- In the folder (root directory) `lerna bootstrap` to get setup with all the dependencies
- Create a .env file in `/packages/api` with

* `DISCORD_CLIENT_ID`
* `DISCORD_CLIENT_SECRET`
* `DATABASE_URL`
* `REDIS_PASSWORD`
* `DISCORD_CALLBACK_URL`
* `REDIS_HOST`

- After this you can get started by running `npm run dev:all` OR `yarn run dev:all` or `lerna run dev --parallel`

# Structure

- `packages/web`: Web App
- `packages/api`: Express GraphQL Server
