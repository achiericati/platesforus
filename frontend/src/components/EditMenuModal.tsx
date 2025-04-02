import React, { useState } from 'react';
import Modal from './Modal';
import { WeeklyMenuType } from '../../../electron/database/interfaces';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  menu: WeeklyMenuType;
  onSave: (updatedMenu: WeeklyMenuType) => void;
}

const EditMenuModal: React.FC<Props> = ({ isOpen, onClose, menu, onSave }) => {
  const [localMenu, setLocalMenu] = useState<WeeklyMenuType>(menu);

  const handleChange = (day: string, meal: 'pranzo' | 'cena', value: string) => {
    setLocalMenu(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: value
      }
    }));
  };

  const handleSave = () => {
    onSave(localMenu);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Modifica Menu">
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        {Object.entries(localMenu).map(([giorno, pasti]) => (
          <div key={giorno} className="border-b pb-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-2 capitalize">{giorno}</h4>
            <div className="space-y-2">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Pranzo</label>
                <input
                  type="text"
                  value={pasti.pranzo}
                  onChange={(e) => handleChange(giorno, 'pranzo', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Cena</label>
                <input
                  type="text"
                  value={pasti.cena}
                  onChange={(e) => handleChange(giorno, 'cena', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">
          Annulla
        </button>
        <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Salva Modifiche
        </button>
      </div>
    </Modal>
  );
};

export default EditMenuModal;