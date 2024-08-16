import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children : React.ReactNode,
  className ?: string
}

const LinearText : React.FC<Props> = ({children , className}) => {
    return (
        <h1 className={twMerge("font-bold bg-gradient-to-r from-linear-pink  to-linear-blue inline-block text-transparent bg-clip-text" , className)}>{children}</h1>
    )
}


export default LinearText