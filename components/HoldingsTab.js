import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { utils } from "ethers";
import { ThreeDots } from "react-loader-spinner";

export default function HoldingsTab() {
  const [DBCBal, setDBCBal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { account, ethBalance } = useSelector((state) => ({
    ...state.account,
  }));
  const { tokenContract } = useSelector((state) => ({
    ...state.contract,
  }));

  useEffect(() => {
    setLoading(true);
    const getTokenBalance = async () => {
      const bal = await tokenContract.balanceOf(account);
      setDBCBal(utils.formatEther(bal.toString()));
      setLoading(false);
    };

    getTokenBalance();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ThreeDots color="#000" height={69} width={69} />
      </div>
    );
  }

  return (
    <>
      {DBCBal && (
        <div className="flex justify-center w-full ">
          <div className="text-[19px] flex flex-col w-full justify-center items-center">
            {/* <span>{account} Holdings</span> */}
            <div className="flex flex-col w-full justify-center items-center ">
              <p className="text-[22px]">
                ETH Balance -{" "}
                <span className="font-semibold text-slate-800">
                  {utils.formatEther(ethBalance.toString()).substring(0, 5)}
                </span>
              </p>
              <p className="text-[22px]">
                DBC Balance -{" "}
                <span className="font-semibold text-slate-800">{DBCBal}</span>{" "}
              </p>
            </div>
            <div className="h-[120px] mt-10 w-[450px] sm:w-[600px] flex flex-col justify-center items-center bg-slate-200 rounded-lg shadow-lg text-center space-y-3 ">
              <p className="leading-snug">
                To find the DBC token in your wallet, import the following
                address into Metamask{" "}
              </p>
              <span className="font-bold text-[18px] md:text-[21px] cursor-pointer">
                {tokenContract.address}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
