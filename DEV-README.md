# rLending demo ÐApp
This is the Developer's README on how to integrate [rLending library][1] to rLending UI

## Requirements
 * metamask
 * node 12.x
 * deployed rLending-protocol smart contracts

## Usage

If you make changes to the library, you have to re-compile it FROM WITHIN THE JS FOLDER
```bash
yarn install --check-files
```

Then you need to update the node_module FROM WITHIN THE UI FOLDER
```bash
yarn add ../rlending-js/
yarn add decimal.js
```

Then you check the dependencies are updated
```bash
yarn install --check-files
```

Finally you run the Dapp
```bash
yarn run serve
```


Then access the ÐApp in your browser at the given url (<https://localhost> by default)

[1]: https://github.com/riflending/rlending-js
[2]: https://github.com/rsksmart/DeFiProt
