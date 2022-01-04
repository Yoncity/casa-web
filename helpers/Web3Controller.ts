import Web3 from "web3";
import CASA_ABI from "../constants/contracts/abi/casa.json";
// import { CASA_ADDRESS } from "../constants/contracts/addresses";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
class Web3Controller {
  web3: any;
  ethereum: any = window.ethereum;
  casaContract: any;

  supportedBrowser = this.ethereum ? true : false;

  constructor() {
    this.web3 = new Web3(this.ethereum);

    const contract = new this.web3.eth.Contract(CASA_ABI, CONTRACT_ADDRESS);
    this.casaContract = contract;
  }

  async connectWallet(): Promise<string | undefined> {
    if (this.ethereum) {
      const accounts = await this.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    }
    return undefined;
  }

  async getContractBalance(): Promise<Number> {
    const balance = await this.casaContract.methods.contractBalance().call();
    return this.web3.utils.fromWei(balance, "ether");
  }

  async getTotalUsers(): Promise<Number> {
    const totalUsers = await this.casaContract.methods.getTotalUsers().call();
    return totalUsers;
  }

  listenToEvents(address: string) {
    console.log("🚀 --- listenToEvents --- address", address);
    this.casaContract.events.NewAccount(
      { filter: { ownerAddress: [address] } },
      (error: any, data: any) => {
        if (!error) console.log("🚀 --- data", data);
      }
    );
  }
}

export default Web3Controller;
