import React, { useState } from 'react';
import { TransactionFormData } from '../types';
import { X } from 'lucide-react';

interface TransactionFormProps {
  onSave: (data: TransactionFormData) => void;
  onCancel: () => void;
}

const CATEGORIES = [
  'Alimentation',
  'Transport',
  'Logement',
  'Loisirs',
  'Santé',
  'Shopping',
  'Salaire',
  'Investissements',
  'Autres',
];

export function TransactionForm({ onSave, onCancel }: TransactionFormProps) {
  const [formData, setFormData] = useState<TransactionFormData>({
    description: '',
    amount: 0,
    category: CATEGORIES[0],
    type: 'expense',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <div className="mt-1 flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="expense"
              checked={formData.type === 'expense'}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, type: 'expense' }))
              }
              className="mr-2"
            />
            Dépense
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="income"
              checked={formData.type === 'income'}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, type: 'income' }))
              }
              className="mr-2"
            />
            Revenu
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Montant</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={formData.amount}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              amount: parseFloat(e.target.value) || 0,
            }))
          }
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Catégorie
        </label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}