

import { useEffect, useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      setValue(JSON.parse(storedValue));
    } else if (window !== null) {
      const storedValue = localStorage.getItem(key);
      setValue(JSON.parse(storedValue));
    }
  }, [key]);

  const setLocalStorage = (newValue) => {
    setValue(newValue);
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  return [value, setLocalStorage];
};