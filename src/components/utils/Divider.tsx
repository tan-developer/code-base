import React from "react";

interface Props {
  children: React.ReactNode;
}

const Divider: React.FC<Props> = ({ children }) => {
  return (
    <div className="my-2 divider w-full flex justify-center after:bg-gray-500 after:absolute relative after:w-[45%] after:h-[.075rem] after:top-1/2 after:left-0 before:bg-gray-500 before:absolute before:w-[45%] before:h-[.075rem] before:top-1/2 before:right-0">
      <span className="text-center w-full z-10 bg-inherit text-[10px] text-white">{children}</span>
    </div>
  );
};

export default Divider;
