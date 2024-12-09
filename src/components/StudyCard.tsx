import { useState } from 'react';
import { Button } from './ui/Button';
import type { Flashcard } from '../types';

interface StudyCardProps {
  flashcard: Flashcard;
  onUpdateProficiency: (id: string, proficiency: number) => void;
  onNextCard: () => void;
}

export function StudyCard({
  flashcard,
  onUpdateProficiency,
  onNextCard,
}: StudyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleGotIt = () => {
    const newProficiency = Math.min(10, flashcard.proficiency + 1);
    onUpdateProficiency(flashcard.id, newProficiency);

    // Retourner la carte côté "Question" et démarrer la transition
    setIsFlipped(false);
    setIsTransitioning(true);
  };

  const handleStillLearning = () => {
    onUpdateProficiency(flashcard.id, flashcard.proficiency);

    // Retourner la carte côté "Question" et démarrer la transition
    setIsFlipped(false);
    setIsTransitioning(true);
  };

  const handleTransitionEnd = () => {
    if (isTransitioning) {
      setIsTransitioning(false);
      onNextCard();
    }
  };

  return (
    <div
      className="mx-auto max-w-lg perspective-1000"
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        className={`relative min-h-[300px] transition-transform duration-700 transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          transformStyle: 'preserve-3d', // Nécessaire pour les flips 3D
        }}
      >
        {/* Face Question */}
        <div
          className="absolute h-full w-full rounded-xl bg-green-100 p-8 shadow-lg"
          style={{
            backfaceVisibility: 'hidden', // Cache la face arrière lorsqu'elle n'est pas visible
            transform: 'rotateY(0deg)', // Face avant sans rotation
          }}
        >
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h3 className="mb-4 text-xl font-semibold">Question</h3>
            <p className="text-lg">{flashcard.front}</p>
          </div>
        </div>

        {/* Face Answer */}
        <div
          className="absolute h-full w-full rounded-xl bg-orange-100 p-8 shadow-lg"
          style={{
            backfaceVisibility: 'hidden', // Cache la face arrière lorsqu'elle n'est pas visible
            transform: 'rotateY(180deg)', // Aligne la face arrière avec la rotation
          }}
        >
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h3 className="mb-4 text-xl font-semibold">Answer</h3>
            <p className="text-lg">{flashcard.back}</p>
          </div>
        </div>
      </div>

      {/* Statut : Réussi X sur 10 fois */}
      <div className="mt-6 text-center text-lg font-semibold">
        Réussi {flashcard.proficiency} sur 10 fois
      </div>

      {isFlipped && (
        <div className="mt-6 flex justify-center space-x-4 relative z-10">
          <Button
            variant="outline"
            onClick={handleStillLearning}
            className="text-red-600 hover:bg-red-50"
          >
            Still Learning
          </Button>
          <Button
            onClick={handleGotIt}
            className="bg-green-600 hover:bg-green-700"
          >
            Got It!
          </Button>
        </div>
      )}
    </div>
  );
}
