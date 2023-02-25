import React from 'react'
import { SocketProvider } from './context/SocketContext';
import { UIProvider } from './context/UIContext';
import RouterPages from './pages/RouterPages';

const TicketApp = () => {
  return (
    <SocketProvider>
      <UIProvider>
          <RouterPages />
      </UIProvider>
    </SocketProvider>
  )
}

export default TicketApp;