import { Toast, ToastMessage } from "primereact/toast";
import { createContext, useRef, ReactNode, RefObject } from "react";

export interface ToastContextType {
  showToast: (options: ToastMessage | ToastMessage) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastContextProviderProps {
  children: ReactNode;
}

const ToastContextProvider = ({ children }: ToastContextProviderProps) => {
  const toastRef: RefObject<Toast> = useRef<Toast>(null);

  const showToast = (options: ToastMessage | ToastMessage[]) => {
    if (!toastRef.current) return;
    toastRef.current.show(options);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} />
      <div>{children}</div>
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;