import { ChakraProvider /* ChakraBaseProvider */, ColorModeScript } from '@chakra-ui/react';
import { createBrowserHistory } from 'history';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './app';
import { Fonts, THEME } from './chakra-setup';
import { GlobalHistoryCatcherContainer, HelmetContainer } from './containers/functional';
import { ELOG_LEVEL } from './general.type';
import './index.scss';
import { setupLogListener } from './logging';
import { publishLog } from './modules/access-layer/events/pubsub';
import { Persistor, Store } from './store';

const history = createBrowserHistory();
const rootElement = document.querySelector('#root') as Element;
const root = createRoot(rootElement);

// simple inplace custom pubsub logging setup
setupLogListener();

// console.log(`REACT_APP_API_URL: ${process.env.REACT_APP_API_URL}`);
publishLog(ELOG_LEVEL.DEBUG, `REACT_APP_API_URL: ${process.env.REACT_APP_API_URL}`);

root.render(
  <React.StrictMode>
    <HelmetContainer />
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <ChakraProvider theme={THEME} resetCSS={true}>
          <ColorModeScript initialColorMode={THEME.config.initialColorMode} />
          <Fonts />
          <Router history={history}>
            <GlobalHistoryCatcherContainer />
            <App />
          </Router>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

export {};
