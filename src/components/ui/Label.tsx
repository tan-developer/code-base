import React from "react";
import Wrapper from "../utils/Wrapper";

type Props = {
  children : React.ReactNode,
  className ?: string
}

const Label : React.FC<Props> = ({children , className}) => {
    return <Wrapper className={className}>
     <p>{children}</p>
    </Wrapper>
}


export default Label