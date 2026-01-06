"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

interface ImageSliderProps {
  images: Array<{ src: string; caption: string }>;
}

export function ImageSlider({ images }: ImageSliderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 380;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      resetAutoScroll();
    }
  };

  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    autoScrollIntervalRef.current = setInterval(() => {
      if (containerRef.current) {
        const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
        if (containerRef.current.scrollLeft >= maxScroll) {
          containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          containerRef.current.scrollBy({ left: 380, behavior: 'smooth' });
        }
      }
    }, 4000);
  };

  const resetAutoScroll = () => {
    if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    startAutoScroll();
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scroll('left');
      if (e.key === 'ArrowRight') scroll('right');
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className="relative">
        <div
          ref={containerRef}
          className="overflow-x-auto scroll-smooth scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => autoScrollIntervalRef.current && clearInterval(autoScrollIntervalRef.current)}
          onMouseLeave={startAutoScroll}
        >
          <div className="flex gap-6 py-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[340px] cursor-pointer"
              >
                <Card 
                  className="card-hover overflow-hidden h-[320px] hover:shadow-xl transition-shadow"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="h-[260px] flex items-center justify-center bg-gray-50">
                      <img 
                        src={image.src} 
                        alt={image.caption}
                        loading="lazy"
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <div className="h-[60px] p-3 bg-white border-t flex items-center">
                      <p className="text-xs text-gray-600 line-clamp-2">{image.caption}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Full view"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
