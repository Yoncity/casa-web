import Web3 from "web3";
import CASA_ABI from "../constants/contracts/abi/casa.json";
// import { CASA_ADDRESS } from "../constants/contracts/addresses";
import createAccount from "../redux/actions/account/createAccount";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

class Web3Controller {
  web3: any;
  // @ts-ignore
  ethereum: any = window.ethereum;
  casaContract: any;

  supportedBrowser = this.ethereum ? true : false;

  BLOCKS: Array<Number> = [];

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

  isDuplicate(blockNumber: Number) {
    if (this.BLOCKS.includes(blockNumber)) return true;
    this.BLOCKS.push(blockNumber);
    return false;
  }

  listenToEvents(address: string, dispatch: any) {
    this.casaContract.events.NewAccount(
      { fromBlock: "latest", filter: { ownerAddress: [address] } },
      (error: any, result: any) => {
        if (error) {
          console.log("🚀 --- listenToEvents --- error", error);
          return;
        }

        if (!this.isDuplicate(result.blockNumber)) {
          const data = {
            transactionHash: result.transactionHash,
            blockNumber: result.blockNumber,
            blockHash: result.blockHash,
            signature: result.signature,
            owner: result.returnValues.ownerAddress,
            accountNumber: result.returnValues._account,
            balance: result.returnValues._amount,
            timestamp: result.returnValues._timestamp,
          };
          dispatch(createAccount(data));
        }
      }
    );
  }
}

export default Web3Controller;
