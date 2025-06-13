import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fs from 'fs/promises';
import path from 'path';

export const GET: RequestHandler = async () => {
  const debug = {
    cwd: process.cwd(),
    contentPath: path.join(process.cwd(), '..', '..', 'packages', 'content', 'src', 'konsepter'),
    exists: false,
    files: [] as string[],
    error: null as any,
    conceptCount: 0
  };

  try {
    // Check if directory exists
    await fs.access(debug.contentPath);
    debug.exists = true;
    
    // List files
    debug.files = await fs.readdir(debug.contentPath);
    debug.conceptCount = debug.files.filter(f => f.endsWith('.md')).length;
  } catch (e) {
    debug.error = e?.toString();
  }

  return json(debug);
};