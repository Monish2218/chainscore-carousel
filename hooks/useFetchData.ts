import useSWR from 'swr';
import { useCarouselStore } from '@/store/carouselStore';
import { ApiError, Book, Chapter } from '@/types';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  
  if (!response.ok) {
    const error: ApiError = new Error('An error occurred while fetching the data.');
    error.status = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
};

export const useFetchData = () => {
  const { setUserXP, setChapters } = useCarouselStore();

  // Fetch user XP
  const {error: xpError, isLoading: isUserLoading } = useSWR('https://mocki.io/v1/9859978d-3317-4920-aa81-f55c2045f6b6', fetcher, {
    onSuccess: (data) => setUserXP(data.account.xp),
    onError: (error) => console.error('XP data fetch error:', error),
  });

  // Fetch chapters data
  const {error: chaptersError, isLoading: isChapterLoading } = useSWR('https://mocki.io/v1/84c8c12a-4ee4-472b-b51f-a020823b2925', fetcher, {
    onSuccess: (data) => {
      const CHAPTERS = data.books.map((book: Book)=>book.chapters).flat().sort((a:Chapter,b:Chapter)=>a.id-b.id);
      setChapters(CHAPTERS)
    },
    onError: (error) => console.error('Chapters data fetch error:', error),

  });

  const isLoading = isUserLoading || isChapterLoading;
  const errors: ApiError[] = [];

  if (xpError) errors.push(xpError);
  if (chaptersError) errors.push(chaptersError);

  return {
    isLoading,
    errors: errors.length > 0 ? errors : null
  };
};