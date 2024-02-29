import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../src/modules/graphql';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { Layout } from '../src/modules/layout';
import { SEO } from '../src/config/seo';
// import { GoogleTagManager } from '@next/third-parties/google';

const appTheme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />

        <DefaultSeo
          title={SEO.title}
          description={SEO.description}
          openGraph={{
            locale: 'en_US',
            type: 'website',
            title: SEO.title,
            description: SEO.description,
            url: 'https://test.com/',
          }}
        />
        <SpeedInsights />
        <Analytics />

        <Layout>
          <Component {...pageProps} />
        </Layout>

        {/*<GoogleTagManager gtmId="GTM-P85HRM23" />*/}
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
