import { Dish, WeeklyMenuType } from "./interfaces";
import { fetchAllDishesFromDb, deleteDish, addDish, updateDish, loadMenuFromDb, saveMenuToDb, deleteMenuFromDb } from './db';


class DataContext {
  private dishesCache: Dish[] | null = null;
  private menu: WeeklyMenuType | null = null;

  public async loadMenuFromDb(): Promise<WeeklyMenuType | null> {
    if (this.menu) {
      return this.menu;
    }

    try {
      const menu = await loadMenuFromDb();
      this.menu = menu;
      return menu;
    } catch (error) {
      console.error('error during menu loading:', error);
      throw error;
    }
  }

  public async saveMenuToDb(menu: WeeklyMenuType): Promise<void> {
    if (this.menu) {
      this.menu = null;
    }

    try {
      await saveMenuToDb(menu);
      this.menu = menu;
      return;
    } catch (error) {
      console.error('error during menu editing/creating:', error);
      throw error;
    }
  }

  public async deleteMenuFromDb(): Promise<void> {
    try {
      await deleteMenuFromDb();
      this.menu = null;
      return;
    } catch (error) {
      console.error('error during menu editing/creating:', error);
      throw error;
    }
  }

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
