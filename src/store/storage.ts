import createWebStorage from "redux-persist/lib/storage/createWebStorage";

type StorageKey = string;
type StorageValue = string | null;

const createNoopStorage = () => {

  return {
    getItem(_key: StorageKey): Promise<StorageValue> {
      return Promise.resolve(null);
    },
    setItem(_key: StorageKey, value: StorageValue): Promise<StorageValue> {
      return Promise.resolve(value);
    },
    removeItem(_key: StorageKey): Promise<void> {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export default storage;