export {}; // Serve a TypeScript per trattarlo come un modulo.

declare global {
  interface Window {
    electronAPI: {
      ping: () => Promise<string>;
      getAllDishes: () => Promise<any[]>;
    };
  }
}