import { cookiesKeys } from '@query';
import { AdminNavPanel, AdminProviders } from '@ui/common';
import { Box } from '@ui/common/server';
import { Nunito } from 'next/font/google';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import './layout.scss';

const font = Nunito({
  subsets: ['latin', 'cyrillic'],
  display: 'swap'
});

interface RootLayoutProps {
  auth: ReactNode;
  main: ReactNode;
}

export default async function RootLayout({ auth, main }: RootLayoutProps) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(cookiesKeys.accessToken)?.value;
  const isAuth = !!accessToken;

  return (
    <html className={font.className}>
      <body>
        {isAuth ? (
          <div className="main-container">
            <AdminNavPanel />
            <div className="content-wrapper">
              <AdminProviders>
                <Box className="content">{main}</Box>
              </AdminProviders>
            </div>
          </div>
        ) : (
          auth
        )}
      </body>
    </html>
  );
}
