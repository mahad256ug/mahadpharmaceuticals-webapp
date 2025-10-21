import React from "react";
import Spinner from "./Spinner";

const Loader = () => {
  return (
    <div className="w-full h-[65vh] flex items-center justify-center">
      <div className="h-10 w-10">
        <Spinner className="fill-black/80 text-neutral-100" />
      </div>
    </div>
  );
};

export default Loader;
