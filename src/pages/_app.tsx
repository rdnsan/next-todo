/* eslint-disable no-console */
import { wrapper } from '@/store';
import '@/styles/globals.css';
import type { ThemeConfig } from 'antd';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { Fragment } from 'react';

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#0b7ea4',
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (metric.label === 'web-vital') console.log(metric);
}

export function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>Next Todo</title>
        <meta name="description" content="Next.js Todo App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/react.svg" />
      </Head>
      <ConfigProvider theme={theme}>
        <div className={`${inter.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
      </ConfigProvider>
    </Fragment>
  );
}

export default wrapper.withRedux(App);
