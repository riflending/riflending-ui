import { ethers } from "ethers";
import { constants, address, abi } from "./constants";

export default class Util {

    constructor() {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();
        this.addressContract = address.testnet;
    }

    getContract(name) {
        if (!constants.hasOwnProperty(name)) {
            console.error(`contract name (${name}) not exist in constants`);
            return;
        }
        return new ethers.Contract(this.addressContract[name], abi[name], this.provider);
    }
}