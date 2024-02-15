import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../../../redux';
import { Provider } from 'react-redux';
import { queryClient } from '../../../';
import App from '../../../App';
import AuthLayout from '../../../components/layouts/authentication';
import LogInPage from '../login';

test('renders text element', async () => {
  render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
            <App>
                <AuthLayout>
                    <LogInPage />
                </AuthLayout>
            </App>
        </QueryClientProvider>
        </PersistGate>
    </Provider>
  );
  const textElement = await screen.findByText(/Login to Schoolar/i);
  expect(textElement).toBeInTheDocument();
});