import React, { useState } from 'react';
import DishModal from '../components/DishModal';
import DishesList from '../components/DishesList';
import FiltersSection from '../components/FiltersSection';

const DishesView = ({ onBackClick, onAddNewClick }: any) => {

  // Piatti mock per visualizzazione
  const dishes = [
    { name: 'Pizza Margherita', category: 'Primo', difficulty: "Facile", prepTime: 30, notes: 'Una pizza semplice con pomodoro e mozzarella.' },
    { name: 'Pasta Carbonara', category: 'Primo', difficulty: "Media", prepTime: 20, notes: 'Pasta con pancetta, uovo e pecorino.' },
    { name: 'Lasagna', category: 'Primo', prepTime: 60, difficulty: "Media", notes: "Per preparare le lasagne alla bolognese, iniziate dal ragù. Preparate il brodo vegetale che dovrete tenere in caldo. Poi prendete la pancetta, tagliatela prima a striscioline 1. Con un coltello o una mezzaluna sminuzzatela per bene 2. A parte preparate un trito fine con carote, cipolle, sedano e tenetelo da parte 3. In una casseruola versate un filo d'olio e la pancetta. Sgranatela bene con un mestolo 4 e lasciatela rosolare per alcuni minuti. Aggiungete poi il trito di verdure 5 e fate insaporire per 5-6 minuti 5. Aggiungete poi la carne macinata 6. Mescolate e alzate la fiamma. Lasciate rosolare la carne senza fretta, dovrà essere ben rosolata per sigillare i succhi e risultare morbida non stopposa. Sfumate con il vino rosso 7, poi aspettate che sia completamente evaporato e aggiungete la passata di pomodoro 8. Mescolate, il ragù deve cuocere due ore. Quando ha ripreso il bollore potete aggiungete poco brodo caldo, uno o due mestoli 9. Poi fate andare il ragù per un paio d'ore almeno. Dovrete cuocere con il coperchio, senza chiudere del tutto 10. Controllate e mescolate di tanto in tanto, al bisogno aggiungete altro brodo e lasciate cuocere per il tempo indicato. Passate adesso alla pasta. Come prima cosa versate gli spinaci in un tegame 11, aggiungete poca acqua, coprite con un coperchio 12 e lasciate cuocere fino a che non saranno appassiti, in totale ci vorranno 5-6 minuti 13. A questo punto scolateli, lasciateli intiepidire e strizzateli bene 14. Trasferiteli in un mixer 15 e frullateli fino ad ottenere una purea 16. Dovrete ricavarne 100 g. Adesso su una spianatoia versate la semola e la farina 00 17, aggiungete gli spinaci e create una forma a fontana. Unite le uova leggermente sbattute 18e i tuorli, sempre sbattuti 19. Iniziate ad impastare il tutto partendo dal centro 20, in questo modo le uova non scivoleranno fuori dalla fontana. Impastate bene fino ad ottenere un panetto omogeneo 21. Avvolgetelo nella pellicola 22 e lasciate riposare per 30 minuti a temperatura ambiente. Nel frattempo preparate la besciamella, ricordandovi sempre di controllare il ragù. In un pentolino mettete a scaldare il latte 23, senza farlo bollire. In un altro tegame versate il burro 24 e lasciatelo fondere." },
    { name: 'Tiramisu', category: 'Dolce', prepTime: 15, difficulty: "Difficile", notes: 'Dolce al mascarpone con caffè e cacao.' },
    { name: 'Verdure miste', category: 'Contorno', prepTime: 15, difficulty: "Facile", notes: 'Verdure miste surgelate in padella.' },
    { name: 'Frittata con speck e zucchine', difficulty: "Difficile", category: 'Secondo', prepTime: 35, notes: '' }
  ];
  // Piatti mock per visualizzazione


  const [selectedDish, setSelectedDish] = useState<any>(null);
  const [filteredDishes, setFilteredDishes] = useState<any[]>(dishes);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [timeFilter, setTimeFilter] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const onDishClick = (dish: any) => setSelectedDish(dish);
  const editDish = (dish: any) => alert('edit dish');
  const closeModal = () => setSelectedDish(null);

  const applyFilters = (categoryValue: string, difficultyValue: string, timeValue: number | null) => {
    let filtered = [...dishes];
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
        style={{ maxHeight: showFilters ? 'calc(100vh - 300px)' : 'calc(100vh - 210px)' }}
      >
        <DishesList
          categoryFilter={categoryFilter}
          categories={categories}
          categoryIcons={categoryIcons}
          onDishClick={onDishClick}
          filteredDishes={filteredDishes}
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