
export function extractHTMLFromClipboard(clipboardData: DataTransfer): string {
  let htmlContent = clipboardData.getData('stringtext/html');
  
  if (!htmlContent) {
    htmlContent = clipboardData.getData('text/html');
  }
  
  if (!htmlContent) {
    htmlContent = clipboardData.getData('text/plain');
  }
  
  return htmlContent || '';
}

export async function copyHTMLToClipboard(htmlContent: string): Promise<void> {
  if (!htmlContent) {
    throw new Error('No content to copy');
  }

  try {
    const plainText = extractPlainTextFromHTML(htmlContent);
    
    const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
    const textBlob = new Blob([plainText], { type: 'text/plain' });
    
    const clipboardItem = new ClipboardItem({
      'text/html': htmlBlob,      // Rich format (invisible)
      'text/plain': textBlob,     // Plain format (visible)
    });
    
    await navigator.clipboard.write([clipboardItem]);
  } catch (err) {
    // Fallback: Use simple text copy for older browsers
    console.warn('ClipboardItem API failed, falling back to writeText:', err);
    const plainText = extractPlainTextFromHTML(htmlContent);
    await navigator.clipboard.writeText(plainText);
  }
}

function extractPlainTextFromHTML(html: string): string {
  return 'Figma Design Code (Paste in Figma to use)';
}

export function encodeDesignData(htmlContent: string): string {
  const trimmed = htmlContent.trim();
  
  if (!trimmed) {
    throw new Error('Empty design content');
  }
  
  // Basic validation: Check if it looks like HTML
  if (!trimmed.includes('<') || !trimmed.includes('>')) {
    console.warn('Content does not appear to be HTML');
  }
  
  return trimmed;
}

export function decodeDesignData(encodedContent: string): string {
  if (!encodedContent) {
    throw new Error('No encoded content provided');
  }
  
  return encodedContent;
}

export function isValidHTML(content: string): boolean {
  const trimmed = content.trim();
  return trimmed.includes('<') && trimmed.includes('>');
}
