import { Link } from 'react-router-dom';
import { Brain, BookOpen, Trophy } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/useAuthStore';

export function Home() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">
          Master Any Subject with FlashMaster
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          Create, study, and track your progress with our intelligent flashcard system
        </p>
        {!isAuthenticated && (
          <div className="mb-12 space-x-4">
            <Link to="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Brain className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Smart Learning</h3>
          <p className="text-gray-600">
            Our spaced repetition system helps you learn efficiently by focusing on
            cards you need to review most.
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <BookOpen className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Organized Study</h3>
          <p className="text-gray-600">
            Create categories and organize your flashcards to build a comprehensive
            study system.
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
            <Trophy className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Track Progress</h3>
          <p className="text-gray-600">
            Monitor your learning progress and celebrate your achievements as you
            master each subject.
          </p>
        </div>
      </div>
    </div>
  );
}