import React from 'react';
import Modal from './Modal';

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, message, onConfirm, onCancel }) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Conferma Eliminazione">
      <p className="text-gray-800 mb-6">{message}</p>
      <div className="flex justify-end gap-4">
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          onClick={onCancel}
        >
          Annulla
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          onClick={onConfirm}
        >
          Elimina
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;