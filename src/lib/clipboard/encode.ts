export function encode(data: any): string {
  // Implementation for encoding clipboard data
  return Buffer.from(JSON.stringify(data)).toString('base64');
}
