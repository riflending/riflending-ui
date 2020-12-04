import { ethers } from "ethers";
import { constants, address, abi } from "./constants";

export default class Util {

    constructor() {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        //add this format to support RSK
        //validate formatt  provider
        const format = this.provider.formatter.formats
        if (format) format.receipt['root'] = format.receipt['logsBloom']
        Object.assign(this.provider.formatter, { format: format });
        this.signer = this.provider.getSigner();
        //asign format to signer
        Object.assign(this.signer.provider.formatter, { format: format });

        this.addressContract = address.testnet;
    }

    createContract(address, abi, provider) {
        return new ethers.Contract(address, abi, provider);
    }

    validateContractName(name) {
        if (!constants.hasOwnProperty(name)) {
            console.error(`contract name (${name}) not exist in constants`);
            return false;
        }
        return true;
    }

    getContract(name) {
        if (this.validateContractName(name)) {
            return this.createContract(this.addressContract[name], abi[name], this.provider);
        }
        return;
    }


    getContractCtoken(name) {
        if (this.validateContractName(name)) {
            let abiCtoken = ((name) == 'cRBTC') ? abi["cRBTC"] : abi["cErc20"];
            return this.createContract(this.addressContract[name], abiCtoken, this.provider);
        }
        return;
    }

    getContractByNameAndAbiName(nameContract, nameAbi) {
        if ((this.validateContractName(nameContract)) && (abi.hasOwnProperty(nameAbi))) {
            return this.createContract(this.addressContract[nameContract], abi[nameAbi], this.provider);
        }
        return;
    }
}