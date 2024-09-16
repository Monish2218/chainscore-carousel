export interface Chapter {
    id: number;
    name: string;
    audioUrl: string;
    description: string;
    unlockXp: string;
    bookId: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface Book {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    chapters: Chapter[];
  }

  export interface chaptersData{
    books: Book[]
  }

  export interface UserXP{
    account: {xp: number}
  }

  export interface ApiError extends Error {
    status?: number;
    info?: any;
  }