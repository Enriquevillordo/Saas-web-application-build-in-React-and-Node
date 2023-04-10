import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './shared/helpers/store';
import { App } from './pages/App';
import { GoogleOAuthProvider } from '@react-oauth/google';
 
render(
    <GoogleOAuthProvider clientId="624968379785-d4h34no1gcipi16usbmusr2k06strm93.apps.googleusercontent.com">
        <Provider store={store}>
            <App />
        </Provider>
    </GoogleOAuthProvider>,
    document.getElementById('app')
);