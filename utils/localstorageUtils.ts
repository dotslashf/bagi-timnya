type LocalstorageUtilsType<T> = {
  key: string;
  items?: T;
};

export class LocalStorageUtils<T> {
  storeItem(args: LocalstorageUtilsType<T>): void {
    localStorage.setItem(args.key, JSON.stringify(args.items));
  }

  retrieveItem(args: LocalstorageUtilsType<any>): T | undefined {
    const item: string | null = localStorage.getItem(args.key);
    if (item) {
      return JSON.parse(item);
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
