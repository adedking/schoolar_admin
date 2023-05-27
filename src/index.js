import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux';
import { Provider } from 'react-redux';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
