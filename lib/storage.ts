export const saveToStorage = <T>(key: string, value: T): void => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error saving to storage:", error);
    }
  };
  
  export const getFromStorage = <T>(key: string): T | null => {
    try {
      if (typeof window !== "undefined") {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : null;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving from storage:", error);
      return null;
    }
  };
  
  export const removeFromStorage = (key: string): void => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error("Error removing from storage:", error);
    }
  };
  