import React, { useState, useEffect } from 'react';
import DishModal from '../components/DishModal';
import DishesList from '../components/DishesList';
import FiltersSection from '../components/FiltersSection';
import { Dish } from '../../../electron/database/interfaces';

const DishesView = ({ onBackClick, onAddNewClick }: any) => {
  const [dishes, setDishes] = useState<any[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<any[]>([]);
  const [selectedDish, setSelectedDish] = useState<any>(null);

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [timeFilter, setTimeFilter] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  useEffect(() => {
    const loadDishes = async () => {
      try {
        const dishesFromDb = await window.electronAPI.getAllDishes();
        setDishes(dishesFromDb);
        setFilteredDishes(dishesFromDb);
      } catch (error) {
        console.error('Errore nel caricamento dei piatti:', error);
      }
    };

    loadDishes();
  }, []);

  const onDishClick = (dish: any) => setSelectedDish(dish);

  const editDish = async (dish: any) => {
    alert('edit dish');
  };

  const deleteDish = async (dish: Dish) => {
    try {
      await window.electronAPI.deleteDish(dish.id);
      let updatedDishes = [...dishes]
      updatedDishes = updatedDishes.filter(d => d.id !== dish.id);
      setDishes(updatedDishes);
      applyFilters(categoryFilter, difficultyFilter, timeFilter, updatedDishes);
      closeModal();
  
    } catch (error) {
      console.error('Errore durante l\'eliminazione del piatto:', error);
    }
  };

  const closeModal = () => setSelectedDish(null);

  const applyFilters = (categoryValue: string, difficultyValue: string, timeValue: number | null, newDishes?: Dish[]) => {
    let filtered = newDishes ? [...newDishes] : [...dishes];
    if (categoryValue !== 'All') filtered = filtered.filter(d => d.category === categoryValue);
    if (difficultyValue !== 'All') filtered = filtered.filter(d => d.difficulty === difficultyValue);
    if (timeValue !== null) filtered = filtered.filter(d => d.prepTime <= timeValue);

    setFilteredDishes(filtered);
  };

  const resetFilters = () => {
    setCategoryFilter('All');
    setDifficultyFilter('All');
    setTimeFilter(null);
    applyFilters('All', 'All', null);
  };

  const categories = ['All', 'Primo', 'Secondo', 'Contorno', 'Dolce'];
  const difficulties = ['All', 'Facile', 'Media', 'Difficile'];
  const categoryIcons = { 'Primo': '🍝', 'Secondo': '🍖', 'Contorno': '🥗', 'Dolce': '🍰' };

  return (
    <section className="flex flex-col flex-grow w-full overflow-hidden">
      <div className="flex items-center justify-between w-full px-5 py-3 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mb-4">
        <button
          onClick={onBackClick}
          className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-200 transition-colors text-sm outline-none focus:outline-none"
        >
          ← Indietro
        </button>

        <h3 className="text-xl font-semibold text-white text-center">Gestisci i tuoi piatti</h3>

        <button
          onClick={onAddNewClick}
          className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-200 transition-colors text-sm outline-none focus:outline-none"
        >
          Aggiungi Nuovo Piatto
        </button>
      </div>

      <FiltersSection
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        resetFilters={resetFilters}
        categoryFilter={categoryFilter}
        difficultyFilter={difficultyFilter}
        timeFilter={timeFilter}
        setCategoryFilter={setCategoryFilter}
        setDifficultyFilter={setDifficultyFilter}
        setTimeFilter={setTimeFilter}
        applyFilters={applyFilters}
        categories={categories}
        difficulties={difficulties}
      />

      <div
        className="overflow-y-auto w-full px-6 py-4 scrollable-cards flex-grow"
        style={{ maxHeight: showFilters ? 'calc(100vh - 255px)' : 'calc(100vh - 210px)' }}
      >
        <DishesList
          categoryFilter={categoryFilter}
          difficultyFilter={difficultyFilter}   
          timeFilter={timeFilter}
          categories={categories}
          categoryIcons={categoryIcons}
          onDishClick={onDishClick}
          filteredDishes={filteredDishes}
          dishes={dishes}
        />
      </div>

      {selectedDish && (
        <DishModal
          dish={selectedDish}
          onClose={closeModal}
          onEditDish={editDish}
          onDeleteDish={deleteDish}
        />
      )}
    </section>
  );
};

export default DishesView;