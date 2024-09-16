'use client'

import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { Button } from "@/components/ui/button"
import { ThreeDCard } from '@/components/Card'
import { useCarouselStore } from '@/store/carouselStore'
import { useFetchData } from '@/hooks/useFetchData'

const Carousel = () => {
  
  const { userXP, chapters } = useCarouselStore();
  const { isLoading, errors} = useFetchData();
  const [selectedBook, setSelectedBook] = useState(1);
  const [shakingCard, setShakingCard] = useState<number | null>(null);
  const CHAPTERS_PER_BOOK = 7
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: false,
      dragFree: true,
      align: 'start',
      containScroll: 'trimSnaps',
    },
    [WheelGesturesPlugin()]
  )
  
  const scrollToBook = (bookNumber: number) => {
    if (emblaApi) {
      emblaApi.scrollTo((bookNumber - 1) * CHAPTERS_PER_BOOK)
    }
  }
  
  const handleCardClick = (index: number) => {
    if ( isNaN(Number(chapters[index].unlockXp)) || Number(chapters[index].unlockXp) > Number(userXP)) {
      setShakingCard(index)
      setTimeout(() => setShakingCard(null), 500) // Remove shake class after animation
    }
  }

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        const currentIndex = emblaApi.selectedScrollSnap()
        setSelectedBook(Math.floor(currentIndex / CHAPTERS_PER_BOOK) + 1)
      })
    }
  }, [emblaApi])

  //Error Handling
  if (errors) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> Unable to load carousel data.</span>
        <ul className="list-disc list-inside mt-2">
          {errors.map((error, index) => (
            <li key={index}>
              {error.message} {error.status && `(Status: ${error.status})`}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="space-y-1 dark:bg-black h-full">
      {/* Shake animation Styles */}
      <style jsx global>{`
         @keyframes shake {
          0% { transform: translateX(0); }
          10%, 90% { transform: translateX(-10px); }
          20%, 80% { transform: translateX(10px); }
          30%, 50%, 70% { transform: translateX(-10px); }
          40%, 60% { transform: translateX(10px); }
          100% { transform: translateX(0); }
        }
        .shake {
          animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
      <div className="overflow-hidden" ref={emblaRef} aria-label="Image Carousel" aria-roledescription="carousel">
        {isLoading && <div>Loading....</div>}
        {(!isLoading) && <div className="flex -ml-3">
          {chapters.map((chapter, index) => (
            <div key={index} className={`flex-[0_0_300px] min-w-0 pl-2 ${shakingCard === index ? 'shake' : ''}`} onClick={() => handleCardClick(index) } aria-hidden>
              <ThreeDCard imageUrl={chapter.imageUrl} name={chapter.name} unlockXp={chapter.unlockXp} />
            </div>
          ))}
        </div>}
      </div>
      <div className="flex justify-center space-x-4 pb-10">
        {[1, 2, 3].map((bookNumber) => (
          <Button
            key={bookNumber}
            onClick={() => scrollToBook(bookNumber)}
            variant={selectedBook === bookNumber ? "default" : "outline"}
            className='dark:text-slate-600'
            aria-label={`Book${bookNumber} Button`}
          >
            Book {bookNumber}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Carousel;
