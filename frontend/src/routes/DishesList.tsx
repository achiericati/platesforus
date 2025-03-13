import React, { useState } from 'react';
import { FaUtensils, FaHamburger } from 'react-icons/fa';

const DishesList = ({ dishes, onBackClick, onAddNewClick }: any) => {
  const [selectedDish, setSelectedDish] = useState<any>(null);
  const [filteredDishes, setFilteredDishes] = useState<any[]>(dishes);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [timeFilter, setTimeFilter] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const onDishClick = (dish: any) => {
    setSelectedDish(dish);
  };

  const editDish = (dish: any) => {
    alert('edit dish');
  };

  const closeModal = () => {
    setSelectedDish(null);
  };

  const applyFilters = (categoryValue: string, difficultyValue: string, timeValue: number | null) => {
    let filtered = [...dishes];

    if (categoryValue !== 'All') {
      filtered = filtered.filter((dish: any) => dish.category === categoryValue);
    }

    if (difficultyValue !== 'All') {
      filtered = filtered.filter((dish: any) => dish.difficulty === difficultyValue);
    }

    if (timeValue !== null) {
      filtered = filtered.filter((dish: any) => dish.prepTime <= timeValue);
    }

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

  const categoryIcons: any = {
    'Primo': '🍝',
    'Secondo': '🍖',
    'Contorno': '🥗',
    'Dolce': '🍰'
  };

  return (
    <section className="flex flex-col flex-grow w-full overflow-hidden">

      {/* Barra superiore */}
      <div className="flex items-center justify-between w-full px-5 py-3 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mb-4">
        
        {/* Bottone Indietro */}
        <button
          onClick={onBackClick}
          className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-200 transition-colors text-sm"
        >
          ← Indietro
        </button>

        {/* Titolo */}
        <h3 className="text-xl font-semibold text-white text-center">
          Gestisci i tuoi piatti
        </h3>

        {/* Bottone Aggiungi */}
        <button
          onClick={onAddNewClick}
          className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-200 transition-colors text-sm"
        >
          Aggiungi Nuovo Piatto
        </button>

      </div>

      {/* Switch Mostra/Nascondi + Bottone Reset */}
      <div className="flex items-center justify-center mb-4 gap-4">

        <div className="bg-white rounded-full shadow px-3 py-2 flex items-center">
          <label className="flex items-center cursor-pointer">
            <div className="relative w-8 h-4">
              <input
                type="checkbox"
                className="sr-only"
                checked={showFilters}
                onChange={() => setShowFilters(!showFilters)}
              />
              <div className="w-8 h-4 bg-gray-300 rounded-full transition-colors duration-300"></div>
              <div
                className={`absolute top-0 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${showFilters ? 'translate-x-[16px] bg-purple-600' : ''}`}
              ></div>
            </div>
            <span className="ml-3 text-purple-600 text-xs font-semibold">
              {showFilters ? 'Nascondi Filtri' : 'Mostra Filtri'}
            </span>
          </label>
        </div>

        <button
          onClick={resetFilters}
          style={{ marginLeft: '5px' }}
          className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-200 transition-colors text-xs outline-none focus:outline-none"
        >
          Reset Filtri
        </button>
      </div>

      {/* Filtri */}
      {showFilters && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full px-4 mb-8">

          {/* Categoria */}
          <div className="flex justify-center xl:justify-start">
            <div>
              <h4 className="text-sm font-semibold text-white-600">Categoria:</h4>
              <div className="flex gap-2 mt-2 flex-wrap justify-center xl:justify-start">
                {categories.map((category) => (
                  <button
                    key={category}
                    style={{ marginRight: '5px', marginTop: '5px' }}
                    onClick={() => {
                      setCategoryFilter(category);
                      applyFilters(category, difficultyFilter, timeFilter);
                    }}
                    className={`px-2 py-1 rounded-full text-xs ${
                      category === categoryFilter
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-purple-600'
                    } outline-none focus:outline-none`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Difficoltà */}
          <div className="flex justify-center">
            <div>
              <h4 className="text-sm font-semibold text-white-600">Difficoltà:</h4>
              <div className="flex gap-2 mt-2 flex-wrap justify-center">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    style={{ marginRight: '5px', marginTop: '5px' }}
                    onClick={() => {
                      setDifficultyFilter(difficulty);
                      applyFilters(categoryFilter, difficulty, timeFilter);
                    }}
                    className={`px-2 py-1 rounded-full text-xs ${
                      difficulty === difficultyFilter
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-purple-600 border'
                    } outline-none focus:outline-none`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tempo */}
          <div className="flex justify-center xl:justify-end">
            <div>
              <h4 className="text-sm font-semibold text-white-600">Tempo di preparazione:</h4>
              <div className="flex gap-2 mt-2 flex-wrap justify-center xl:justify-end">
                {[15, 30, 45, 60, 90].map((time) => (
                  <button
                    key={time}
                    style={{ marginRight: '5px', marginTop: '5px' }}
                    onClick={() => {
                      setTimeFilter(time);
                      applyFilters(categoryFilter, difficultyFilter, time);
                    }}
                    className={`px-2 py-1 rounded-full text-xs ${
                      time === timeFilter
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-purple-600 border'
                    } outline-none focus:outline-none`}
                  >
                    {time}'
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Lista Piatti */}
      <div
        className="overflow-y-auto w-full px-6 py-4 scrollable-cards flex-grow"
        style={{ maxHeight: showFilters ? 'calc(100vh - 300px)' : 'calc(100vh - 210px)' }}
      >
        {categoryFilter === 'All' ? (
          categories.filter(c => c !== 'All').map((category) => {
            const dishesByCategory = filteredDishes.filter(dish => dish.category === category);
            if (dishesByCategory.length === 0) return null;

            return (
              <div key={category} className="mb-4">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  {category} <span style={{marginLeft:'5px'}}> {categoryIcons[category]}</span> 
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {dishesByCategory.map((dish: any, index: number) => (
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
            {categoryFilter} <span style={{marginLeft:'5px'}}>{categoryIcons[categoryFilter]}</span> 
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {filteredDishes.map((dish: any, index: number) => (
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
      </div>

      {/* Modale piatto selezionato */}
      {selectedDish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white text-black p-6 rounded-lg shadow-lg max-w-4xl w-full min-h-[300px] overflow-y-auto border-4 border-white-600 flex flex-col"
            style={{ maxHeight: '80vh', height: 'auto' }}
          >
            <h4 className="text-2xl font-semibold mb-4">{selectedDish.name}</h4>
            <p className="text-lg mb-4"><strong>Categoria:</strong> {selectedDish.category}</p>
            <p className="text-lg mb-4"><strong>Tempo di preparazione:</strong> {selectedDish.prepTime} min</p>

            <strong>Ricetta:</strong>
            <div className="text-m mb-4 overflow-y-auto" style={{ marginTop: '10px', flex: 1, maxHeight: '60vh' }}>
              <p>{selectedDish.notes || 'Nessuna ricetta disponibile'}</p>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => editDish(selectedDish)}
                className="bg-purple-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
              >
                Modifica
              </button>
              <button
                onClick={closeModal}
                className="bg-purple-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-purple-700 transition-all"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DishesList;
