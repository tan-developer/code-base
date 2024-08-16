import React from "react"
import { Button, ButtonProps } from 'primereact/button';
import { IconType } from "primereact/utils";
import { twMerge } from "tailwind-merge";


type Props =  {
  onClick ?: () => void,
  children ?: React.ReactNode,
  icon ?: IconType<ButtonProps> | undefined,
  className ?: string 
}

const ButtonSolid : React.FC<Props> = ({children , onClick , icon , className}) => {
  return <Button onClick={onClick} icon={icon} className={twMerge( 'text-white py-2 px-5 rounded-3xl border-2',className)}>
      {children}
  </Button>
}


export default ButtonSolid