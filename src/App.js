import React from 'react';
import Router from './router';
import {ContextProvider} from './context';

export default function App() {
  return (
    <ContextProvider>
      <Router />
    </ContextProvider>
  );
}
