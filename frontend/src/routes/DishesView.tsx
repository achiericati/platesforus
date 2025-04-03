import React, { useState, useEffect } from 'react';
import DishModal from '../components/DishModal';
import DishesList from '../components/DishesList';
import FiltersSection from '../components/FiltersSection';
import { Dish } from '../../../electron/database/interfaces';
import AddOrUpdateDishModal from '../components/AddOrUpdateDishModal';

const DishesView = ({ onBackClick }: any) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [showAddOrUpdateModal, setShowAddOrUpdateModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [timeFilter, setTimeFilter] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>('');
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

  const onDishClick = (dish: Dish) => setSelectedDish(dish);

  const saveOrUpdateDish = async (newDish: Dish, isEdit: boolean) => {
    if (isEdit) {
      try {
        await window.electronAPI.updateDish(newDish);
        const updatedDishes = dishes.map(d => d.id === newDish.id ? newDish : d);
        setDishes(updatedDishes);
        applyFilters(categoryFilter, difficultyFilter, timeFilter, searchText, updatedDishes);
        setShowAddOrUpdateModal(false);
        closeModal();
      } catch (error) {
        console.error('Errore durante la modifica del piatto:', error);
      }
    } else {
      try {
        const dish = await window.electronAPI.addDish(newDish);
        const updatedDishes = [...dishes, dish];
        setDishes(updatedDishes);
        applyFilters(categoryFilter, difficultyFilter, timeFilter, searchText, updatedDishes);
        setShowAddOrUpdateModal(false);
      } catch (error) {
        console.error('Errore durante il salvataggio del piatto:', error);
      }
    }
  };

  const editDish = () => setShowAddOrUpdateModal(true);

  const deleteDish = async (dish: Dish) => {
    try {
      await window.electronAPI.deleteDish(dish.id);
      const updatedDishes = dishes.filter(d => d.id !== dish.id);
      setDishes(updatedDishes);
      applyFilters(categoryFilter, difficultyFilter, timeFilter, searchText, updatedDishes);
      closeModal();
    } catch (error) {
      console.error('Errore durante l\'eliminazione del piatto:', error);
    }
  };

  const closeModal = () => setSelectedDish(null);

  const applyFilters = (
    categoryValue: string,
    difficultyValue: string,
    timeValue: number | null,
    searchValue: string = '',
    newDishes?: Dish[]
  ) => {
    let filtered = newDishes ? [...newDishes] : [...dishes];

    if (categoryValue !== 'All') {
      filtered = filtered.filter(d => d.category === categoryValue);
    }

    if (difficultyValue !== 'All') {
      filtered = filtered.filter(d => d.difficulty === difficultyValue);
    }

    if (timeValue !== null) {
      filtered = filtered.filter(d => d.prepTime <= timeValue);
    }

    if (searchValue.trim() !== '') {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(searchLower) ||
        d.recipe?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredDishes(filtered);
  };

  const resetFilters = () => {
    setCategoryFilter('All');
    setDifficultyFilter('All');
    setTimeFilter(null);
    setSearchText('');
    applyFilters('All', 'All', null, '');
  };

  const categories = ['All', 'Primo', 'Secondo', 'Contorno', 'Dolce'];
  const difficulties = ['All', 'Facile', 'Media', 'Difficile'];
  const categoryIcons = { 'Primo': '🍝', 'Secondo': '🍖', 'Contorno': '🥗', 'Dolce': '🍰' };

  return (
    <section className="flex flex-col flex-grow w-full overflow-hidden">
    <div className="flex items-center justify-between w-full px-5 py-3 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mb-4 relative">
        <button
          onClick={onBackClick}
          className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-200 transition-colors text-sm outline-none focus:outline-none"
        >
          ← Indietro
        </button>

        <h3 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold text-white">
          Gestisci i tuoi piatti
        </h3>

        <div className="flex gap-2">
          <button
            onClick={async () => {
              try {
                await window.electronAPI.exportDishesToCSV(dishes);
              } catch (err) {
                console.error('Errore esportazione CSV:', err);
              }
            }}
            className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-200 transition-colors text-sm outline-none focus:outline-none"
          >
            Esporta CSV
          </button>

          <button
            onClick={async () => {
              try {
                const imported = await window.electronAPI.importDishesFromCSV();
                if (imported.length > 0) {
                  const updatedDishes = [...dishes, ...imported];
                  setDishes(updatedDishes);
                  applyFilters(categoryFilter, difficultyFilter, timeFilter, searchText, updatedDishes);
                  alert(`${imported.length} piatti importati con successo!`);
                } else {
                  alert('Nessun nuovo piatto importato.');
                }
              } catch (err) {
                console.error('Errore durante l\'importazione del CSV:', err);
                alert('Errore durante l\'importazione del file CSV.');
              }
            }}
            className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-200 transition-colors text-sm outline-none focus:outline-none"
          >
            Importa CSV
          </button>

          <button
            onClick={() => setShowAddOrUpdateModal(true)}
            className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-200 transition-colors text-sm outline-none focus:outline-none"
          >
            Aggiungi Nuovo Piatto
          </button>
        </div>
      </div>

      <FiltersSection
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        resetFilters={resetFilters}
        categoryFilter={categoryFilter}
        difficultyFilter={difficultyFilter}
        timeFilter={timeFilter}
        searchText={searchText}
        setCategoryFilter={setCategoryFilter}
        setDifficultyFilter={setDifficultyFilter}
        setTimeFilter={setTimeFilter}
        setSearchText={(value: string) => {
          setSearchText(value);
          applyFilters(categoryFilter, difficultyFilter, timeFilter, value);
        }}
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

      {showAddOrUpdateModal && (
        <AddOrUpdateDishModal
          onClose={() => setShowAddOrUpdateModal(false)}
          onSave={saveOrUpdateDish}
          dishToEdit={selectedDish ?? undefined}
        />
      )}
    </section>
  );
};

export default DishesView;