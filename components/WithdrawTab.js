import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";

export default function WithdrawTab() {
  const [depositStatus, setDepositStatus] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { web3 } = useSelector((state) => ({ ...state.web3 }));
  const { account } = useSelector((state) => ({ ...state.account }));
  const { dBankContract } = useSelector((state) => ({
    ...state.contract,
  }));

  /** Retrieving the `Deposit` status */
  useEffect(() => {
    const checkDepositStatus = async () => {
      const status = await dBankContract.isDeposited(account);
      setDepositStatus(status);
    };

    checkDepositStatus();
  }, [refresh]);

  const withdrawFunds = async (e) => {
    e.preventDefault();
    let signer = await web3.getSigner();
    let dBankWithSigner = dBankContract.connect(signer);

    let tx = await dBankWithSigner.withdraw();
    setIsProcessing(true);
    console.log("PROCESSING");
    await web3.waitForTransaction(tx.hash);
    console.log("PROCESSED");

    setIsProcessing(false);
    setRefresh(!refresh);
  };

  return (
    <div className="flex justify-center w-full ">
      <div className="text-[19px] flex flex-col">
        <span>Do you want to withdraw + take interest?</span>
        <div className="flex w-full justify-center items-center">
          <button
            onClick={(e) => {
              withdrawFunds(e);
            }}
            disabled={depositStatus == false}
            className="inline-block transition-all duration-150 py-3 text-xl text-white bg-gray-800 px-5 hover:bg-gray-700 rounded-xl my-3 disabled:bg-gray-500 disabled:cursor-not-allowed">
            {isProcessing ? (
              <div className="flex items-center justify-center ">
                <TailSpin color="#fff" height={22} width={22} />
              </div>
            ) : (
              "Withdraw"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
