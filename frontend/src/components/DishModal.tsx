import React, { useState } from 'react';

interface DishModalProps {
  dish: any;
  onClose: () => void;
  onEditDish: (dish: any) => void;
  onDeleteDish: (dish: any) => void;
}

const DishModal: React.FC<DishModalProps> = ({ dish, onClose, onEditDish, onDeleteDish }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // Stato per mostrare il prompt

  if (!dish) return null;

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
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      }}>
        <h4 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>{dish.name}</h4>
        <p style={{ marginBottom: '0.5rem' }}><strong>Categoria:</strong> {dish.category}</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>Difficoltà:</strong> {dish.difficulty}</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>Tempo di preparazione:</strong> {dish.prepTime} min</p>

        <p><strong>Ricetta:</strong></p>
        <div style={{
          flexGrow: 1,
          overflowY: 'auto',
          marginBottom: '1rem',
          paddingRight: '0.5rem',
        }}>
          <p style={{ marginTop: '0.5rem' }}>{dish.notes || 'Nessuna ricetta disponibile'}</p>
        </div>

        {/* Se l'utente ha cliccato su "Elimina", mostra il prompt di conferma */}
        {showConfirmDelete ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            marginTop: 'auto',
            paddingTop: '1rem',
          }}>
            <p style={{ fontWeight: 'bold', color: 'red' }}>Sei sicuro di voler eliminare questo piatto?</p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              width: '100%',
            }}>
              <button
                onClick={() => onDeleteDish(dish)}
                className="bg-red-600 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-red-700 transition-colors text-sm outline-none focus:outline-none"
              >
                Conferma
              </button>

              <button
                onClick={() => setShowConfirmDelete(false)}
                className="bg-gray-400 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-500 transition-colors text-sm outline-none focus:outline-none"
              >
                Annulla
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: 'auto',
            paddingTop: '1rem'
          }}>
            <button
              onClick={() => onEditDish(dish)}
              className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-purple-700 transition-colors text-sm outline-none focus:outline-none"
            >
              Modifica
            </button>

            <button
              onClick={() => setShowConfirmDelete(true)} // Mostra il prompt di conferma
              className="bg-red-600 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-red-700 transition-colors text-sm outline-none focus:outline-none"
            >
              Elimina
            </button>

            <button
              onClick={onClose}
              className="bg-gray-400 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-500 transition-colors text-sm outline-none focus:outline-none"
            >
              Chiudi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DishModal;