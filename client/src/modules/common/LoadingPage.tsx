import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import React from 'react';

const StyledRoot = styled('section')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: 190 + 94,
  marginTop: -94,
  position: 'relative',

  height: '100vh',
  background: 'url(/static/main-bg.jpeg)',
}));

export function LoadingPage() {
  return (
    <StyledRoot>
      <CircularProgress />
    </StyledRoot>
  );
}
