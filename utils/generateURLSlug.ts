export default (text: string) => text
  .toLowerCase()
  .trim()
  .replace(/[\s]/g, '-')
  .replace(/[^a-z0-9_\-\.]/g, '')
