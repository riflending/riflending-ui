const FaucetToken = require('../build/contracts/FaucetToken.json');
const Controller = require('../build/contracts/Controller.json');

const controllerAddress = '0xCfEB869F69431e42cdB54A4F4f105C19C080A601';

getAccount = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts()
      .then((accounts) => {
        [rBank, alice, bob, charlie, otk1, otk2, otk3] = accounts;
        resolve({rBank, alice, bob, charlie, otk1, otk2, otk3});
      })
      .catch(reject);
  });
};

deployToken = (initialSupply, name, decimalDigits, symbol) => {
  return new Promise((resolve, reject) => {
    let otk = null;
    let token1 = new web3.eth.Contract(FaucetToken.abi);
    let deploy = token1.deploy({data: FaucetToken.bytecode, arguments: [initialSupply, name,decimalDigits,symbol]});
    getAccount()
      .then(({otk1}) =>{
        otk = otk1;
        return deploy.estimateGas({from: otk})
      })
      .then(gas => deploy.send({from:otk, gas}))
      .then(token => {
      console.log(`\n================================= Token ${name} =================================`);
        console.log(`Contract Token: ${name} succesfully created with ${initialSupply} ${symbol} initial supply.`);
        console.log(`Token address: ${token._address}\n`);
        resolve(token);
      })
      .catch(reject);
  });
};

initialize = (callback) =>{
  console.log('Rbank initialization...\n');
  let controller = new web3.eth.Contract(Controller.abi, controllerAddress);
  // set collateralFactor and liquidationFactor
  const collateralFactor = 200000;
  const liquidationFactor = 100000;
  const m = {
    tk1: {
      initialSupply: 20000,
      name: 'Ronald Coin',
      decimalDigits: 0,
      symbol: 'RDC'
    },
    tk2: {
      initialSupply: 30000,
      name: 'Anni Coin',
      decimalDigits: 0,
      symbol: 'ANC'
    },
    tk3: {
      initialSupply: 20000,
      name: 'Mesi Coin',
      decimalDigits: 0,
      symbol: 'MSC'
    },
  };
  const aliceTokens = 5000;
  const bobTokens = 2000;
  const charlieTokens = 1000;
  getAccount()
    .then(({rBank}) => {
      controller.methods.setCollateralFactor(collateralFactor)
        .estimateGas({from: rBank})
        .then(gas => controller.methods.setCollateralFactor(collateralFactor).send({from: rBank, gas}))
        .then(() => console.log(`Set succesfully collateral factor to ${collateralFactor}`));
      controller.methods.setLiquidationFactor(liquidationFactor)
        .estimateGas({from: rBank})
        .then(gas => controller.methods.setLiquidationFactor(liquidationFactor).send({from: rBank, gas}))
        .then(() => console.log(`Set succesfully liquidation factor to ${liquidationFactor}`));
    });
  // deploy Token 1 and allocate to alice
  getAccount()
    .then(({alice, bob, charlie}) => {
      deployToken(m.tk1.initialSupply, m.tk1.name, m.tk1.decimalDigits, m.tk1.symbol)
        .then((token) => {
          token.methods.allocateTo(alice, aliceTokens)
            .estimateGas({from: alice})
            .then(gas => token.methods.allocateTo(alice, aliceTokens).send({from: alice, gas}))
            .then(() => console.log(`Succesfully allocated to Alice ${aliceTokens} ${m.tk1.symbol}`));
        });
      // deploy Token 2 and allocate to bob
      deployToken(m.tk2.initialSupply, m.tk2.name, m.tk2.decimalDigits, m.tk2.symbol)
        .then((token) => {
          token.methods.allocateTo(bob, bobTokens)
            .estimateGas({from: alice})
            .then(gas => token.methods.allocateTo(bob, bobTokens).send({from: bob, gas}))
            .then(() => console.log(`Succesfully allocated to Bob ${bobTokens} ${m.tk2.symbol}`));
        });
      deployToken(m.tk3.initialSupply, m.tk3.name, m.tk3.decimalDigits, m.tk3.symbol)
        .then((token) => {
          token.methods.allocateTo(charlie, charlieTokens)
            .estimateGas({from: charlie})
            .then(gas => {
              return token.methods.allocateTo(charlie, charlieTokens).send({from: charlie, gas});
            })
            .then(() =>{
              console.log(`Succesfully allocated to Charlie ${charlieTokens} ${m.tk3.symbol}`);
              callback();
            })
        })
    });
};

module.exports = initialize;
