import SetupPage from './pages/SetupPage';
import { DropdownProvider } from './contexts/Setup';
import { createBrowserRouter, RouterProvider } from 'react-router';
import DashboardPage from './pages/DashboardPage';
import RootLayout from './layout/RootLayout';
import TransactionsPage from './pages/TransactionsPage';
import { useEffect, useState } from 'react';
import db from './db/data';

const App = () => {
  const [setupComplete, setSetupComplete] = useState(null);

  useEffect(() => {
    const fetchSetupStatus = async () => {
      const status = await db.settings.get('setupComplete');
      setSetupComplete(status?.value || false);
    };
    fetchSetupStatus();
  }, [setupComplete]);

  if (setupComplete === null) {
    return;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: setupComplete ? <DashboardPage /> : <SetupPage />,
        },
        {
          path: 'transactions',
          element: <TransactionsPage />,
        },
      ],
    },
  ]);

  return (
    <DropdownProvider>
      <RouterProvider router={router} />
    </DropdownProvider>
  );
};

export default App;
