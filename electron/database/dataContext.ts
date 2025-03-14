import { Dish } from "./interfaces";
import { fetchAllDishesFromDb } from './db';


class DataContext {
  private dishesCache: Dish[] | null = null;

  public async getAllDishes(): Promise<Dish[]> {
    if (this.dishesCache) {
      return this.dishesCache;
    }

    try {
      const dishes = await fetchAllDishesFromDb();
      this.dishesCache = dishes;
      return dishes;
    } catch (error) {
      console.error('Errore durante il caricamento dei piatti:', error);
      throw error;
    }
  }

  public invalidateDishesCache() {
    this.dishesCache = null;
  }
}

const dataContext = new DataContext();

export default dataContext;
