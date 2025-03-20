import React, { useState } from 'react';
import DishesView from './routes/DishesView';

type Meal = string;
type DayMenu = { pranzo: Meal; cena: Meal; };
type WeeklyMenuType = { [giorno: string]: DayMenu; };

const mockWeeklyMenu: WeeklyMenuType = {
  lunedì: { pranzo: 'Pasta al Pesto', cena: 'Pollo al forno' },
  martedì: { pranzo: 'Insalata di riso', cena: 'Zuppa di legumi' },
  mercoledì: { pranzo: 'Lasagna', cena: 'Salmone alla griglia' },
  giovedì: { pranzo: 'Pasta al Pomodoro', cena: 'Spezzatino' },
  venerdì: { pranzo: 'Couscous', cena: 'Pizza fatta in casa' },
  sabato: { pranzo: 'Risotto ai funghi', cena: 'Hamburger' },
  domenica: { pranzo: 'Arrosto di vitello', cena: 'Minestrone' },
};

interface WeeklyMenuProps {
  menu: WeeklyMenuType;
}

const WeeklyMenu: React.FC<WeeklyMenuProps> = ({ menu }) => {
  return (
    <div className="flex flex-col px-4 py-8 space-y-4">
      <h2 className="text-3xl font-bold text-center mb-6">Il tuo Menu Settimanale</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(menu).map(([giorno, pasti]) => (
          <div
            key={giorno}
            className="bg-white bg-opacity-90 text-purple-800 rounded-xl shadow-lg p-6 hover:scale-105 transform transition-transform"
          >
            <h3 className="text-xl font-semibold mb-4">{giorno}</h3>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Pranzo:</span>
              <span>{pasti.pranzo}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Cena:</span>
              <span>{pasti.cena}</span>
            </div>
          </div>
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
      
      {/* HEADER */}
      <header className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
        <h1 className="text-3xl font-semibold text-white">Plates For Us 🍽️</h1>
        {!showManageDishes && (
          <button
            className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition-colors outline-none focus:outline-none"
            onClick={handleManageDishesClick}
          >
            Gestisci Piatti
          </button>
        )}
      </header>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto">
        {!showManageDishes && (
          weeklyMenu ? (
            <div className="px-4 py-8">
              <WeeklyMenu menu={weeklyMenu} />
              <div className="flex justify-center mt-8">
                <button
                  className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition-colors outline-none focus:outline-none"
                  onClick={() => setWeeklyMenu(null)}
                >
                  Elimina Menu
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center text-center px-6 py-12">
              <h2 className="text-4xl font-bold text-white mb-6">Il tuo menu settimanale, semplice e veloce</h2>
              <p className="text-lg text-white mb-10 max-w-lg mx-auto">
                Genera il piano pasti della settimana con i piatti che conosci e ami cucinare!
              </p>
              <button
                className="bg-white text-purple-600 text-lg font-bold px-10 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-all"
                onClick={() => setWeeklyMenu(mockWeeklyMenu)}
              >
                Genera Menu Settimanale
              </button>
            </div>
          )
        )}

        {showManageDishes && (
          <DishesView onBackClick={handleBackClick} />
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