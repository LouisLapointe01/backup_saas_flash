import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shuffle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { StudyCard } from '../components/StudyCard';
import { useFlashcardStore } from '../store/useFlashcardStore';
import { shuffleArray } from '../utils/shuffle';
import type { Flashcard } from '../types';

export function Study() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { categories, flashcards, updateFlashcard } = useFlashcardStore();

  const category = categories.find((c) => c.id === categoryId);

  const [studyCards, setStudyCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filterCards = (cards: Flashcard[]): Flashcard[] => {
    if (cards.length === 0) return cards;
    const allTen = cards.every((card) => card.proficiency === 10);
    return allTen ? cards : cards.filter((card) => card.proficiency < 10);
  };

  useEffect(() => {
    if (!category) {
      navigate('/categories');
    }
  }, [category, navigate]);

  useEffect(() => {
    const categoryCards = flashcards.filter((f) => f.categoryId === categoryId);
    const displayedCards = filterCards(categoryCards);
    setStudyCards(displayedCards);
    setCurrentIndex(0);
  }, [categoryId, flashcards]);

  if (!category || studyCards.length === 0) {
    return (
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">No flashcards found</h1>
        <p className="mb-8 text-gray-600">
          Add some flashcards to this category to start studying.
        </p>
        <Button onClick={() => navigate('/categories')}>Back to Categories</Button>
      </div>
    );
  }

  const handleUpdateProficiency = (id: string, proficiency: number) => {
    // Met à jour dans le store
    updateFlashcard(id, { proficiency, lastReviewed: new Date() });

    // Met à jour localement
    let updatedCards = studyCards.map(card =>
      card.id === id ? { ...card, proficiency } : card
    );
    updatedCards = filterCards(updatedCards);
    setStudyCards(updatedCards);

    // Attendre ~800ms pour changer la carte, simulant l'animation de flip
    setTimeout(() => {
      let newIndex = currentIndex;
      if (updatedCards.length > 0) {
        if (newIndex >= updatedCards.length) {
          newIndex = 0;
        } else {
          if (newIndex < updatedCards.length - 1) {
            newIndex = newIndex + 1;
          } else {
            newIndex = 0;
          }
        }
      } else {
        newIndex = 0;
      }

      setCurrentIndex(newIndex);
    }, 800);
  };

  const handleShuffle = () => {
    const shuffled = shuffleArray(studyCards);
    const displayedCards = filterCards(shuffled);
    setStudyCards(displayedCards);
    setCurrentIndex(0);
  };

  const handleReset = () => {
    let resetCards = studyCards.map(card => ({ ...card, proficiency: 0 }));
    resetCards.forEach(card => {
      updateFlashcard(card.id, { proficiency: 0, lastReviewed: new Date() });
    });
    resetCards = filterCards(resetCards);
    setStudyCards(resetCards);
    setCurrentIndex(0);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate('/categories')}
            className="space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Categories</span>
          </Button>
          <h1 className="text-2xl font-bold">{category.name}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleShuffle} variant="secondary" className="space-x-2">
            <Shuffle className="h-4 w-4" />
            <span>Shuffle Cards</span>
          </Button>
          <Button onClick={handleReset} variant="secondary" className="space-x-2">
            <span>Reset</span>
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="mb-4 flex justify-between text-sm text-gray-600">
            <span>
              Card {currentIndex + 1} of {studyCards.length}
            </span>
            <span>
              Proficiency: {studyCards[currentIndex].proficiency}/5
            </span>
          </div>

          <StudyCard
            flashcard={studyCards[currentIndex]}
            onUpdateProficiency={handleUpdateProficiency}
          />

          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Study Progress</span>
              <span className="text-sm text-gray-600">
                {studyCards.filter((card) => card.proficiency >= 4).length} of{' '}
                {studyCards.length} mastered
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{
                  width: `${(studyCards.filter((card) => card.proficiency >= 4).length / studyCards.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
