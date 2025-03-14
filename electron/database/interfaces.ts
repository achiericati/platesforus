export interface DishListItemsProps {
    categoryFilter: string;
    categories: string[];
    categoryIcons: any;
    onDishClick: (dish: any) => void;
    filteredDishes: any[];
  }

  export interface Dish {
    id: number;
    name: string;
    category: string;
    prepTime: number;
    recipe: string;
  }