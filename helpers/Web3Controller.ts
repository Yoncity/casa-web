import dayjs from "dayjs";
import Web3 from "web3";
import CASA_ABI from "../constants/contracts/abi/casa.json";
import createAccount, {
  createAccountPending,
} from "../redux/actions/account/createAccount";
import updateAccount, {
  updateAccountPending,
} from "../redux/actions/account/updateAccount";

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

  listenToEvents(address: string, dispatch: any, callback: any) {
    this.casaContract.events.allEvents(
      { fromBlock: "latest", filter: { ownerAddress: [address] } },
      (error: any, result: any) => {
        if (error) {
          console.log("🚀 --- listenToEvents --- error", error);
          return;
        }

        if (!this.isDuplicate(result.blockNumber)) {
          const accountDetails = {
            owner: (result.returnValues.ownerAddress as string).toLowerCase(),
            accountNumber: result.returnValues._account,
          };
          const data = {
            transactionHash: result.transactionHash,
            blockNumber: result.blockNumber,
            blockHash: result.blockHash,
            signature: result.signature,
          };
          switch (result.event) {
            case "NewAccount":
              createAccount({
                ...accountDetails,
                balance: result.returnValues._amount,
                timestamp: result.returnValues._timestamp,
                ...data,
              })(dispatch);
              break;
            case "UpdateAccount":
              updateAccount(accountDetails, {
                ...data,
                amount: result.returnValues._amount,
                status: "update_account",
              })(dispatch);
              break;
            case "CloseAccount":
              updateAccount(accountDetails, {
                ...data,
                status: "close_account",
              })(dispatch);
              break;
          }
          callback();
        }
      }
    );
  }

  newLock(address: string, _timestamp: Date, _amount: String, dispatch: any) {
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
      .then(() => dispatch(createAccountPending()))
      .catch((error: any) => console.log("🚀 --- newLock --- error", error));
  }

  updateAccount(
    address: string,
    accountNumber: number,
    _amount: String,
    dispatch: any
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
      .then(() => dispatch(updateAccountPending()))
      .catch((error: any) => console.log("🚀 --- newLock --- error", error));
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
      .then(() => dispatch(createAccountPending()))
      .catch((error: any) => console.log("🚀 --- newLock --- error", error));
  }
}

export default Web3Controller;
