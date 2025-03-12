import React, { useState } from 'react';
import DishesList from './routes/DishesList';

function App() {
  // State per gestire la visibilità della schermata "Gestisci Piatti"
  const [showManageDishes, setShowManageDishes] = useState(false);

  // Piatto mock per visualizzazione
  const dishes = [
    { name: 'Pizza Margherita', category: 'Primo', prepTime: 30, notes: 'Una pizza semplice con pomodoro e mozzarella.' },
    { name: 'Pasta Carbonara', category: 'Primo', prepTime: 20, notes: 'Pasta con pancetta, uovo e pecorino.' },
    { name: 'Lasagna', category: 'Primo', prepTime: 60, notes: "Per preparare le lasagne alla bolognese, iniziate dal ragù. Preparate il brodo vegetale che dovrete tenere in caldo. Poi prendete la pancetta, tagliatela prima a striscioline 1. Con un coltello o una mezzaluna sminuzzatela per bene 2. A parte preparate un trito fine con carote, cipolle, sedano e tenetelo da parte 3. In una casseruola versate un filo d'olio e la pancetta. Sgranatela bene con un mestolo 4 e lasciatela rosolare per alcuni minuti. Aggiungete poi il trito di verdure 5 e fate insaporire per 5-6 minuti 5. Aggiungete poi la carne macinata 6. Mescolate e alzate la fiamma. Lasciate rosolare la carne senza fretta, dovrà essere ben rosolata per sigillare i succhi e risultare morbida non stopposa. Sfumate con il vino rosso 7, poi aspettate che sia completamente evaporato e aggiungete la passata di pomodoro 8. Mescolate, il ragù deve cuocere due ore. Quando ha ripreso il bollore potete aggiungete poco brodo caldo, uno o due mestoli 9. Poi fate andare il ragù per un paio d'ore almeno. Dovrete cuocere con il coperchio, senza chiudere del tutto 10. Controllate e mescolate di tanto in tanto, al bisogno aggiungete altro brodo e lasciate cuocere per il tempo indicato. Passate adesso alla pasta. Come prima cosa versate gli spinaci in un tegame 11, aggiungete poca acqua, coprite con un coperchio 12 e lasciate cuocere fino a che non saranno appassiti, in totale ci vorranno 5-6 minuti 13. A questo punto scolateli, lasciateli intiepidire e strizzateli bene 14. Trasferiteli in un mixer 15 e frullateli fino ad ottenere una purea 16. Dovrete ricavarne 100 g. Adesso su una spianatoia versate la semola e la farina 00 17, aggiungete gli spinaci e create una forma a fontana. Unite le uova leggermente sbattute 18e i tuorli, sempre sbattuti 19. Iniziate ad impastare il tutto partendo dal centro 20, in questo modo le uova non scivoleranno fuori dalla fontana. Impastate bene fino ad ottenere un panetto omogeneo 21. Avvolgetelo nella pellicola 22 e lasciate riposare per 30 minuti a temperatura ambiente. Nel frattempo preparate la besciamella, ricordandovi sempre di controllare il ragù. In un pentolino mettete a scaldare il latte 23, senza farlo bollire. In un altro tegame versate il burro 24 e lasciatelo fondere." },
    { name: 'Tiramisu', category: 'Dolce', prepTime: 15, notes: 'Dolce al mascarpone con caffè e cacao.' },
    { name: 'Frittata con speck e zucchine', category: 'Secondo', prepTime: 35, notes: '' }

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
