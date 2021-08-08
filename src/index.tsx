import React from 'react';
import ReactDOM from 'react-dom';
import IntegrationNotistack from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme/MuiTheme';
import { store } from './rematch/store';
import './index.css';
import SystemMaintenance from './component/common/SystemMaintenance';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <IntegrationNotistack />
            {/* <SystemMaintenance /> */}
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);

reportWebVitals();
