import { Dish } from "./interfaces";
import { fetchAllDishesFromDb, deleteDish, addDish, updateDish } from './db';


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
      console.error('error during dishes fetching:', error);
      throw error;
    }
  }

  public async addDish(dish: Dish): Promise<Dish> {
    try {
      const newDish = await addDish(dish);
      this.invalidateDishesCache();
      return newDish;
    } catch (error) {
      console.error('error during dish deletion:', error);
      throw error;
    }
  }

  public async deleteDish(id: number): Promise<void> {
    try {
      await deleteDish(id);
      this.invalidateDishesCache();
      return;
    } catch (error) {
      console.error('error during dish deletion:', error);
      throw error;
    }
  }

  public async updateDish(dish: Dish): Promise<void> {
    try {
      await updateDish(dish);
      this.invalidateDishesCache();
      return;
    } catch (error) {
      console.error('error during dish deletion:', error);
      throw error;
    }
  }

  public invalidateDishesCache() {
    this.dishesCache = null;
  }
}

const dataContext = new DataContext();

export default dataContext;
