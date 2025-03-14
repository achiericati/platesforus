import React from 'react';
import { DishListItemsProps } from '../../../electron/database/interfaces';

const DishListItems: React.FC<DishListItemsProps> = ({
  categoryFilter,
  categories,
  categoryIcons,
  onDishClick,
  filteredDishes,
}) => {
  return (
    <>
      {categoryFilter === 'All' ? (
        categories.filter(c => c !== 'All').map((category) => {
          const dishesByCategory = filteredDishes.filter(dish => dish.category === category);
          if (dishesByCategory.length === 0) return null;

          return (
            <div key={category} className="mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
                {category} <span>{categoryIcons[category]}</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {dishesByCategory.map((dish, index) => (
                  <div
                    key={index}
                    className="bg-white text-purple-600 p-2 rounded-lg shadow hover:scale-105 transition-all cursor-pointer flex items-center justify-center text-center"
                    onClick={() => onDishClick(dish)}
                  >
                    <h5 className="font-semibold text-xs">{dish.name}</h5>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
            {categoryFilter} <span>{categoryIcons[categoryFilter]}</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {filteredDishes.map((dish, index) => (
              <div
                key={index}
                className="bg-white text-purple-600 p-2 rounded-lg shadow hover:scale-105 transition-all cursor-pointer flex items-center justify-center text-center"
                onClick={() => onDishClick(dish)}
              >
                <h5 className="font-semibold text-xs">{dish.name}</h5>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DishListItems;