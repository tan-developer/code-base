import { ToastContext, ToastContextType } from "@/providers/NotificationProvider";
import { useContext } from "react";

export const useNotification = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToastContext must be used within ToastContextProvider");
  }

  return context;
};
