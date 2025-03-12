import React, { useState } from 'react';
import { FaUtensils, FaHamburger } from 'react-icons/fa';

const DishesList = ({ dishes, onBackClick, onAddNewClick }: any) => {
  // Stato per gestire il piatto selezionato e l'apertura del modale
  const [selectedDish, setSelectedDish] = useState<any>(null);

  // Funzione per gestire il clic su una card
  const onDishClick = (dish: any) => {
    setSelectedDish(dish); // Imposta il piatto selezionato
  };

  // Funzione per chiudere il modale
  const closeModal = () => {
    setSelectedDish(null);
  };

  return (
    <section className="flex flex-col items-center text-white py-6 mt-6 rounded-lg shadow-lg max-w-full flex-1">
      {/* Bottone Indietro */}
      <button
        onClick={onBackClick}
        className="absolute top-20 left-4 bg-white text-purple-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-200 transition-colors"
      >
        ← Indietro
      </button>

      {/* Bottone Aggiungi Nuovo Piatto */}
      <button
        onClick={onAddNewClick} // Logica per aggiungere un piatto
        className="absolute top-20 right-4 bg-white text-purple-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-200 transition-colors"
      >
        Aggiungi Nuovo Piatto
      </button>

      <h3 className="text-2xl font-semibold mb-4">Gestisci i tuoi piatti</h3>

      {/* Lista Piatti */}
      <div className="mb-4 w-full px-6">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 w-full">
          {dishes.map((dish: any, index: number) => (
            <div
              key={index}
              className="bg-white text-purple-600 p-4 rounded-lg shadow-lg flex flex-col justify-between hover:scale-105 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => onDishClick(dish)} // Evento onClick che invoca la funzione di apertura modale
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
            <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h4 className="text-2xl font-semibold mb-4">{selectedDish.name}</h4>
            <p className="text-lg mb-4"><strong>Categoria:</strong> {selectedDish.category}</p>
            <p className="text-lg mb-4"><strong>Tempo di preparazione:</strong> {selectedDish.prepTime} min</p>

            {/* Aggiungi una classe per la ricetta con max-height e overflow */}
            <div className="text-lg mb-4 max-h-48 overflow-y-auto">
                <strong>Ricetta:</strong>
                <p>{selectedDish.notes || 'Nessuna ricetta disponibile'}</p>
            </div>

            <button
                onClick={closeModal}
                className="bg-purple-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-purple-700 transition-all"
            >
                Chiudi
            </button>
            </div>
        </div>
        )}

    </section>
  );
};

export default DishesList;
