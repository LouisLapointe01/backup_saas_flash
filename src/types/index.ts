export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  description: string;
  createdAt: Date;
}

export interface Flashcard {
  id: string;
  categoryId: string;
  front: string;
  back: string;
  lastReviewed?: Date;
  proficiency: number; // 0-5 scale
  createdAt: Date;
}