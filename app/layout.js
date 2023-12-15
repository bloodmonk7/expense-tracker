'use client';

import { Inter } from 'next/font/google';
import './globals.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from '@/components/Navigation';
import FinanceContextProvider from '@/lib/store/finance-context';
import AuthContextProvider from '@/lib/store/auth-context';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>Expense Tracker</title>
      <body className={inter.className}>
        <AuthContextProvider>
          <FinanceContextProvider>
            <ToastContainer /> <Navigation /> {children}
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
