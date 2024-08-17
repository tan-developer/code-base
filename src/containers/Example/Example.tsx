import useToast from "@/hooks/useToast";
import { PromiseBeforeInterceptor } from "@/interceptors/PromisesApiCallInterceptor";
import MockApiService from "@/services/mockApiService";
import { AxiosResponse } from "axios";
import { Button } from "primereact/button";
import React, { memo } from "react";
import AbortContainer from "@/utils/abort-controller";


const promise = () => new Promise((_ , reject) => setTimeout(() => reject({ name: 'Sonner' }), 2000));


const mockService = new MockApiService();

const Home: React.FC = () => {
  const { showSuccessToast , showInfoToast , showWarningToast , showPromiseToast } = useToast();

  const onShowSuccessToast = () => {
    showSuccessToast("Push Notification Success" , {
      description: "Notification has been pushed successfully lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    });
  }

  const onShowInfoToast = () => {
    showInfoToast("Push Notification Info" , {
      description: "Notification has been pushed successfully lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    });
  }

  const onShowWarningToast = () => {
    showWarningToast("Push Notification Warning" , {
      description: "Notification has been pushed successfully lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    });
  }

  const onPromiseToast = () => {
    showPromiseToast(promise , {
      loading: "Loading...",
      success: "Success",
      error: (data) => {
        return data.name
      },
      finally: () => console.log('Finally')
    });
  }


  const onGetData = async () => {
    const res = mockService.getMockDataGet({ name: 'Sonner' });

    showPromiseToast(res , {
      loading: "Loading...",
      success: (data) => {
        return "Success"
      },
      error: (data) => {
        return data?.message;
      },
      cancel: {
        label: 'Click to abort',
        onClick: () => {
          AbortContainer.abortAll();
        },
      },
      finally: () => console.log('Finally')
    });
  }



  return (
    <React.Fragment>
      <div className="flex flex-row *:mr-2">
        <Button className="p-ripple" severity="success" onClick={onShowSuccessToast}>SuccessToast</Button>
        <Button severity="info" onClick={onShowInfoToast}>Info Toast</Button>
        <Button severity="warning" onClick={onShowWarningToast}>Warning Toast</Button>
        <Button severity="secondary" onClick={onPromiseToast}>Async Toast</Button>
      </div>

      <div className="mt-5">
        
      <Button severity="help" onClick={onGetData}>Fetch Data</Button>
      </div>

      

    </React.Fragment>
  );
};

export default memo(Home);
