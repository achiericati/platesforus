import { motion } from 'framer-motion';
import { WeeklyMenuType } from '../../../electron/database/interfaces';
import React from 'react';

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

export default WeeklyMenu;
