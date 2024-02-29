import React from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { styled } from '@mui/material/styles';

const Content = styled('main')(({ theme }) => ({
  minHeight: 'calc(100vh - 64px)',

  [theme.breakpoints.down('md')]: {
    minHeight: 'calc(100vh - 56px)',
  },
}));

export function Layout(props: React.PropsWithChildren) {
  return (
    <>
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </>
  );
}
