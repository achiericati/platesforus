import React from 'react';

interface DishModalProps {
  dish: any;
  onClose: () => void;
  onEdit: (dish: any) => void;
}

const DishModal: React.FC<DishModalProps> = ({ dish, onClose, onEdit }) => {
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
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <h4 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>{dish.name}</h4>
        <p style={{ marginBottom: '0.5rem' }}><strong>Categoria:</strong> {dish.category}</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>Difficoltà:</strong> {dish.difficulty}</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>Tempo di preparazione:</strong> {dish.prepTime} min</p>

        <p><strong>Ricetta:</strong></p>
        <div style={{
          flexGrow: 1,
          overflowY: 'auto',
          maxHeight: '60vh',
          marginBottom: '1rem',
          paddingRight: '0.5rem'
        }}>
          
          <p style={{ marginTop: '0.5rem' }}>{dish.notes || 'Nessuna ricetta disponibile'}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button
            style={{ marginRight: '5px' }}
            onClick={() => onEdit(dish)}
            className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-purple-700 transition-colors text-sm outline-none focus:outline-none"
          >
            Modifica
          </button>

          <button
            onClick={onClose}
            className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-600 transition-colors text-sm outline-none focus:outline-none"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishModal;