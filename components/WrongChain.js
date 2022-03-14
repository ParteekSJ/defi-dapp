import React from "react";
import { ExclamationIcon } from "@heroicons/react/solid";

export default function WrongChain() {
  return (
    <div className="flex flex-col w-full items-center">
      <div className="text-[#DC2E2E] mt-11">
        <ExclamationIcon className="h-16 w-16" />
      </div>
      <div>
        <h1 className="font-semibold text-[34px]">Unsupported Network</h1>
      </div>
      <div className="mt-14">
        <h1 className="text-[22px] font-semibold ">
          Please change your dapp browser to Rinkeby or Ganache.
        </h1>
      </div>
    </div>
  );
}
