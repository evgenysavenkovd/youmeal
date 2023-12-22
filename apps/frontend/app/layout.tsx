import { QueryProvider } from '@query';
import { Footer } from '@ui/common/server';
import { Nunito } from 'next/font/google';
import './layout.scss';

const font = Nunito({
  subsets: ['latin', 'cyrillic'],
  display: 'fallback',
  preload: true
});

export const metadata = {
  title: 'Главная'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={font.className}>
      <body>
        <div className="container">
          <QueryProvider>{children}</QueryProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
