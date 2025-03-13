import React, { useState } from 'react';
import { FaUtensils, FaHamburger } from 'react-icons/fa';

const DishesList = ({ dishes, onBackClick, onAddNewClick }: any) => {
  const [selectedDish, setSelectedDish] = useState<any>(null);
  const [filteredDishes, setFilteredDishes] = useState<any[]>(dishes);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [timeFilter, setTimeFilter] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(true); // <-- gestisce visibilità dei filtri

  const onDishClick = (dish: any) => {
    setSelectedDish(dish);
  };

  const editDish = (dish: any) => {
    alert("edit dish");
  };

  const closeModal = () => {
    setSelectedDish(null);
  };

  // Funzione per applicare i filtri
  const applyFilters = (categoryValue: string, difficultyValue: string, timeValue: number | null) => {
    let filtered = [...dishes];

    if (categoryValue !== 'All') {
      filtered = filtered.filter((dish: any) => dish.category === categoryValue);
    }

    if (difficultyValue !== 'All') {
      filtered = filtered.filter((dish: any) => dish.difficulty === difficultyValue);
    }

    if (timeValue) {
      filtered = filtered.filter((dish: any) => dish.prepTime <= timeValue);
    }

    setFilteredDishes(filtered);
  };

  const categories = ['All', 'Primo', 'Secondo', 'Contorno', 'Dolce'];
  const difficulties = ['All', 'Facile', 'Media', 'Difficile'];

  return (
    <section className="flex flex-col items-center text-white py-6 mt-6 rounded-lg shadow-lg max-w-full flex-1">

      {/* Bottone Indietro */}
      <button
        onClick={onBackClick}
        className="absolute top-20 left-4 bg-white text-purple-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-200 transition-colors"
      >
        ← Indietro
      </button>

      {/* Bottone Aggiungi */}
      <button
        onClick={onAddNewClick}
        className="absolute top-20 right-4 bg-white text-purple-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-200 transition-colors"
      >
        Aggiungi Nuovo Piatto
      </button>

      <h3 className="text-3xl font-semibold mb-4">Gestisci i tuoi piatti</h3>

      {/* Switch Mostra/Nascondi Filtri */}
      <div className="flex items-center justify-center mb-2">
        <label className="flex items-center cursor-pointer">
          <div className="relative w-8 h-4">
            <input
              type="checkbox"
              className="sr-only"
              checked={showFilters}
              onChange={() => setShowFilters(!showFilters)}
            />
            {/* Track */}
            <div className="w-8 h-4 bg-gray-400 rounded-full shadow-inner"></div>

            {/* Dot */}
            <div
              className={`absolute top-0 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${showFilters ? 'translate-x-[16px] bg-purple-600' : ''}`}
            ></div>
          </div>
          <span className="ml-3 text-white text-xs">
            {showFilters ? 'Nascondi Filtri' : 'Mostra Filtri'}
          </span>
        </label>
      </div>

      {/* Filtri */}
      {showFilters && (
  <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full px-4 mb-8">

    {/* Filtra per categoria - Sinistra su XL */}
    <div className="flex justify-center xl:justify-start">
      <div>
        <h4 className="text-sm font-semibold text-white-600">Categoria:</h4>
        <div className="flex gap-2 mt-2 flex-wrap justify-center xl:justify-start">
          {categories.map((category) => (
            <button
              key={category}
              style={{ marginRight: "5px", marginTop: "5px" }}
              onClick={() => {
                setCategoryFilter(category);
                applyFilters(category, difficultyFilter, timeFilter);
              }}
              className={`px-1 py-1 rounded-full ${
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

    {/* Filtra per difficoltà - Centro su XL */}
    <div className="flex justify-center">
      <div>
        <h4 className="text-sm font-semibold text-white-600">Difficoltà:</h4>
        <div className="flex gap-2 mt-2 flex-wrap justify-center">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty}
              style={{ marginRight: "5px", marginTop: "5px" }}
              onClick={() => {
                setDifficultyFilter(difficulty);
                applyFilters(categoryFilter, difficulty, timeFilter);
              }}
              className={`px-1 py-1 rounded-full ${
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

    {/* Filtra per tempo - Destra su XL */}
    <div className="flex justify-center xl:justify-end">
      <div>
        <h4 className="text-sm font-semibold text-white-600">Tempo di preparazione:</h4>
        <div className="flex gap-2 mt-2 flex-wrap justify-center xl:justify-end">
          {[15, 30, 45, 60, 90].map((time) => (
            <button
              key={time}
              style={{ marginRight: "5px", marginTop: "5px" }}
              onClick={() => {
                setTimeFilter(time);
                applyFilters(categoryFilter, difficultyFilter, time);
              }}
              className={`px-1 py-1 rounded-full ${
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
      <div style={{ marginTop: "30px" }} className="mb-4 w-full px-6">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 w-full">
          {filteredDishes.map((dish: any, index: number) => (
            <div
              key={index}
              className="bg-white text-purple-600 p-4 rounded-lg shadow-lg flex flex-col justify-between hover:scale-105 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => onDishClick(dish)}
            >
              <h5 style={{ marginBottom: '10px' }} className="font-bold text-lg">{dish.name}</h5>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {dish.category === 'Primo' ? (
                  <FaUtensils style={{ marginRight: '6px' }} className="text-2xl text-yellow-500" />
                ) : (
                  <FaHamburger style={{ marginRight: '6px' }} className="text-2xl text-red-500" />
                )}
                <p className="text-sm">{dish.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modale per mostrare la ricetta e il tempo di preparazione */}
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
            <div
              style={{ marginTop: '10px', flex: 1, maxHeight: '60vh' }}
              className="text-m mb-4 overflow-y-auto"
            >
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
