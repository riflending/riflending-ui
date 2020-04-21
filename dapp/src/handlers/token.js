import TokenContract from '@/contracts/FaucetToken.json';
import { send, web3 } from '@/store/modules';

export default class Controller {
  constructor(tokenAddress) {
    this.address = tokenAddress;
    this.instance = new web3.eth.Contract(TokenContract.abi, tokenAddress);
  }

  static deploy(from, initialAmount, name, decimalUnits, symbol) {
    return new Promise((resolve, reject) => {
      const args = [initialAmount, name, decimalUnits, symbol];
      const newToken = new web3.eth.Contract(TokenContract.abi);
      const deploy = newToken.deploy({
        data: TokenContract.bytecode,
        arguments: args,
      });
      send(deploy, from)
        .then((token) => token.options.address)
        .then(resolve)
        .catch(reject);
    });
  }

  get name() {
    return new Promise((resolve, reject) => {
      this.instance.methods.name()
        .call()
        .then(resolve)
        .catch(reject);
    });
  }

  get decimals() {
    return new Promise((resolve, reject) => {
      this.instance.methods.decimals()
        .call()
        .then(resolve)
        .catch(reject);
    });
  }

  get symbol() {
    return new Promise((resolve, reject) => {
      this.instance.methods.symbol()
        .call()
        .then(resolve)
        .catch(reject);
    });
  }
}
