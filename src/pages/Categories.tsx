import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { CategoryCard } from '../components/CategoryCard';
import { FlashcardForm } from '../components/FlashcardForm';
import { useFlashcardStore } from '../store/useFlashcardStore';
import { useAuthStore } from '../store/useAuthStore';

export function Categories() {
  const { user } = useAuthStore();
  const { categories, flashcards, addCategory, deleteCategory, addFlashcard } = useFlashcardStore();
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAddCategory = () => {
    if (user && newCategoryName.trim()) {
      addCategory({
        userId: user.id,
        name: newCategoryName.trim(),
        description: newCategoryDescription.trim(),
      });
      setNewCategoryName('');
      setNewCategoryDescription('');
      setShowNewCategory(false);
    }
  };

  const handleAddFlashcard = (front: string, back: string) => {
    if (selectedCategory) {
      addFlashcard({
        categoryId: selectedCategory,
        front,
        back,
        proficiency: 0,
      });
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  const selectedCategoryData = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Flashcard Categories</h1>
        <Button onClick={() => setShowNewCategory(true)} className="space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Category</span>
        </Button>
      </div>

      {showNewCategory && (
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Create New Category</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNewCategory(false)}
              className="rounded-full p-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <Input
                id="name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <Input
                id="description"
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <Button onClick={handleAddCategory}>Create Category</Button>
              <Button
                variant="outline"
                onClick={() => setShowNewCategory(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            flashcardCount={flashcards.filter((f) => f.categoryId === category.id).length}
            onDelete={deleteCategory}
            onAddFlashcard={() => setSelectedCategory(category.id)}
            isSelected={selectedCategory === category.id}
          />
        ))}
      </div>

      {selectedCategory && (
        <div className="relative mt-8 rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Add New Flashcard to {selectedCategoryData?.name}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="rounded-full p-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <FlashcardForm
            categoryId={selectedCategory}
            onSubmit={handleAddFlashcard}
          />
          {showSuccessMessage && (
            <div className="absolute bottom-4 right-4 rounded-lg bg-green-100 px-4 py-2 text-green-700">
              Flashcard added successfully!
            </div>
          )}
        </div>
      )}
    </div>
  );
}