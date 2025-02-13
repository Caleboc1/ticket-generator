import { openDB } from "idb";

const DB_NAME = "conferenceDB";
const STORE_NAME = "formData";

// Initialize IndexedDB
const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

// Save data to IndexedDB
export const saveToStorage = async <T>(key: string, value: T): Promise<void> => {
  try {
    const db = await initDB();
    await db.put(STORE_NAME, value, key);
  } catch (error) {
    console.error("Error saving to IndexedDB:", error);
  }
};

// Retrieve data from IndexedDB
export const getFromStorage = async <T>(key: string): Promise<T | null> => {
  try {
    const db = await initDB();
    return await db.get(STORE_NAME, key);
  } catch (error) {
    console.error("Error retrieving from IndexedDB:", error);
    return null;
  }
};

// Remove data from IndexedDB
export const removeFromStorage = async (key: string): Promise<void> => {
  try {
    const db = await initDB();
    await db.delete(STORE_NAME, key);
  } catch (error) {
    console.error("Error removing from IndexedDB:", error);
  }
};
