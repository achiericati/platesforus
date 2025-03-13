import React from 'react';

interface DishListItemsProps {
  categoryFilter: string;
  categories: string[];
  categoryIcons: any;
  onDishClick: (dish: any) => void;
  filteredDishes: any[];
}

const DishesList: React.FC<DishListItemsProps> = ({
  categoryFilter,
  categories,
  categoryIcons,
  onDishClick,
  filteredDishes
}) => {
  return (
    <>
      {categoryFilter === 'All' ? (
        categories.filter(c => c !== 'All').map((category) => {
          const dishesByCategory = filteredDishes.filter(dish => dish.category === category);
          if (dishesByCategory.length === 0) return null;

          return (
            <div key={category} className="mb-4">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                {category} <span style={{ marginLeft: '5px' }}>{categoryIcons[category]}</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {dishesByCategory.map((dish, index) => (
                  <div
                    key={index}
                    className="bg-white text-purple-600 p-4 rounded-lg shadow-lg flex flex-col justify-between hover:scale-105 transition-all cursor-pointer"
                    onClick={() => onDishClick(dish)}
                  >
                    <h5 style={{ marginBottom: '10px' }} className="font-bold text-lg">{dish.name}</h5>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            {categoryFilter} <span style={{ marginLeft: '5px' }}>{categoryIcons[categoryFilter]}</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {filteredDishes.map((dish, index) => (
              <div
                key={index}
                className="bg-white text-purple-600 p-4 rounded-lg shadow-lg flex flex-col justify-between hover:scale-105 transition-all cursor-pointer"
                onClick={() => onDishClick(dish)}
              >
                <h5 style={{ marginBottom: '10px' }} className="font-bold text-lg">{dish.name}</h5>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DishesList;
