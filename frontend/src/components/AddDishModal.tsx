import React, { useState } from 'react';
import { Dish } from '../../../electron/database/interfaces';

interface AddDishModalProps {
  onClose: () => void;
  onSave: (newDish: Dish) => void;
}

const AddDishModal: React.FC<AddDishModalProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Primo');
  const [difficulty, setDifficulty] = useState('Facile');
  const [prepTime, setPrepTime] = useState<number>(0);
  const [recipe, setRecipe] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('Il nome è obbligatorio');
      return;
    }

    const newDish: Dish = {
      id: 0,
      name,
      category,
      difficulty,
      prepTime,
      recipe
    };

    onSave(newDish);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: 'white',
        color: 'black',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        width: '90%',
        maxWidth: '32rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h3 className="text-xl font-semibold">Aggiungi Nuovo Piatto</h3>

        <input
          type="text"
          placeholder="Nome del piatto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
          <option value="Primo">Primo</option>
          <option value="Secondo">Secondo</option>
          <option value="Contorno">Contorno</option>
          <option value="Dolce">Dolce</option>
        </select>

        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="p-2 border rounded">
          <option value="Facile">Facile</option>
          <option value="Media">Media</option>
          <option value="Difficile">Difficile</option>
        </select>

        <input
          type="number"
          placeholder="Tempo di preparazione (minuti)"
          value={prepTime}
          onChange={(e) => setPrepTime(parseInt(e.target.value))}
          className="p-2 border rounded"
        />

        <textarea
          placeholder="Ricetta / Note"
          value={recipe}
          onChange={(e) => setRecipe(e.target.value)}
          className="p-2 border rounded"
        />

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Salva
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDishModal;