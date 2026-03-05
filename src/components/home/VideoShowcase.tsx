"use client";

import { useState } from "react";

interface Video {
  title: string;
  thumbnail: string;
  embedId: string;
}

const VIDEOS: Video[] = [
  {
    title: "If Apple made a robot vacuum, this would be it!",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=225&fit=crop",
    embedId: "dQw4w9WgXcQ",
  },
  {
    title: "Step into the Future with eufy",
    thumbnail: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=225&fit=crop",
    embedId: "dQw4w9WgXcQ",
  },
  {
    title: "Capture Every Moment with eufy",
    thumbnail: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=225&fit=crop",
    embedId: "dQw4w9WgXcQ",
  },
  {
    title: "The robot vacuum that actually excites me",
    thumbnail: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=225&fit=crop",
    embedId: "dQw4w9WgXcQ",
  },
];

export function VideoShowcase() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section className="py-16 bg-eufy-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-eufy-dark tracking-tight mb-8 text-center">
          Watch eufy in Action
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VIDEOS.map((video) => (
            <div key={video.title} className="group">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-eufy-dark mb-3">
                {playingId === video.embedId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.embedId}?autoplay=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                ) : (
                  <button
                    onClick={() => setPlayingId(video.embedId)}
                    className="relative w-full h-full"
                    aria-label={`Play video: ${video.title}`}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-eufy-dark ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </button>
                )}
              </div>
              <h3 className="text-sm font-medium text-eufy-text line-clamp-2 leading-snug">
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
