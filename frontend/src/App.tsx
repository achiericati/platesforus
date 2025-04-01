import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DishesView from './routes/DishesView';
import WeeklyMenu from './components/WeeklyMenu';
import { WeeklyMenuType, SelezionePasti, Dish, Portata, DayMenu } from '../../electron/database/interfaces';
import GenerateMenuModal from './components/GenerateMenuModal';
import { randomInt } from 'crypto';
import { getRandomInt } from './components/utils';

const App: React.FC = () => {
  const [showManageDishes, setShowManageDishes] = useState(false);
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenuType | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedMeals, setSelectedMeals] = useState<SelezionePasti>({});

  const handleManageDishesClick = () => setShowManageDishes(true);
  const handleBackClick = () => setShowManageDishes(false);

  const generaMenuCasuale = async () => {
    try {
      const dishes: Dish[] = await window.electronAPI.getAllDishes();

      const piattiPerTipo: Record<Portata, string[]> = {
        Primo: [],
        Secondo: [],
        Contorno: []
      };

      dishes.forEach(dish => {
        const tipo = dish.category as Portata;
        if (piattiPerTipo[tipo]) piattiPerTipo[tipo].push(dish.name);
      });

      const tuttiIPiatti = dishes.map(d => d.name);
      const nuovoMenu: WeeklyMenuType = {};

      Object.entries(selectedMeals).forEach(([data, pasti]) => {
        const giorno = new Date(data);
        const giornoLabel = giorno.toLocaleDateString('it-IT', {
          weekday: 'long',
          day: '2-digit',
          month: '2-digit'
        });

        const menuGiorno: DayMenu = { pranzo: '', cena: '' };

        ['pranzo', 'cena'].forEach(momento => {
          const tipiRichiesti = pasti[momento as 'pranzo' | 'cena'];
          let piattiGenerati: string[] = [];

          if (tipiRichiesti.length === 0) {
            const randomDish = tuttiIPiatti[getRandomInt(tuttiIPiatti.length)];
            piattiGenerati = [randomDish];
          } else {
            piattiGenerati = tipiRichiesti.map(tipo => {
              const lista = piattiPerTipo[tipo];
              if (lista.length === 0) return `${tipo} non disponibile`;
              const index = getRandomInt(lista.length);
              return lista[index];
            });
          }

          menuGiorno[momento as 'pranzo' | 'cena'] = piattiGenerati.join(' + ');
        });

        nuovoMenu[giornoLabel] = menuGiorno;
      });

      setWeeklyMenu(nuovoMenu);
      setShowGenerateModal(false);
      setStep(1);
    } catch (error) {
      console.error('Errore nel generare il menu:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-sans">
      {!showManageDishes && (
        <header className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
          <h1 className="text-3xl font-semibold text-white">Plates For Us 🍽️</h1>
          <motion.button
            className="bg-white text-purple-600 font-semibold px-4 py-2 text-sm rounded-lg shadow hover:bg-gray-200 transition-colors outline-none focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleManageDishesClick}
          >
            Gestisci Piatti
          </motion.button>
        </header>
      )}

      <main className="flex-1 overflow-y-auto">
        {showManageDishes ? (
          <DishesView onBackClick={handleBackClick} />
        ) : weeklyMenu ? (
          <WeeklyMenu menu={weeklyMenu} />
        ) : (
          <div className="flex flex-col justify-center items-center text-center px-6 py-12">
            <motion.h2
              className="text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Il tuo menu settimanale, semplice e veloce
            </motion.h2>
            <motion.p
              className="text-lg text-white mb-10 max-w-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Genera il piano pasti della settimana con i piatti che conosci e ami cucinare!
            </motion.p>

            <motion.button
              className="bg-white text-purple-600 text-lg font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowGenerateModal(true)}
            >
              Genera Menu Settimanale
            </motion.button>
          </div>
        )}
      </main>

      <footer className="py-2 text-sm text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-inner">
        Made with ❤️ by Andrea & Annalisa
      </footer>

      <GenerateMenuModal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        step={step}
        setStep={setStep}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        selectedMeals={selectedMeals}
        setSelectedMeals={setSelectedMeals}
        onGenerate={generaMenuCasuale}
      />
    </div>
  );
};

export default App;