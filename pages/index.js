import Navbar from "@components/Navbar";
import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "@utils/loadContract";
import WrongChain from "@components/WrongChain";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ACCOUNT,
  SET_ACCOUNT_CONNECTED,
  SET_ETH_BALANCE,
} from "@features/accountSlice";
import TabSection from "@components/TabSection";
import DepositTab from "@components/DepositTab";
import WithdrawTab from "@components/WithdrawTab";
import {
  SET_BANK_CONTRACT,
  SET_CONTRACTS_LOADED,
  SET_TOKEN_CONTRACT,
} from "@features/contractSlice";
import { SET_WEB3 } from "@features/web3Slice";
import Loader from "@components/Loader";
import { ethers } from "ethers";
import Head from "next/head";
import HoldingsTab from "@components/HoldingsTab";
import NoAccountConnected from "@components/NoAccountConnected";
import NoMetamask from "@components/NoMetamask";

export default function Home() {
  const networkIDs = [1337, 4];
  const [isWrongChain, setIsWrongChain] = useState(false);

  const { isConnected } = useSelector((state) => ({ ...state.account }));
  const { selectedTab } = useSelector((state) => ({ ...state.tab }));
  const { loaded } = useSelector((state) => ({ ...state.contract }));
  const { web3 } = useSelector((state) => ({ ...state.web3 }));
  const dispatch = useDispatch();

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const setAccountListener = (provider) => {
    // realtime Metamask event listeners
    // provider.on("accountsChanged", (accounts) => setAccount(accounts[0]));
    provider.on("accountsChanged", (_) => window.location.reload());
    provider.on("chainChanged", (_) => window.location.reload());
  };

  const loadBlockchainData = async () => {
    // Check if metamask exists
    let detectProvider = await detectEthereumProvider();
    if (detectProvider) {
      setAccountListener(detectProvider); // metamask provider listening for events

      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      dispatch(SET_WEB3(web3Provider));

      const { chainId } = await web3Provider.getNetwork();
      const accounts = await web3Provider.listAccounts();

      // Check if any account is currently connected.
      if (accounts.length > 0) {
        const acc = await web3Provider.getSigner().getAddress();
        dispatch(SET_ACCOUNT(acc));
        dispatch(SET_ACCOUNT_CONNECTED(true));
        const balance = await web3Provider.getBalance(acc);
        dispatch(SET_ETH_BALANCE(balance));
      } else {
        dispatch(SET_ACCOUNT_CONNECTED(false));
        console.log("No account connected. Connect to Metamask.");
      }

      // Load Contracts
      if (networkIDs.includes(chainId)) {
        setIsWrongChain(false);
        const tokenContract = await loadContract(
          chainId,
          "Token",
          web3Provider
        );
        const dBankContract = await loadContract(
          chainId,
          "dBank",
          web3Provider
        );

        dispatch(SET_BANK_CONTRACT(dBankContract));
        dispatch(SET_TOKEN_CONTRACT(tokenContract));
        dispatch(SET_CONTRACTS_LOADED(true));
      } else {
        setIsWrongChain(true);
        console.log("SWITCH TO OTHER CHAIN.");
      }
    } else {
      console.log("Please download Metamask.");
      return <NoMetamask />;
    }
  };

  if (!web3) {
    return <NoMetamask />;
  }

  return (
    <div className="h-screen w-full">
      <Head>
        <title>Blockchain dApp</title>
      </Head>
      {isWrongChain ? (
        <WrongChain />
      ) : loaded ? (
        <>
          <Navbar />
          {isConnected ? (
            <>
              <TabSection />
              <div className="mt-5">
                {selectedTab == 0 && <DepositTab />}
                {selectedTab == 1 && <WithdrawTab />}
                {selectedTab == 2 && <HoldingsTab />}
              </div>
            </>
          ) : (
            <NoAccountConnected />
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

/**
 * RINKEBY
 *  TOKEN DEPLOYED AT 0x6760a15CF4AAc49Ee4570667b06B7f0391D3Bd01
 *  BANK DEPLOYED AT 0x888f585BEDfe9990E2Ff342855b7EdC63D706E1c
 */
