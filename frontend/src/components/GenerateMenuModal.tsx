import React from 'react';
import Modal from './Modal';
import { SelezionePasti, Portata } from '../../../electron/database/interfaces';
import { getDaysBetween } from './utils';

interface GenerateMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: 1 | 2;
  setStep: (step: 1 | 2) => void;
  startDate: string;
  endDate: string;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  selectedMeals: SelezionePasti;
  setSelectedMeals: (meals: SelezionePasti) => void;
  onGenerate: () => void;
}

const GenerateMenuModal: React.FC<GenerateMenuModalProps> = ({
  isOpen,
  onClose,
  step,
  setStep,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  selectedMeals,
  setSelectedMeals,
  onGenerate
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => { onClose(); setStep(1); }} title="Genera Menu Settimanale">
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
              onClick={onClose}
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
                {new Date(date).toLocaleDateString('it-IT', {
                  weekday: 'long',
                  day: '2-digit',
                  month: '2-digit'
                })}
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
                            selected
                              ? 'bg-purple-600 text-white border-purple-600'
                              : 'bg-gray-100 text-gray-800 border-gray-300'
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
              onClick={onGenerate}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Genera Menu
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default GenerateMenuModal;