import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    const loadThemePreference = async () => {
      const storedTheme = await AsyncStorage.getItem('themePreference');
      if (storedTheme !== null) {
        setIsDarkMode(storedTheme === 'dark');
      } else {
        setIsDarkMode(systemColorScheme === 'dark');
      }
    };
    loadThemePreference();
  }, [systemColorScheme]);

  const toggleTheme = async () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    await AsyncStorage.setItem('themePreference', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);
