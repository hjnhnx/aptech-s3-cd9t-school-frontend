export class AppStorage {
  private readonly storage: Storage;

  constructor(storage?: Storage) {
    this.storage = storage || window.localStorage;

    /** Is storage is supported or not */
    if (!this.isSupported()) {
      throw new Error("Storage is not supported by browser!");
    }
  }

  setItem(key: string, value: unknown) {
    if (typeof value === "object") {
      this.storage.setItem(key, JSON.stringify(value));
    } else {
      this.storage.setItem(key, value as string);
    }
  }

  getItem(key: string) {
    let result;
    const value = this.storage.getItem(key);
    if (value == null) {
      return value;
    }
    try {
      result = JSON.parse(value);
    } catch (e) {
      result = value;
    }
    return result;
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }

  isSupported() {
    let supported = true;
    if (!this.storage) supported = false;
    if (!(this.storage instanceof Storage)) supported = false;
    return supported;
  }
}

const appLocalStorage = new AppStorage();
export { appLocalStorage };
