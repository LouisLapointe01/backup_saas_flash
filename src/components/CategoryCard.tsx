import { Folder, ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Category } from '../types';
import { Button } from './ui/Button';

interface CategoryCardProps {
  category: Category;
  flashcardCount: number;
  onDelete: (id: string) => void;
  onAddFlashcard: () => void;
  isSelected: boolean;
}

export function CategoryCard({
  category,
  flashcardCount,
  onDelete,
  onAddFlashcard,
  isSelected,
}: CategoryCardProps) {
  return (
    <div className={`rounded-lg bg-white p-6 shadow-md transition-shadow ${
      isSelected ? 'ring-2 ring-blue-500' : ''
    }`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <Folder className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold">{category.name}</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(category.id)}
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          Delete
        </Button>
      </div>
      <p className="mb-4 text-gray-600">{category.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {flashcardCount} {flashcardCount === 1 ? 'card' : 'cards'}
        </span>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onAddFlashcard}
            className="space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add Card</span>
          </Button>
          <Link to={`/study/${category.id}`}>
            <Button size="sm" className="space-x-1">
              <span>Study</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}