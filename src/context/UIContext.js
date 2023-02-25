import React , { createContext , useState } from 'react';

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  
    const [ocultar, setOcultar] = useState(true);

    const showMenu = () => {
        setOcultar(false);
    }
    const hideMenu = () => {
        setOcultar(true);
    }
    return (
    <UIContext.Provider value={{
        ocultar,
        showMenu,
        hideMenu
    }}>
        { children }
    </UIContext.Provider>
  )
}
