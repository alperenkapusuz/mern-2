import { Inter } from 'next/font/google';
import Providers from '@/utils/providers';
import { sharedMetadata } from '../../shared-metada';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  ...sharedMetadata,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
