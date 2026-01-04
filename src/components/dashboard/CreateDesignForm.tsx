"use client";

import React, { useState } from 'react';
import { createDesign } from '@/lib/designs/createDesign';
import { CreateDesignInput } from '@/types/design';
import { extractHTMLFromClipboard, encodeDesignData } from '@/lib/designs/encodedDesign';

export default function CreateDesignForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [encodedCode, setEncodedCode] = useState('');
  const [pasteDetected, setPasteDetected] = useState(false);

  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    
    // Use utility function to extract HTML from clipboard
    const htmlContent = extractHTMLFromClipboard(e.clipboardData);
    
    if (htmlContent) {
      setEncodedCode(htmlContent);
      setPasteDetected(true);
      setTimeout(() => setPasteDetected(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    
    // Validate and encode the design data
    try {
      const validatedCode = encodeDesignData(encodedCode);
      
      const input: CreateDesignInput = {
        title: formData.get('title') as string,
        description: formData.get('description') as string || undefined,
        thumbnail: formData.get('thumbnail') as string,
        category: 'Design',
        author: 'Anonymous',
        price: 0,
        tags: [],
        featured: false,
      };

      const result = await createDesign(input, validatedCode);

      if (result.success) {
        setMessage({ type: 'success', text: 'Design created successfully! Check the marketplace.' });
        (e.target as HTMLFormElement).reset();
        setEncodedCode('');
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to create design' });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Invalid design code' 
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Create New Design</h2>
          <p className="text-muted-foreground">Add your Figma design to the marketplace</p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${
            message.type === 'success' 
              ? 'bg-green-500/10 text-green-500 border-green-500/20' 
              : 'bg-red-500/10 text-red-500 border-red-500/20'
          }`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{message.type === 'success' ? '✓' : '✕'}</span>
              <span>{message.text}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Design Name */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold mb-2">
              Design Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="e.g., Dashboard Analytics UI"
            />
          </div>

          {/* Thumbnail URL */}
          <div>
            <label htmlFor="thumbnail" className="block text-sm font-semibold mb-2">
              Thumbnail Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="thumbnail"
              name="thumbnail"
              required
              className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="https://images.unsplash.com/photo-..."
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Paste a direct image URL (Unsplash, Imgur, etc.)
            </p>
          </div>

          {/* Encoded Figma Code */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="encoded_code" className="block text-sm font-semibold">
                Encoded Figma Code <span className="text-red-500">*</span>
              </label>
              {pasteDetected && (
                <span className="text-xs text-green-500 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  HTML detected!
                </span>
              )}
            </div>
            <div className="relative">
              <textarea
                id="encoded_code"
                name="encoded_code"
                value={encodedCode}
                onChange={(e) => setEncodedCode(e.target.value)}
                onPaste={handlePaste}
                required
                rows={12}
                className={`w-full px-4 py-3 rounded-lg bg-background border transition-all font-mono text-sm ${
                  encodedCode ? 'border-primary' : 'border-border'
                } focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="Paste your Figma embed code here (Ctrl+V / Cmd+V)...

The form will automatically extract HTML content from your clipboard.

Example:
<iframe style=&quot;border: 1px solid rgba(0, 0, 0, 0.1);&quot; width=&quot;800&quot; height=&quot;450&quot; src=&quot;https://www.figma.com/embed?embed_host=share&url=...&quot; allowfullscreen></iframe>"
              />
              {encodedCode && (
                <div className="absolute top-2 right-2">
                  <button
                    type="button"
                    onClick={() => setEncodedCode('')}
                    className="p-1 rounded-md bg-background/80 hover:bg-background border border-border text-muted-foreground hover:text-foreground transition-colors"
                    title="Clear"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              💡 <strong>Tip:</strong> Copy embed code from Figma (Share → Copy embed code) and paste it here. The form will automatically extract the HTML.
            </p>
            {encodedCode && (
              <p className="mt-2 text-xs text-green-600">
                ✓ Code captured ({encodedCode.length} characters)
              </p>
            )}
          </div>

          {/* Description (Optional) */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold mb-2">
              Description <span className="text-muted-foreground text-xs">(Optional)</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Brief description of your design..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Design...
                </span>
              ) : (
                '✨ Create Design'
              )}
            </button>
          </div>
        </form>

        {/* Helper Info */}
        <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
          <h3 className="text-sm font-semibold mb-2">💡 Quick Tips</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Use high-quality thumbnail images (recommended: 800x600px or larger)</li>
            <li>• Figma embed codes start with <code className="px-1 py-0.5 bg-background rounded">&lt;iframe...</code></li>
            <li>• Your design will appear at the top of the marketplace</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
