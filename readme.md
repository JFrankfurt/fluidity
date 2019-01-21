### setup
1. populate a .env file with the needed data (see .env.example)
2. install dependencies with `yarn` or `npm i`
3. launch the app w/ `yarn start` or `npm run start`

I am currently capping transactions at the most recent 300. Ideally this would handle paginating transaction data.

Another potential improvement is adding a portal tooltip to `HashTrunc`'s currently silent copying behavior. I'll probably do that and keep it for use later. :)
