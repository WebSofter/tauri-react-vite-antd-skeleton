import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from 'antd';
import { antdConfig } from '@/constants';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from '@/components/loader';
import { store } from '@/store';
import { injectStore } from '@/lib/http';
import App from '@/App';
import '@/index.css';

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );

const persistor = persistStore(store);
injectStore(store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider {...antdConfig}>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);

window?.addEventListener('vite:preloadError', () => {
  window?.location?.reload();
});
