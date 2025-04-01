import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DishesView from './routes/DishesView';
import WeeklyMenu from './components/WeeklyMenu';
import GenerateMenuModal from './components/GenerateMenuModal';
import { getRandomInt } from './components/utils';
import { Dish, WeeklyMenuType, DayMenu, Portata } from '../../electron/database/interfaces';

type PastoConNota = {
  tipi: Portata[];
  nota: string;
};

type SelezionePasti = {
  [data: string]: {
    pranzo: PastoConNota;
    cena: PastoConNota;
  };
};

const App: React.FC = () => {
  const [showManageDishes, setShowManageDishes] = useState(false);
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenuType | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedMeals, setSelectedMeals] = useState<SelezionePasti>({});
  const [avoidDuplicates, setAvoidDuplicates] = useState(true);

  useEffect(() => {
    const today = new Date();
    const inSevenDays = new Date();
    inSevenDays.setDate(today.getDate() + 7);

    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(inSevenDays.toISOString().split('T')[0]);
  }, []);

  const handleManageDishesClick = () => setShowManageDishes(true);
  const handleBackClick = () => setShowManageDishes(false);

  const generaMenuCasuale = async (): Promise<boolean> => {
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
      const piattiUsati = new Set<string>();
      const nuovoMenu: WeeklyMenuType = {};

      for (const [data, pasti] of Object.entries(selectedMeals)) {
        const giorno = new Date(data);
        const giornoLabel = giorno.toLocaleDateString('it-IT', {
          weekday: 'long',
          day: '2-digit',
          month: '2-digit'
        });

        const menuGiorno: DayMenu = { pranzo: '', cena: '' };

        for (const momento of ['pranzo', 'cena']) {
          const selezione = pasti[momento as 'pranzo' | 'cena'];

          if (selezione.nota.trim()) {
            menuGiorno[momento as 'pranzo' | 'cena'] = selezione.nota.trim();
          } else {
            const tipiRichiesti = selezione.tipi;
            let piattiGenerati: string[] = [];

            const getRandomFromList = (lista: string[]) => {
              const filtrati = avoidDuplicates ? lista.filter(p => !piattiUsati.has(p)) : lista;
              if (filtrati.length === 0) return null;
              const p = filtrati[getRandomInt(filtrati.length)];
              if (avoidDuplicates) piattiUsati.add(p);
              return p;
            };

            if (tipiRichiesti.length === 0) {
              const piatto = getRandomFromList(tuttiIPiatti);
              if (!piatto) return false;
              piattiGenerati = [piatto];
            } else {
              for (const tipo of tipiRichiesti) {
                const piatto = getRandomFromList(piattiPerTipo[tipo]);
                if (!piatto) return false;
                piattiGenerati.push(piatto);
              }
            }

            menuGiorno[momento as 'pranzo' | 'cena'] = piattiGenerati.join(' + ');
          }
        }

        nuovoMenu[giornoLabel] = menuGiorno;
      }

      setWeeklyMenu(nuovoMenu);
      setShowGenerateModal(false);
      setStep(1);
      return true;
    } catch (error) {
      console.error('Errore nel generare il menu:', error);
      return false;
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
        avoidDuplicates={avoidDuplicates}
        setAvoidDuplicates={setAvoidDuplicates}
      />
    </div>
  );
};

export default App;
