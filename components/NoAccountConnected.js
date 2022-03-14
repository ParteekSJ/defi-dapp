import React from "react";
import Image from "next/image";

export default function NoAccountConnected() {
  return (
    <div className="flex flex-col mt-11 items-center justify-center w-full h-[120]">
      <Image src="/error.png" alt="ERROR" height={85} width={85} />
      <span className="text-[26px]">No Account Connected.</span>
    </div>
  );
}
