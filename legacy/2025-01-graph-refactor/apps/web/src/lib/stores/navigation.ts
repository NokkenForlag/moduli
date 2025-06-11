import { writable } from 'svelte/store';

export const sidebarOpen = writable(false);
export const currentSection = writable('');
