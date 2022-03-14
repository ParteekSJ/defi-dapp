import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { utils } from "ethers";
import { TailSpin } from "react-loader-spinner";
/** https://ethereum.stackexchange.com/questions/111660/how-to-convert-wei-to-eth-with-ethers-js */

export default function DepositTab() {
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [depositStatus, setDepositStatus] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { web3 } = useSelector((state) => ({ ...state.web3 }));
  const { account } = useSelector((state) => ({ ...state.account }));
  const { dBankContract } = useSelector((state) => ({
    ...state.contract,
  }));
  const [isProcessing, setIsProcessing] = useState(false);

  /** Retrieving the `Deposit` status */
  useEffect(() => {
    const checkDepositStatus = async () => {
      const status = await dBankContract.isDeposited(account);
      setDepositStatus(status);
    };

    checkDepositStatus();
  }, [refresh]);

  const depositFunds = async (e, enteredAmount) => {
    e.preventDefault();
    let ethAmount = utils.parseEther(enteredAmount);
    let signer = await web3.getSigner();

    let dBankWithSigner = dBankContract.connect(signer);
    let tx = await dBankWithSigner.deposit({
      value: ethAmount,
    });

    setIsProcessing(true);
    console.log("PROCESSING");
    await web3.waitForTransaction(tx.hash);
    console.log("PROCESSED");
    setIsProcessing(false);

    setEnteredAmount(0);
    setRefresh(!refresh);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="text-[19px] flex flex-col">
        <p className="flex flex-col items-center">
          <span>How much do you want to deposit?</span>
          <span>(min amount is 0.01 ETH)</span>
          {depositStatus && (
            <span className="font-bold text-slate-600">
              Current Deposit is active.
            </span>
          )}
        </p>
        <form className="mt-5">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="number"
            step={0.01}
            min={0}
            placeholder="Amount..."
            value={enteredAmount}
            onChange={(e) => setEnteredAmount(e.target.value)}
          />
          <div className="flex w-full justify-center items-center">
            <button
              onClick={(e) => {
                depositFunds(e, enteredAmount);
              }}
              disabled={enteredAmount == 0 || depositStatus == true}
              className="inline-block transition-all duration-150 py-3 text-xl text-white bg-gray-800 px-5 hover:bg-gray-700 rounded-xl my-3 disabled:bg-gray-500 disabled:cursor-not-allowed">
              {isProcessing ? (
                <div className="flex items-center justify-center ">
                  <TailSpin color="#fff" height={22} width={22} />
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
