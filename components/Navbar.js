import React from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { account } = useSelector((state) => ({ ...state.account }));

  return (
    <nav className="w-full flex py-3 bg-gray-100 hover:text-gray-700 shadow-lg">
      <div className="text-[25px] md:text-[28px] flex justify-between items-center w-full mx-4 md:mx-8">
        <div>
          <h2>Decentralized Bank</h2>
        </div>
        <div>
          {account ? (
            <div className="flex items-center bg-gray-600 px-2 rounded-lg">
              <span className="text-[19.5px] hidden md:flex text-white">
                {account}
              </span>
            </div>
          ) : (
            <button
              onClick={async () => {
                await window.ethereum.request({
                  method: "eth_requestAccounts",
                });
              }}
              className="inline-block py-3 text-xl text-white bg-gray-800 px-4 hover:bg-gray-700 rounded-xl">
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
