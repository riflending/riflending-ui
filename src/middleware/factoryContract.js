import { ethers } from 'ethers'
import Vue from 'vue'
import { constants, address, abi } from './constants'

export default class factoryContract {
  constructor() {
    this.addressContract = address.testnet
  }

  getSigner() {
    const format = Vue.web3Provider.formatter.formats
    const signer = Vue.web3Provider.getSigner()
    //asign format to signer
    Object.assign(signer.provider.formatter, { format })
    return signer
  }

  createContract(address, abi, provider) {
    return new ethers.Contract(address, abi, provider)
  }

  validateContractName(name) {
    if (!constants.hasOwnProperty(name)) {
      console.error(`contract name (${name}) not exist in constants`)
      return false
    }
    return true
  }

  getContract(name) {
    if (this.validateContractName(name)) {
      return this.createContract(this.addressContract[name], abi[name], Vue.web3Provider)
    }
    return
  }

  getContractToken(name) {
    if (this.validateContractName(name)) {
      return this.createContract(this.addressContract[name], abi['Erc20'], Vue.web3Provider)
    }
    return
  }

  getContractCtoken(name) {
    if (this.validateContractName(name)) {
      let abiCtoken = name == 'cRBTC' ? abi['cRBTC'] : abi['cErc20']
      return this.createContract(this.addressContract[name], abiCtoken, Vue.web3Provider)
    }
    return
  }

  getContractByNameAndAbiName(nameContract, nameAbi) {
    if (this.validateContractName(nameContract) && abi.hasOwnProperty(nameAbi)) {
      return this.createContract(this.addressContract[nameContract], abi[nameAbi], Vue.web3Provider)
    }
    return
  }
}
