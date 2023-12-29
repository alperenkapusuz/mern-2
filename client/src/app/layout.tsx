import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/utils/providers';
import './globals.css';
import { sharedMetadata } from '../../shared-metada';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  ...sharedMetadata,
};

export default function RootLayout({ children, auth }: { children: React.ReactNode; auth: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          {auth}
        </Providers>
      </body>
    </html>
  );
}
