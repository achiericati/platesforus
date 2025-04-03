import React, { useState } from 'react';
import Modal from './Modal';
import { Portata } from '../../../electron/database/interfaces';
import { getDaysBetween } from './utils';

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
  onGenerate: () => Promise<boolean>;
  avoidDuplicates: boolean;
  setAvoidDuplicates: (value: boolean) => void;
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
  onGenerate,
  avoidDuplicates,
  setAvoidDuplicates
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

  const handleGenerate = async () => {
    const success = await onGenerate();
    if (!success) {
      setErrorMessage('Errore: piatti insufficienti per generare il menu senza duplicazioni. Rivedi le selezioni.');
    }
  };

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
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Fine</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">
              Annulla
            </button>
            <button
              disabled={!startDate || !endDate}
              onClick={() => {
                const days = getDaysBetween(startDate, endDate);
                const initial: SelezionePasti = {};
                days.forEach(date => {
                  initial[date] = {
                    pranzo: { tipi: [], nota: '' },
                    cena: { tipi: [], nota: '' }
                  };
                });
                setSelectedMeals(initial);
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
          {/* Box istruzioni espandibile */}
          <div
            className="bg-purple-100 border border-purple-300 rounded px-3 py-2 text-sm cursor-pointer"
            onClick={() => setShowInstructions(!showInstructions)}
          >
            <div className="flex items-center gap-2 text-purple-800 font-semibold">
              <span>ℹ️</span>
              <span>Istruzioni</span>
              <span>{showInstructions ? '▲' : '▼'}</span>
            </div>
            {showInstructions && (
              <div className="mt-3 space-y-2 text-black">
                <p>Per ogni pasto, seleziona una o più portate che verranno scelte in modo casuale.</p>
                <p>Se non selezioni nessuna portata, il sistema sceglierà casualmente tra tutti i tipi di piatti (dolci esclusi).</p>
                <p>Se aggiungi una nota, non verrà scelto nessun piatto per quel pasto, ma verrà mostrata la tua nota sul menu generato (ad esempio, "Cena fuori").</p>
                <p>Il checkbox "Evita duplicazioni", se abilitato, fa in modo che non possa replicarsi lo stesso piatto più di una volta nel menu.</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={avoidDuplicates}
              onChange={(e) => setAvoidDuplicates(e.target.checked)}
              id="avoidDupes"
              className="accent-purple-600"
            />
            <label htmlFor="avoidDupes" className="text-sm text-gray-800">Evita duplicazioni</label>
          </div>

          {Object.entries(selectedMeals).map(([date, pasti]) => (
            <div key={date} className="border-b pb-4">
              <h4 className="text-md font-bold text-gray-800 mb-2">
                {new Date(date).toLocaleDateString('it-IT', { weekday: 'long', day: '2-digit', month: '2-digit' })}
              </h4>
              {['pranzo', 'cena'].map((mealKey) => {
                const pasto = pasti[mealKey as 'pranzo' | 'cena'];
                return (
                  <div key={mealKey} className="mb-4">
                    <span className="block text-sm font-semibold text-gray-700 capitalize mb-1">{mealKey}</span>
                    <div className="flex gap-2 mb-2">
                      {['Primo', 'Secondo', 'Contorno'].map((portata) => {
                        const selected = pasto.tipi.includes(portata as Portata);
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
                              const lista = updated[date][mealKey as 'pranzo' | 'cena'].tipi;
                              if (lista.includes(portata as Portata)) {
                                updated[date][mealKey as 'pranzo' | 'cena'].tipi = lista.filter(p => p !== portata);
                              } else {
                                lista.push(portata as Portata);
                              }
                              setSelectedMeals(updated);
                            }}
                          >
                            {portata}
                          </button>
                        );
                      })}
                    </div>
                    <input
                      type="text"
                      placeholder="Aggiungi una nota (opzionale)"
                      value={pasto.nota}
                      onChange={(e) => {
                        const updated = { ...selectedMeals };
                        updated[date][mealKey as 'pranzo' | 'cena'].nota = e.target.value;
                        setSelectedMeals(updated);
                      }}
                      className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm"
                    />
                  </div>
                );
              })}
            </div>
          ))}

          {errorMessage && (
            <div className="text-red-600 text-sm border border-red-300 bg-red-100 rounded px-3 py-2">
              {errorMessage}
            </div>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <button onClick={() => setStep(1)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">
              Indietro
            </button>
            <button onClick={handleGenerate} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Genera Menu
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default GenerateMenuModal;