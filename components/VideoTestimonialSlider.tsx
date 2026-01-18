"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Play, X } from "lucide-react";

interface VideoTestimonial {
  src: string;
  studentName: string;
  score?: string;
}

interface VideoTestimonialSliderProps {
  videos: VideoTestimonial[];
}

export function VideoTestimonialSlider({ videos }: VideoTestimonialSliderProps) {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pauseAllVideos = () => {
    videoRefs.current.forEach((video, idx) => {
      if (video && !video.paused && playingIndex !== idx) {
        video.pause();
        video.currentTime = 0;
      }
    });
  };

  const handleVideoClick = async (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (playingIndex === index) {
      // If already playing, pause it
      video.pause();
      setPlayingIndex(null);
    } else {
      // Pause all other videos and play this one
      pauseAllVideos();
      video.muted = false;
      video.currentTime = 0;
      
      try {
        await video.play();
        setPlayingIndex(index);
      } catch (error) {
        // Play was interrupted or blocked
        console.log('Video play interrupted');
      }
    }
  };

  const handleVideoEnded = (index: number) => {
    if (playingIndex === index) {
      setPlayingIndex(null);
      const video = videoRefs.current[index];
      if (video) {
        video.currentTime = 0;
      }
    }
  };

  const handleTouchStart = (index: number) => {
    if (playingIndex === index) return;
    
    // Clear any existing timeout
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    
    // Auto play video after 1 second on touch
    touchTimeoutRef.current = setTimeout(() => {
      handleVideoClick(index);
    }, 1000);
  };

  const handleTouchEnd = () => {
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && playingIndex !== null) {
        const video = videoRefs.current[playingIndex];
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
        setPlayingIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playingIndex]);

  useEffect(() => {
    return () => {
      if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current);
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {videos.map((video, index) => (
        <div
          key={index}
          className="cursor-pointer"
          onTouchStart={() => handleTouchStart(index)}
          onTouchEnd={() => handleTouchEnd()}
          onClick={() => handleVideoClick(index)}
        >
          <Card 
            className="card-hover overflow-hidden h-[280px] md:h-[400px] hover:shadow-xl transition-shadow relative group"
          >
            <CardContent className="p-0 h-full relative">
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                src={video.src}
                muted={playingIndex !== index}
                playsInline
                preload="metadata"
                controls={playingIndex === index}
                onEnded={() => handleVideoEnded(index)}
                className="w-full h-full object-cover bg-gray-900"
              />
              
              {/* Play Icon Overlay - hide when video is playing */}
              {playingIndex !== index && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-6 h-6 md:w-8 md:h-8 text-primary ml-1" fill="currentColor" />
                  </div>
                </div>
              )}
              
              {/* Student Info Overlay - hide when playing */}
              {playingIndex !== index && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 md:p-4 pointer-events-none">
                  <h4 className="text-white font-semibold text-xs md:text-sm">{video.studentName}</h4>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
