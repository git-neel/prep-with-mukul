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
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const previewTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const stopVideoPreview = (index: number) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index]!.pause();
      videoRefs.current[index]!.currentTime = 0;
    }
  };

  const startVideoPreview = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.play().catch(() => {
        // Auto-play might be blocked, ignore error
      });
      
      // Stop preview after 7 seconds
      if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current);
      previewTimeoutRef.current = setTimeout(() => {
        if (video && !video.paused) {
          video.pause();
        }
      }, 7000);
    }
  };

  const pauseAllVideos = () => {
    videoRefs.current.forEach((video) => {
      if (video && !video.paused) {
        video.pause();
        video.currentTime = 0;
      }
    });
  };

  const handleVideoClick = (src: string, index: number) => {
    pauseAllVideos();
    stopVideoPreview(index);
    setSelectedVideo(src);
  };

  const closeModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
    setSelectedVideo(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onMouseEnter={() => {
              setHoveredIndex(index);
              startVideoPreview(index);
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              stopVideoPreview(index);
            }}
          >
            <Card 
              className="card-hover overflow-hidden h-[400px] hover:shadow-xl transition-shadow relative group"
              onClick={() => handleVideoClick(video.src, index)}
            >
              <CardContent className="p-0 h-full relative">
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={video.src}
                  muted={hoveredIndex !== index}
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover bg-gray-900"
                />
                
                {/* Play Icon Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity ${hoveredIndex === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                  </div>
                </div>
                
                {/* Student Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h4 className="text-white font-semibold text-sm">{video.studentName}</h4>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              src={selectedVideo}
              controls
              autoPlay
              className="w-full rounded-lg shadow-2xl"
            />
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white flex items-center justify-center transition-colors"
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
