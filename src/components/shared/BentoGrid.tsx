"use client";

import React from 'react';
import { Design } from '@/types/design';
import DesignCard from './DesignCard';

interface BentoGridProps {
  designs: Design[];
}

export default function BentoGrid({ designs }: BentoGridProps) {
  // Assign sizes to create visual variety in the Bento grid
  const getCardSize = (index: number, design: Design) => {
    // Featured items get larger cards
    if (design.featured) return 'large';
    
    // Create a pattern: medium, small, small, medium, small, medium...
    const pattern = [2, 1, 1, 2, 1, 2];
    const sizeIndex = pattern[index % pattern.length];
    
    if (sizeIndex === 1) return 'small';
    if (sizeIndex === 2) return 'medium';
    return 'medium';
  };

  return (
    <div className="w-full">
      {/* 4-Column Bento Grid */}
      <div 
        className="
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          auto-rows-[200px]
        "
        style={{
          gridAutoFlow: 'dense'
        }}
      >
        {designs.map((design, index) => (
          <DesignCard
            key={design.id}
            design={design}
            size={getCardSize(index, design)}
          />
        ))}
      </div>

      {/* Empty State */}
      {designs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-2xl font-bold text-white/80 mb-2">No designs found</h3>
          <p className="text-white/50">Try adjusting your filters or check back later</p>
        </div>
      )}
    </div>
  );
}
