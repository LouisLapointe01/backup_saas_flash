import { create } from 'zustand';
import type { Category, Flashcard } from '../types';

interface FlashcardState {
  categories: Category[];
  flashcards: Flashcard[];
  addCategory: (category: Omit<Category, 'id' | 'createdAt'>) => void;
  addFlashcard: (flashcard: Omit<Flashcard, 'id' | 'createdAt'>) => void;
  deleteCategory: (id: string) => void;
  deleteFlashcard: (id: string) => void;
  updateFlashcard: (id: string, data: Partial<Flashcard>) => void;
}

export const useFlashcardStore = create<FlashcardState>((set) => ({
  categories: [],
  flashcards: [],
  addCategory: (category) => {
    set((state) => ({
      categories: [
        ...state.categories,
        {
          ...category,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
        },
      ],
    }));
  },
  addFlashcard: (flashcard) => {
    set((state) => ({
      flashcards: [
        ...state.flashcards,
        {
          ...flashcard,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
        },
      ],
    }));
  },
  deleteCategory: (id) => {
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
      flashcards: state.flashcards.filter((f) => f.categoryId !== id),
    }));
  },
  deleteFlashcard: (id) => {
    set((state) => ({
      flashcards: state.flashcards.filter((f) => f.id !== id),
    }));
  },
  updateFlashcard: (id, data) => {
    set((state) => ({
      flashcards: state.flashcards.map((f) =>
        f.id === id ? { ...f, ...data } : f
      ),
    }));
  },
}));