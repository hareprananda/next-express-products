type storageStore = {
  user: {
    id: string;
    email: string;
    token: string;
  };
};

class LocalStorageClass {
  set = <T extends keyof storageStore>(key: T, value: storageStore[T]) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  get = <T extends keyof storageStore>(key: T): storageStore[T] | null => {
    const data = localStorage.getItem(key);

    if (!data) return null;
    return JSON.parse(data) as storageStore[T];
  };

  delete = <T extends keyof storageStore>(key: T) => {
    localStorage.removeItem(key);
  };
}

const LocalStorage = new LocalStorageClass();

export default LocalStorage;
