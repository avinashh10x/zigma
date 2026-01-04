import BentoGrid from '@/components/shared/BentoGrid';
import { listDesigns } from '@/lib/designs/listDesigns';

export default async function DesignsPage() {
  const designs = await listDesigns();

  return (
    <div className="min-h-screen bg-background text-foreground">
     
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
        {/* Filter Bar Placeholder - For future implementation */}
        <div className="mb-8 flex items-center justify-between">
          <div className="text-sm text-white/50 font-mono">
            Showing <span className="text-white font-semibold">{designs.length}</span> designs
          </div>
          <div className="text-sm text-white/40 font-mono">
            Filters coming soon...
          </div>
        </div>

        {/* Bento Grid */}
        <BentoGrid designs={designs} />
      </div>

    </div>
  );
}
