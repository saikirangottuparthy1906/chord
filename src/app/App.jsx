import React, { Suspense } from "react";
import { RouterProvider} from "react-router-dom";
import { Provider } from 'react-redux';
import store, { persistor }   from '../app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { routesConfig } from './routes';


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={routesConfig} />  
        </Suspense>
      </PersistGate>
    </Provider>
  );
}
export default App;
