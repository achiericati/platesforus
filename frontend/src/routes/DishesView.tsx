import React, { useState, useEffect } from 'react';
import DishModal from '../components/DishModal';
import DishesList from '../components/DishesList';
import FiltersSection from '../components/FiltersSection';

const DishesView = ({ onBackClick, onAddNewClick }: any) => {
  // Stati principali
  const [dishes, setDishes] = useState<any[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<any[]>([]);
  const [selectedDish, setSelectedDish] = useState<any>(null);

  // Stati per i filtri
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [timeFilter, setTimeFilter] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  useEffect(() => {
    const loadDishes = async () => {
      try {
        const dishesFromDb = await window.electronAPI.getAllDishes();
        console.log("DISHES AHAHHA ", dishesFromDb)
        setDishes(dishesFromDb);
        setFilteredDishes(dishesFromDb);
      } catch (error) {
        console.error('Errore nel caricamento dei piatti:', error);
      }
    };

    loadDishes();
  }, []);

  // Gestione click su un piatto
  const onDishClick = (dish: any) => setSelectedDish(dish);

  // Placeholder funzione per modifica piatto
  const editDish = (dish: any) => {
    alert('edit dish');
  };

  // Chiudi modale
  const closeModal = () => setSelectedDish(null);

  // Applica filtri sui piatti
  const applyFilters = (categoryValue: string, difficultyValue: string, timeValue: number | null) => {
    let filtered = [...dishes];
    if (categoryValue !== 'All') filtered = filtered.filter(d => d.category === categoryValue);
    if (difficultyValue !== 'All') filtered = filtered.filter(d => d.difficulty === difficultyValue);
    if (timeValue !== null) filtered = filtered.filter(d => d.prepTime <= timeValue);

    setFilteredDishes(filtered);
  };

  // Reset dei filtri ai valori di default
  const resetFilters = () => {
    setCategoryFilter('All');
    setDifficultyFilter('All');
    setTimeFilter(null);
    applyFilters('All', 'All', null);
  };

  // Liste categorie, difficoltà e icone (puoi spostarle fuori se preferisci)
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
          onEdit={editDish}
        />
      )}
    </section>
  );
};

export default DishesView;