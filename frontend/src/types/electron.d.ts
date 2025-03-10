export {};

declare global {
  interface Window {
    electron: {
      ping: () => Promise<string>;
      dishes: {
        getAll: () => Promise<any[]>;
        add: (dish: any) => Promise<{ success: boolean; id: number }>;
        delete: (id: number) => Promise<{ success: boolean }>;
      };
    };
  }
}