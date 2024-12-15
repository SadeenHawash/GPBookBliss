import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as MUIThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import App from './App';
import './index.css';
import { ChatContextProvider } from './context/chatContext';
import { OrderContextProvider } from './context/orderContext';
import { ReadingListsContextProvider } from './context/readingListsContext';

// Create an instance of QueryClient
const queryClient = new QueryClient();

//configure stripe
const stripePromise = loadStripe('pk_test_51PVLnELXhjHqScDnTjWBPufcr64qvNYgPWDtLY9MUUijasd0Nbh5zfNBKbA7mUicAlrowGcgtJDfuoRUmP5xVVTH00uYWMFPt1');
const options = {
  mode: 'payment',
  currency: 'usd',
  amount: 1099
}

// Create a root container
const root = document.getElementById('root');
const rootContainer = createRoot(root);

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#6f4e37',
    },
    secondary: {
      main: '#f3ece4',
    },
  },
  typography: {
    body1: {
      fontSize: '13.8px',
    },
    h1: {
      fontSize: '1rem',
    },
    star: {
      fontSize: '20px',
    },
  },
});

// Render your App component inside the root container
rootContainer.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ChatContextProvider>
          <OrderContextProvider>
            <ReadingListsContextProvider>
            <QueryClientProvider client={queryClient}>
              <MUIThemeProvider theme={muiTheme}>
                <Elements stripe={stripePromise} options={options}>
                  <App/>
                </Elements>
              </MUIThemeProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
            </ReadingListsContextProvider>
          </OrderContextProvider>
        </ChatContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
