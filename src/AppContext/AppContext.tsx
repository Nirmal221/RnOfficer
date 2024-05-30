import React, { createContext, useEffect, useState } from 'react';
import { getFromAsync } from '../utils';
import { ASYNC_KEY } from '../constant';

export const Context = createContext(null);
const AppContext = ({ children }) => {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    getTheme();
  }, []);
  const getTheme = async () => {
    const getThemeText = await getFromAsync(ASYNC_KEY.THEME);
    if (getThemeText) {
      setTheme(getThemeText);
    } else {
      setTheme('light');
    }
  };
  return (
    <Context.Provider value={{ theme, setTheme }}>{children}</Context.Provider>
  );
};

export default AppContext;
