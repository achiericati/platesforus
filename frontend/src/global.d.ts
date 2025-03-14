export {};

declare global {
  interface Window {
    electronAPI: {
      ping: () => Promise<string>;
      getAllDishes: () => Promise<Dish[]>;
      deleteDish: (id: number) => Promise<void>;
      addDish: (dish: Dish) => Promise<Dish>;
    };
  }
}