"use client";

import React, { useState } from 'react';
import { Design, GridSize } from '@/types/design';
import Image from 'next/image';
import { copyHTMLToClipboard } from '@/lib/designs/encodedDesign';

interface DesignCardProps {
  design: Design;
  size?: GridSize;
}

export default function DesignCard({ design, size = 'medium' }: DesignCardProps) {
  const [copied, setCopied] = useState(false);

  const sizeClasses = {
    small: 'row-span-1',
    medium: 'row-span-2',
    large: 'row-span-3'
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!design.encoded_code) {
      alert('No code available for this design');
      return;
    }

    try {
      // Use utility function to copy HTML to clipboard
      await copyHTMLToClipboard(design.encoded_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy code. Please try again.');
    }
  };

  return (
    <div 
      className={`
        group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm
        border border-white/10 hover:border-white/20
        transition-all duration-500 ease-out
        hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-500/10
        cursor-pointer
        ${sizeClasses[size]}
      `}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={design.thumbnail}
          alt={design.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-101"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Copy Button */}
        {design.encoded_code && (
          <button
            onClick={handleCopy}
            className="absolute top-4 left-4 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20"
            title="Copy embed code"
          >
            {copied ? (
              <span className="flex items-center gap-2 text-green-400 text-sm font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </span>
            ) : (
              <span className="flex items-center gap-2 text-white text-sm font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </span>
            )}
          </button>
        )}
        
        {/* Featured Badge */}
        {design.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-blue-500/90 backdrop-blur-sm text-xs font-semibold text-white">
            Featured
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        {/* Category Tag */}
        <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-block px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm text-xs text-white/80 font-mono uppercase tracking-wider">
            {design.category}
          </span>
        </div>

        {/* Title */}
        {/* <h3 className="text-xl font-bold text-white mb-1 transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
          {design.title}
        </h3> */}

        {/* Author & Price */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/70 font-medium">{design.author}</span>
          {/* <span className="text-white font-bold text-lg">${design.price}</span> */}
        </div>

       
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      </div>
    </div>
  );
}
