export {}; // Serve a TypeScript per trattarlo come un modulo.

declare global {
  interface Window {
    electronAPI: {
      ping: () => Promise<string>; // Se esiste nel preload
      getAllDishes: () => Promise<any[]>; // Questo serve a te
    };
  }
}