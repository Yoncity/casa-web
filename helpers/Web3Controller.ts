import dayjs from "dayjs";
import Web3 from "web3";
import CASA_ABI from "../constants/contracts/abi/casa.json";
import createAccount from "../redux/actions/account/createAccount";
import updateAccount from "../redux/actions/account/updateAccount";

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

  newLock(
    address: string,
    _timestamp: Date,
    _amount: String,
    dispatch: any,
    callback: any
  ) {
    const amount = this.web3.utils.toWei(_amount);
    const timestamp = dayjs(_timestamp).format("YYYYMMDD");
    const encoded = this.casaContract.methods.lockEth(timestamp).encodeABI();
    const tx = {
      from: address,
      to: CONTRACT_ADDRESS,
      data: encoded,
      nonce: "0x00",
      value: this.web3.utils.numberToHex(amount),
    };

    this.ethereum
      .request({ method: "eth_sendTransaction", params: [tx] })
      .then((transactionHash: string) => {
        createAccount({
          balance: amount,
          timestamp,
          owner: address,
          transactionHash,
        })(dispatch, callback);
      })
      .catch((error: any) => console.log("🚀 --- newLock --- error", error));
  }

  updateAccount(
    address: string,
    accountNumber: number,
    _amount: String,
    dispatch: any,
    callback: any
  ) {
    const amount = this.web3.utils.toWei(_amount);
    const encoded = this.casaContract.methods
      .updateLockedEth(accountNumber)
      .encodeABI();
    const tx = {
      from: address,
      to: CONTRACT_ADDRESS,
      data: encoded,
      nonce: "0x00",
      value: this.web3.utils.numberToHex(amount),
    };

    this.ethereum
      .request({ method: "eth_sendTransaction", params: [tx] })
      .then((transactionHash: string) => {
        updateAccount(
          { owner: address, accountNumber },
          {
            transactionHash,
            type: "close_account",
          }
        )(dispatch, callback);
        // dispatch(updateAccountPending())
      })
      .catch((error: any) =>
        console.log("🚀 --- updateAccount --- error", error)
      );
  }

  closeAccount(address: string, accountNumber: Number, dispatch: any) {
    const timestamp = dayjs().format("YYYYMMDD");
    const encoded = this.casaContract.methods
      .unLockEth(accountNumber, timestamp)
      .encodeABI();
    const tx = {
      from: address,
      to: CONTRACT_ADDRESS,
      data: encoded,
      nonce: "0x00",
    };

    this.ethereum
      .request({ method: "eth_sendTransaction", params: [tx] })
      .then((transactionHash: string) => {
        updateAccount(
          { owner: address, accountNumber },
          {
            transactionHash,
            type: "close_account",
          }
        )(dispatch);
      })
      .catch((error: any) =>
        console.log("🚀 --- closeAccount --- error", error)
      );
  }
}

export default Web3Controller;
