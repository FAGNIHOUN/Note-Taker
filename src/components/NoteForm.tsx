import React, { useState, useEffect } from 'react';
import { Note, NoteFormData } from '../types';
import { X } from 'lucide-react';

interface NoteFormProps {
  note?: Note;
  onSave: (data: NoteFormData) => void;
  onCancel: () => void;
}

const COLORS = ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6'];

export function NoteForm({ note, onSave, onCancel }: NoteFormProps) {
  const [formData, setFormData] = useState<NoteFormData>({
    title: note?.title || '',
    content: note?.content || '',
    tags: note?.tags || [],
    color: note?.color || COLORS[0],
  });
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Titre"
        value={formData.title}
        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
        className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        required
      />
      <textarea
        placeholder="Contenu de la note..."
        value={formData.content}
        onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
        className="h-32 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        required
      />
      <div>
        <input
          type="text"
          placeholder="Ajouter des tags (Entrée pour valider)"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={addTag}
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center rounded-full bg-gray-200 px-3 py-1 text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 rounded-full p-1 hover:bg-gray-300"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Couleur :</label>
        <div className="mt-2 flex gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, color }))}
              className={`h-8 w-8 rounded-full border-2 ${
                formData.color === color ? 'border-gray-600' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
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