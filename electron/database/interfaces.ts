export interface Dish {
  id: number;
  name: string;
  category: string;
  difficulty: string;
  prepTime: number;
  recipe: string;
}

export type Meal = string;

export type DayMenu = {
  pranzo: Meal;
  cena: Meal;
};

export type WeeklyMenuType = {
  [giorno: string]: DayMenu;
};

export type Portata = 'Primo' | 'Secondo' | 'Contorno';

export type SelezionePasti = {
  [data: string]: {
    pranzo: Portata[];
    cena: Portata[];
  };
};