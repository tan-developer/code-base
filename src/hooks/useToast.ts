import Constant from "@/constant/Constant";
import { useCallback, useMemo } from "react";
import { ExternalToast, toast } from "sonner";

type PromiseT<Data = any> = Promise<Data> | (() => Promise<Data>);
type PromiseTResult<Data = any> = string | React.ReactNode | ((data: Data) => React.ReactNode | string | Promise<React.ReactNode | string>);
type PromiseExternalToast = Omit<ExternalToast, 'description'>;

type PromiseData<ToastData = any> = PromiseExternalToast & {
  loading?: string | React.ReactNode;
  success?: PromiseTResult<ToastData>;
  error?: PromiseTResult;
  description?: PromiseTResult;
  finally?: () => void | Promise<void>;
};
const useToast = () => {

  const showSuccessToast = (message: string | React.ReactNode, options?: ExternalToast) => {
    toast.success(message , {
      duration: Constant.TOAST.DURATION,
      classNames: {
        title : 'text-green-500 font-bold text-lg',
        icon : 'text-green-500 font-bold text-2xl scale-125 mr-2',
      },action: {
        label: 'Action',
        onClick: () => console.log('Action!'),
      },
      ...options
    });
  }

  const showInfoToast = (message: string | React.ReactNode, options?: ExternalToast) => {
    toast.info(message , {
      duration: Constant.TOAST.DURATION,
      classNames: {
        title : 'text-blue-500 font-bold text-lg',
        icon : 'text-blue-500 font-bold text-2xl scale-125 mr-2',
      },
      action: {
        label: 'Action',
        onClick: () => console.log('Action!'),
      },
      ...options
    });
  }

  const showWarningToast = (message: string | React.ReactNode, options?: ExternalToast) => {
    toast.warning(message , {
      duration: Constant.TOAST.DURATION,
      classNames: {
        title : 'text-yellow-500 font-bold text-lg',
        icon : 'text-yellow-500 font-bold text-2xl scale-125 mr-2',
      },
      action: {
        label: 'Action',
        onClick: () => console.log('Action!'),
      },
      ...options
    });
  }

  const showPromiseToast = <T = any> (promise : PromiseT<T> , data?:PromiseData) => {
    toast.promise(promise , {
      action: {
        label: 'Action',
        onClick: (e) => console.log(e),
      },
      ...data
    });
  }

  return {
    showSuccessToast,
    showInfoToast,
    showWarningToast,
    showPromiseToast
  };
}

export default useToast;