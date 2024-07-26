const localStorageUtils = {
    setItem: (key, value) => {
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error("Error setting item to localStorage", error);
      }
    },
  
    getItem: (key) => {
      try {
        const serializedValue = localStorage.getItem(key);
        return serializedValue ? JSON.parse(serializedValue) : null;
      } catch (error) {
        console.error("Error getting item from localStorage", error);
        return null;
      }
    },
  
    updateItem: (key, value) => {
      try {
        const currentValue = localStorageUtils.getItem(key);
        const updatedValue = { ...currentValue, ...value };
        localStorageUtils.setItem(key, updatedValue);
      } catch (error) {
        console.error("Error updating item in localStorage", error);
      }
    },
  
    removeItem: (key) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error("Error removing item from localStorage", error);
      }
    },
  
    clear: () => {
      try {
        localStorage.clear();
      } catch (error) {
        console.error("Error clearing localStorage", error);
      }
    }
  };
  
  export default localStorageUtils;
  