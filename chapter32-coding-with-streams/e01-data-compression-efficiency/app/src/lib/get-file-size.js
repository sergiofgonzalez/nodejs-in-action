import { promises as fs } from 'fs';


export async function getFileSize(filename) {
  const stat = await fs.stat(filename);
  return stat.size;
}