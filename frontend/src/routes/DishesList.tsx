import React from 'react';
import { FaUtensils, FaHamburger } from 'react-icons/fa'; // Aggiungi le icone che ti piacciono

const DishesList = ({ dishes, onBackClick, onAddNewClick }: any) => {
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
        <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6 w-full">
          {dishes.map((dish: any, index: number) => (
            <div
              key={index}
              className="bg-white text-purple-600 p-4 rounded-lg shadow-lg flex flex-col justify-between hover:scale-105 hover:shadow-xl transition-all"
            >
                <h5 style={{marginBottom:'10px'}} className="font-bold text-lg">{dish.name}</h5>
              
              <div style={{display:'flex', alignItems:"center"}}>
                {dish.category === 'Primo' ? (
                  <FaUtensils style={{marginRight:'6px'}} className="text-2xl text-yellow-500" /> 
                ) : (
                  <FaHamburger style={{marginRight:'6px'}} className="text-2xl text-red-500" />
                )}
                <p className="text-sm">{dish.category}</p>
              </div>

              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DishesList;
