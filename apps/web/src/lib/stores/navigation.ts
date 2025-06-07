import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface Breadcrumb {
  label: string;
  href?: string;
  icon?: string;
}

interface NavigationState {
  sideNavCollapsed: boolean;
  mobileMenuOpen: boolean;
  breadcrumbs: Breadcrumb[];
  activeSection?: string;
}

function createNavigationStore() {
  // Load saved preferences
  let savedPrefs = { sideNavCollapsed: false };
  
  if (browser) {
    const stored = localStorage.getItem('moduli-nav-prefs');
    if (stored) {
      try {
        savedPrefs = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse nav preferences:', e);
      }
    }
  }
  
  const initial: NavigationState = {
    sideNavCollapsed: savedPrefs.sideNavCollapsed,
    mobileMenuOpen: false,
    breadcrumbs: [],
    activeSection: undefined
  };
  
  const { subscribe, update, set } = writable<NavigationState>(initial);
  
  // Save preferences
  function savePreferences(state: NavigationState) {
    if (browser) {
      const prefs = {
        sideNavCollapsed: state.sideNavCollapsed
      };
      localStorage.setItem('moduli-nav-prefs', JSON.stringify(prefs));
    }
  }
  
  return {
    subscribe,
    
    toggleSideNav() {
      update(state => {
        state.sideNavCollapsed = !state.sideNavCollapsed;
        savePreferences(state);
        return state;
      });
    },
    
    setSideNavCollapsed(collapsed: boolean) {
      update(state => {
        state.sideNavCollapsed = collapsed;
        savePreferences(state);
        return state;
      });
    },
    
    toggleMobileMenu() {
      update(state => {
        state.mobileMenuOpen = !state.mobileMenuOpen;
        return state;
      });
    },
    
    closeMobileMenu() {
      update(state => {
        state.mobileMenuOpen = false;
        return state;
      });
    },
    
    setBreadcrumbs(breadcrumbs: Breadcrumb[]) {
      update(state => ({
        ...state,
        breadcrumbs
      }));
    },
    
    setActiveSection(section?: string) {
      update(state => ({
        ...state,
        activeSection: section
      }));
    },
    
    reset() {
      set(initial);
    }
  };
}

export const navigationState = createNavigationStore();

// Auto-close mobile menu on navigation
if (browser) {
  window.addEventListener('popstate', () => {
    navigationState.closeMobileMenu();
  });
}