import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DishesView from './routes/DishesView';

// Tipi per i dati
type Meal = string;
type DayMenu = { pranzo: Meal; cena: Meal; };
type WeeklyMenuType = { [giorno: string]: DayMenu; };

// Menu settimanale mockato
const mockWeeklyMenu: WeeklyMenuType = {
  lunedì: { pranzo: 'Pasta al Pesto', cena: 'Pollo al forno' },
  martedì: { pranzo: 'Insalata di riso', cena: 'Zuppa di legumi' },
  mercoledì: { pranzo: 'Lasagna', cena: 'Salmone alla griglia' },
  giovedì: { pranzo: 'Pasta al Pomodoro', cena: 'Spezzatino' },
  venerdì: { pranzo: 'Couscous', cena: 'Pizza fatta in casa' },
  sabato: { pranzo: 'Risotto ai funghi', cena: 'Hamburger' },
  domenica: { pranzo: 'Arrosto di vitello', cena: 'Minestrone' },
};

// Gradients e icone per i giorni
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

// Componente WeeklyMenu
interface WeeklyMenuProps {
  menu: WeeklyMenuType;
}

const WeeklyMenu: React.FC<WeeklyMenuProps> = ({ menu }) => {
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
            className={`bg-white bg-opacity-20 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20 transition-transform hover:scale-105
              bg-gradient-to-br ${gradients[index % gradients.length]}`}
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
  const [showManageDishes, setShowManageDishes] = useState<boolean>(false);
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenuType | null>(mockWeeklyMenu);

  const handleManageDishesClick = (): void => {
    setShowManageDishes(true);
  };

  const handleBackClick = (): void => {
    setShowManageDishes(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-sans">
      
      {/* HEADER - Mostralo solo se NON sei in gestione piatti */}
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

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto">
        {showManageDishes ? (
          <DishesView onBackClick={handleBackClick} />
        ) : (
          weeklyMenu ? (
            <div className="px-4 py-8">
              <WeeklyMenu menu={weeklyMenu} />

              <div className="flex justify-center gap-4 mt-8">
                {/* Elimina Menu */}
                <motion.button
                  className="bg-white text-purple-600 font-semibold px-4 py-2 text-sm rounded-lg shadow hover:bg-gray-200 transition-colors outline-none focus:outline-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setWeeklyMenu(null)}
                >
                  Elimina Menu
                </motion.button>

                {/* Modifica Menu */}
                <motion.button
                  className="bg-white text-purple-600 font-semibold px-4 py-2 text-sm rounded-lg shadow hover:bg-gray-200 transition-colors outline-none focus:outline-none"
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
                onClick={() => setWeeklyMenu(mockWeeklyMenu)}
              >
                Genera Menu Settimanale
              </motion.button>
            </div>
          )
        )}
      </main>

      {/* FOOTER */}
      <footer className="py-2 text-sm text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-inner">
        Made with ❤️ by Andrea & Annalisa
      </footer>
    </div>
  );
};

export default App;
