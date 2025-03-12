import React, { useState } from 'react';
import DishesList from './routes/DishesList';

function App() {
  // State per gestire la visibilità della schermata "Gestisci Piatti"
  const [showManageDishes, setShowManageDishes] = useState(false);

  // Piatto mock per visualizzazione
  const dishes = [
    { name: 'Pizza Margherita', category: 'Primo', prepTime: 30, notes: 'Una pizza semplice con pomodoro e mozzarella.' },
    { name: 'Pasta Carbonara', category: 'Primo', prepTime: 20, notes: 'Pasta con pancetta, uovo e pecorino.' },
    { name: 'Lasagna', category: 'Primo', prepTime: 60, notes: 'Lasagna con ragù, besciamella e parmigiano.' },
    { name: 'Tiramisu', category: 'Dolce', prepTime: 15, notes: 'Dolce al mascarpone con caffè e cacao.' },
    { name: 'Frittata con speck e zucchine Frittata con speck e zucchine', category: 'Secondo', prepTime: 35, notes: '' }

  ];

  // Funzione per gestire il click su "Gestisci Piatti"
  const handleManageDishesClick = () => {
    setShowManageDishes(true);
  };

  // Funzione per tornare alla schermata principale
  const handleBackClick = () => {
    setShowManageDishes(false);
  };

  // Funzione per tornare alla schermata principale
  const handleAddNewClick = () => {
    alert('Mostra form per aggiungere un piatto');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-b-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-white">Plates For Us 🍽️</h1>
        {!showManageDishes && (
          <button 
            className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition-colors"
            onClick={handleManageDishesClick} // Gestisce il click per gestire i piatti
          >
            Gestisci Piatti
          </button>
        )}
      </header>

      {/* Schermata principale */}
      {!showManageDishes && (
        <main className="flex flex-col justify-center items-center flex-1 text-center px-6 py-12">
          <h2 className="text-4xl font-bold text-white mb-6">Il tuo menu settimanale, semplice e veloce</h2>
          <p className="text-lg text-white mb-10 max-w-lg mx-auto">
            Genera il piano pasti della settimana con i piatti che conosci e ami cucinare!
          </p>
          <button className="bg-white text-purple-600 text-lg font-bold px-10 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-all">
            Genera Menu Settimanale
          </button>
        </main>
      )}

      {/* Schermata Gestisci Piatti */}
      {showManageDishes && (
        <DishesList
          dishes={dishes}
          onBackClick={handleBackClick}
          onAddNewClick={handleAddNewClick}
        />
      )}

      {/* Footer (rimane in basso) */}
      <footer className="text-center py-4 text-sm text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        Made with ❤️ by Andrea & Annalisa
      </footer>
    </div>
  );
}

export default App;
