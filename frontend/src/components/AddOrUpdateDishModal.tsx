import React, { useState, useEffect } from 'react';
import { Dish } from '../../../electron/database/interfaces';
import { FaStar } from 'react-icons/fa';
import { Info } from 'lucide-react';

interface AddDishModalProps {
  onClose: () => void;
  onSave: (dish: Dish, isEdit: boolean) => void;
  dishToEdit?: Dish;
}

const AddOrUpdateDishModal: React.FC<AddDishModalProps> = ({ onClose, onSave, dishToEdit }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Primo');
  const [difficulty, setDifficulty] = useState('Facile');
  const [prepTime, setPrepTime] = useState<number>(0);
  const [recipe, setRecipe] = useState('');
  const [isSpecial, setIsSpecial] = useState(false);

  useEffect(() => {
    if (dishToEdit) {
      setName(dishToEdit.name);
      setCategory(dishToEdit.category);
      setDifficulty(dishToEdit.difficulty);
      setPrepTime(dishToEdit.prepTime);
      setRecipe(dishToEdit.recipe || '');
      setIsSpecial(dishToEdit.isSpecial || false);
    } else {
      setName('');
      setCategory('Primo');
      setDifficulty('Facile');
      setPrepTime(0);
      setRecipe('');
      setIsSpecial(false);
    }
  }, [dishToEdit]);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('Il nome è obbligatorio');
      return;
    }

    const updatedDish: Dish = {
      id: dishToEdit ? dishToEdit.id : 0,
      name,
      category,
      difficulty,
      prepTime,
      recipe,
      isSpecial,
    };

    onSave(updatedDish, !!dishToEdit);
  };

  const modalTitle = dishToEdit ? 'Modifica Piatto' : 'Aggiungi Nuovo Piatto';
  const buttonText = dishToEdit ? 'Salva Modifiche' : 'Aggiungi Piatto';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white text-black rounded-2xl shadow-lg w-full max-w-lg p-8 flex flex-col gap-4 animate-fade-in">

        <h3 className="text-2xl font-bold text-center">{modalTitle}</h3>

        {/* Nome */}
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Nome</span>
          <input
            type="text"
            placeholder="Nome del piatto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </label>

        {/* Categoria */}
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Categoria</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            <option value="Primo">Primo</option>
            <option value="Secondo">Secondo</option>
            <option value="Contorno">Contorno</option>
            <option value="Dolce">Dolce</option>
          </select>
        </label>

        {/* Difficoltà */}
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Difficoltà</span>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            <option value="Facile">Facile</option>
            <option value="Media">Media</option>
            <option value="Difficile">Difficile</option>
          </select>
        </label>

        {/* Tempo di preparazione */}
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Tempo di preparazione (minuti)</span>
          <input
            type="number"
            placeholder="Tempo di preparazione (minuti)"
            value={prepTime}
            onChange={(e) => setPrepTime(parseInt(e.target.value))}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </label>

        {/* Ricetta */}
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Ricetta / Note</span>
          <textarea
            placeholder="Inserisci la ricetta o le note..."
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
            rows={4}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
          />
        </label>

        {/* Piatto Speciale */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isSpecial}
              onChange={(e) => setIsSpecial(e.target.checked)}
              className="w-4 h-4 text-purple-600"
            />
            <span className="text-sm">Piatto speciale</span>
            <FaStar className={`text-yellow-500 ${isSpecial ? '' : 'opacity-30'}`} />
          </label>
          <div className="relative group cursor-help">
            <Info size={18} className="text-gray-500 hover:text-gray-700" />
            <div className="absolute left-6 top-0 hidden group-hover:block bg-white text-sm text-black border border-gray-300 rounded-lg shadow-lg p-2 w-64 z-10">
              Un piatto speciale non verrà incluso nel menu casuale, ma potrai aggiungerlo manualmente.
            </div>
          </div>
        </div>

        {/* Bottoni */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-purple-700 transition-colors text-sm outline-none focus:outline-none"
          >
            {buttonText}
          </button>

          <button
            onClick={onClose}
            className="bg-gray-400 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-500 transition-colors text-sm outline-none focus:outline-none"
          >
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrUpdateDishModal;