import React from 'react';
import { Note } from '../types';
import { Edit2, Trash2, Clock } from 'lucide-react';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const formattedDate = new Date(note.updatedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div
      className="rounded-lg p-4 shadow-md transition-all hover:shadow-lg"
      style={{ backgroundColor: note.color + '20' }}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(note)}
            className="rounded p-1 text-gray-600 hover:bg-gray-100"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="rounded p-1 text-gray-600 hover:bg-gray-100"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <p className="mt-2 text-gray-600 whitespace-pre-wrap">{note.content}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {note.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center text-xs text-gray-500">
        <Clock size={12} className="mr-1" />
        {formattedDate}
      </div>
    </div>
  );
}