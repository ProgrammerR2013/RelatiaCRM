
// Utility functions for managing data in local storage

// Generic function to get data from local storage
export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    try {
      return JSON.parse(storedValue) as T;
    } catch (error) {
      console.error(`Error parsing ${key} from localStorage:`, error);
      return defaultValue;
    }
  }
  return defaultValue;
};

// Generic function to save data to local storage
export const saveToLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Define storage keys to avoid typos
export const STORAGE_KEYS = {
  CLIENTS: 'freelancer-crm-clients',
  PROJECTS: 'freelancer-crm-projects',
  INVOICES: 'freelancer-crm-invoices',
  EVENTS: 'freelancer-crm-events',
};
