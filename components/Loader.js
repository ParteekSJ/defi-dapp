import React from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <ThreeDots color="#000" height={80} width={80} />
    </div>
  );
}
