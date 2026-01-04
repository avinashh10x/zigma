export function decode(encoded: string): any {
  // Implementation for decoding clipboard data
  return JSON.parse(Buffer.from(encoded, 'base64').toString());
}
