import React, { Suspense } from "react";
import loadable from "@loadable/component";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "@/routes/PrivateRoute";
import AppPath from "@/constant/AppPath";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import { Toaster } from 'sonner';

const Example = loadable(() => import("./containers/Example/Example"));

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Toaster closeButton richColors/>

        <BrowserRouter>
          <Suspense fallback={"Loading..."}>
            <Routes>
              <Route
                path={AppPath.HOME}
                element={
                  <PrivateRoute
                    authenticationPath={AppPath.HOME}
                    isAuthenticated={true}
                    outlet={<Example />}
                  />
                }
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
