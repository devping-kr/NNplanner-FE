import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import Script from 'next/script';
import Providers from '@/contexts/Providers';
import { cn } from '@/utils/core';
import { ToastProvider } from '@/components/common/ToastProvider';
import { METADATA } from '@/constants/_metadata';

const { title, description, keywords, url, images } = METADATA;

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title,
  description,
  keywords,
  openGraph: {
    title,
    description,
    url,
    images,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [images[0].url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        <meta
          name='google-site-verification'
          content='cg79sBghjxaeDLPXXAtwcSeMFpbrwe6TVJQqjnFGAyI'
        />
        <Script
          async
          strategy='afterInteractive'
          src='https://www.googletagmanager.com/gtag/js?id=G-N363EQ69SY'
        ></Script>
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-N363EQ69SY');
          `}
        </Script>
      </head>
      <body className={cn('bg-white-100', pretendard.className)}>
        <Providers>
          <div>{children}</div>
          <ToastProvider />
        </Providers>
      </body>
    </html>
  );
}
