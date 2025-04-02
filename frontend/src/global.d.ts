export {};

declare global {
  interface Window {
    electronAPI: {
      ping: () => Promise<string>;
      getAllDishes: () => Promise<Dish[]>;
      deleteDish: (id: number) => Promise<void>;
      addDish: (dish: Dish) => Promise<Dish>;
      updateDish: (dish: Dish) => Promise<void>;
      loadMenuFromDb: () => Promise<WeeklyMenuType>;
      saveMenuToDb: (menu: WeeklyMenuType) => Promise<void>;
      deleteMenuFromDb: () => Promise<void>;
      exportDishesToCSV: (dishes: Dish[]) => Promise<void>;
      importDishesFromCSV: () => Promise<Dish[]>;
      askSaveFile: () => Promise<string|undefined>;
      saveBufferToFile: () => Promise<void>;
      saveImage: (buffer: Buffer) => Promise<boolean>;
    };
  }
}