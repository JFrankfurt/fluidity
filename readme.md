### To run
```bash
yarn start
# or
npm run start
```

This could be substantially improved for cases where the account being looked up has many transactions. The Etherscan api allows a max return of 10k transactions, but this app should really be paginating at a far lower threshold than that. I am currently capping the results at 300. 

Another potential improvement is adding a portal tooltip to `HashTrunc`'s currently silent copying behavior. I'll probably do that and keep it for use later. :)
