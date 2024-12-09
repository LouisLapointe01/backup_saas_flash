import { useState, FormEvent } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface FlashcardFormProps {
  categoryId: string;
  onSubmit: (front: string, back: string) => void;
}

export function FlashcardForm({ categoryId, onSubmit }: FlashcardFormProps) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!front.trim() || !back.trim()) {
      setError('Both front and back of the flashcard are required');
      return;
    }

    onSubmit(front.trim(), back.trim());
    setFront('');
    setBack('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="front" className="block text-sm font-medium text-gray-700 mb-2">
          Front (Question)
        </label>
        <Input
          id="front"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          placeholder="Enter the question or term"
          required
        />
      </div>
      <div>
        <label htmlFor="back" className="block text-sm font-medium text-gray-700 mb-2">
          Back (Answer)
        </label>
        <Input
          id="back"
          value={back}
          onChange={(e) => setBack(e.target.value)}
          placeholder="Enter the answer or definition"
          required
        />
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      <div className="flex space-x-4">
        <Button type="submit">Add Flashcard</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setFront('');
            setBack('');
            setError('');
          }}
        >
          Clear
        </Button>
      </div>
    </form>
  );
}