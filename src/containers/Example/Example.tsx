import useToast from "@/hooks/useToast";
import MockApiService from "@/services/mockApiService";
import { AxiosResponse } from "axios";
import { Button } from "primereact/button";
import React, { memo } from "react";


const promise = () => new Promise((_ , reject) => setTimeout(() => reject({ name: 'Sonner' }), 2000));

const logicPromise = <T = any>(promises : Promise<AxiosResponse<T>>) => new Promise((resolve , reject) => {
  promises.then((data) => {
    resolve(data)
  }).catch((error) => {
    reject(error)
  })
});

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

    showPromiseToast(logicPromise(res) , {
      loading: "Loading...",
      success: "Success",
      error: (data) => {
        return data
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
