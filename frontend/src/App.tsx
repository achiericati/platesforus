import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DishesView from './routes/DishesView';
import Modal from './components/Modal';

// Tipi per i dati
type Meal = string;
type DayMenu = { pranzo: Meal; cena: Meal; };
type WeeklyMenuType = { [giorno: string]: DayMenu; };
type Portata = 'Primo' | 'Secondo' | 'Contorno';
type SelezionePasti = {
  [data: string]: {
    pranzo: Portata[];
    cena: Portata[];
  };
};

interface Dish {
  id: number;
  name: string;
  category: string;
  difficulty: string;
  prepTime: number;
  recipe: string;
}

const mockWeeklyMenu: WeeklyMenuType = {
  lunedì: { pranzo: 'Pasta al Pesto', cena: 'Pollo al forno' },
  martedì: { pranzo: 'Insalata di riso', cena: 'Zuppa di legumi' },
  mercoledì: { pranzo: 'Lasagna', cena: 'Salmone alla griglia' },
  giovedì: { pranzo: 'Pasta al Pomodoro', cena: 'Spezzatino' },
  venerdì: { pranzo: 'Couscous', cena: 'Pizza fatta in casa' },
  sabato: { pranzo: 'Risotto ai funghi', cena: 'Hamburger' },
  domenica: { pranzo: 'Arrosto di vitello', cena: 'Minestrone' },
};

const gradients = [
  'from-pink-400 to-purple-500',
  'from-purple-400 to-indigo-500',
  'from-indigo-400 to-blue-500',
  'from-green-400 to-teal-500',
  'from-blue-400 to-cyan-500',
  'from-red-400 to-pink-500',
  'from-yellow-400 to-orange-500'
];

const icons = ['🍝', '🍲', '🍕', '🍔', '🥗', '🍛', '🥘'];

const getDaysBetween = (start: string, end: string): string[] => {
  const startDate = new Date(start);
  const endDateObj = new Date(end);
  const days: string[] = [];

  while (startDate <= endDateObj) {
    days.push(startDate.toISOString().split('T')[0]);
    startDate.setDate(startDate.getDate() + 1);
  }

  return days;
};

const WeeklyMenu: React.FC<{ menu: WeeklyMenuType }> = ({ menu }) => {
  return (
    <div className="flex flex-col px-4 py-8 space-y-8">
      <motion.h2
        className="text-4xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Il tuo Menu Settimanale
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Object.entries(menu).map(([giorno, pasti], index) => (
          <motion.div
            key={giorno}
            className={`bg-white bg-opacity-20 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20 transition-transform hover:scale-105 bg-gradient-to-br ${gradients[index % gradients.length]}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 80 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold text-white">
                {icons[index % icons.length]} {giorno.charAt(0).toUpperCase() + giorno.slice(1)}
              </h3>
            </div>

            <div className="flex justify-between py-2 border-b border-white/30">
              <span className="font-medium text-white">Pranzo:</span>
              <span className="text-white">{pasti.pranzo}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium text-white">Cena:</span>
              <span className="text-white">{pasti.cena}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [showManageDishes, setShowManageDishes] = useState(false);
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenuType | null>(mockWeeklyMenu);
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

      dishes.forEach((dish) => {
        const tipo = dish.category as Portata;
        if (piattiPerTipo[tipo]) {
          piattiPerTipo[tipo].push(dish.name);
        }
      });

      const tuttiIPiatti = dishes.map(d => d.name);

      const nuovoMenu: WeeklyMenuType = {};

      Object.entries(selectedMeals).forEach(([data, pasti]) => {
        const menuGiorno: DayMenu = { pranzo: '', cena: '' };

        ['pranzo', 'cena'].forEach((momento) => {
          const tipiRichiesti = pasti[momento as 'pranzo' | 'cena'];

          let piattiGenerati: string[] = [];

          if (tipiRichiesti.length === 0) {
            const randomDish = tuttiIPiatti[Math.floor(Math.random() * tuttiIPiatti.length)];
            piattiGenerati = [randomDish];
          } else {
            piattiGenerati = tipiRichiesti.map((tipo) => {
              const lista = piattiPerTipo[tipo];
              if (lista.length === 0) return `${tipo} non disponibile`;
              const index = Math.floor(Math.random() * lista.length);
              return lista[index];
            });
          }

          menuGiorno[momento as 'pranzo' | 'cena'] = piattiGenerati.join(' + ');
        });

        const giorno = new Date(data);
        const giornoLabel = giorno.toLocaleDateString('it-IT', {
          weekday: 'long',
          day: '2-digit',
          month: '2-digit'
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
          <div className="px-4 py-8">
            <WeeklyMenu menu={weeklyMenu} />
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                className="bg-white text-purple-600 font-semibold px-4 py-2 text-sm rounded-lg shadow hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setWeeklyMenu(null)}
              >
                Elimina Menu
              </motion.button>
              <motion.button
                className="bg-white text-purple-600 font-semibold px-4 py-2 text-sm rounded-lg shadow hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert('Funzionalità in sviluppo! 🚧')}
              >
                Modifica Menu
              </motion.button>
            </div>
          </div>
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

      {showGenerateModal && (
        <Modal
          isOpen={showGenerateModal}
          onClose={() => {
            setShowGenerateModal(false);
            setStep(1);
          }}
          title="Genera Menu Settimanale"
        >
          {step === 1 ? (
            <div className="space-y-4">
              <div className="flex gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data Inizio</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data Fine</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Annulla
                </button>
                <button
                  disabled={!startDate || !endDate}
                  onClick={() => {
                    const days = getDaysBetween(startDate, endDate);
                    const initialSelections: SelezionePasti = {};
                    days.forEach(date => {
                      initialSelections[date] = { pranzo: [], cena: [] };
                    });
                    setSelectedMeals(initialSelections);
                    setStep(2);
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                >
                  Avanti
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              {Object.entries(selectedMeals).map(([date, pasti]) => (
                <div key={date} className="border-b pb-4">
                  <h4 className="text-md font-bold text-gray-800 mb-2">
                    {new Date(date).toLocaleDateString('it-IT', { weekday: 'long', day: '2-digit', month: '2-digit' })}
                  </h4>
                  {['pranzo', 'cena'].map((mealKey) => (
                    <div key={mealKey} className="mb-2">
                      <span className="block text-sm font-semibold text-gray-700 capitalize">{mealKey}</span>
                      <div className="flex gap-2 mt-1">
                        {['Primo', 'Secondo', 'Contorno'].map((portata) => {
                          const selected = selectedMeals[date][mealKey as 'pranzo' | 'cena'].includes(portata as Portata);
                          return (
                            <button
                              key={portata}
                              className={`px-3 py-1 rounded-full border text-sm ${
                                selected ? 'bg-purple-600 text-white border-purple-600' : 'bg-gray-100 text-gray-800 border-gray-300'
                              }`}
                              onClick={() => {
                                const updated = { ...selectedMeals };
                                const mealList = updated[date][mealKey as 'pranzo' | 'cena'];
                                if (mealList.includes(portata as Portata)) {
                                  updated[date][mealKey as 'pranzo' | 'cena'] = mealList.filter(p => p !== portata);
                                } else {
                                  mealList.push(portata as Portata);
                                }
                                setSelectedMeals({ ...updated });
                              }}
                            >
                              {portata}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Indietro
                </button>
                <button
                  onClick={generaMenuCasuale}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Genera Menu
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default App;