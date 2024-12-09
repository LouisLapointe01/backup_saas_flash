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
  const [isTextHidden, setIsTextHidden] = useState(false);

  const handleFlip = () => {
    setIsTextHidden(true); // Cache le texte avant le flip
    setTimeout(() => {
      setIsFlipped(!isFlipped); // Effectue le flip
      setTimeout(() => {
        setIsTextHidden(false); // Réaffiche le texte après le flip
      }, 200); // Durée de l'animation d'opacité
    }, 200); // Durée de l'animation d'opacité
  };

  const handleGotIt = () => {
    const newProficiency = Math.min(10, flashcard.proficiency + 1);
    onUpdateProficiency(flashcard.id, newProficiency);

    setIsTextHidden(true);
    setTimeout(() => {
      setIsFlipped(false);
      setIsTransitioning(true);
    }, 300);
  };

  const handleStillLearning = () => {
    onUpdateProficiency(flashcard.id, flashcard.proficiency);

    setIsTextHidden(true);
    setTimeout(() => {
      setIsFlipped(false);
      setIsTransitioning(true);
    }, 300);
  };

  const handleTransitionEnd = () => {
    if (isTransitioning) {
      setIsTransitioning(false);
      setIsTextHidden(false);
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
        onClick={handleFlip}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Face Question */}
        <div
          className="absolute h-full w-full rounded-xl pastel-orange p-8 shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
          }}
        >
          <div
            className={`flex h-full flex-col items-center justify-center text-center card-text ${
              isTextHidden ? 'card-text-hidden' : ''
            }`}
          >
            <h3 className="mb-4 text-xl font-semibold">Question</h3>
            <p className="text-lg">{flashcard.front}</p>
          </div>
        </div>

        {/* Face Answer */}
        <div
          className="absolute h-full w-full rounded-xl pastel-green p-8 shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div
            className={`flex h-full flex-col items-center justify-center text-center card-text ${
              isTextHidden ? 'card-text-hidden' : ''
            }`}
          >
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
