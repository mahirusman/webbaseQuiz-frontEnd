import { useState, useEffect } from "react";

function useLocalStorage(key = "auth") {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading localStorage key “" + key + "”:", error);
      return null;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage key “" + key + "”:", error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
