import React from "react";
import { InfinitySpin } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <InfinitySpin color="#000" height={180} width={180} />
    </div>
  );
}
