#!/bin/bash

echo "🎯 Moduli Systematic Cleanup - Tilbake til kjernevisjon"
echo "=================================================="
echo ""
echo "Mål:"
echo "1. Sentralisert styling og theming"
echo "2. Robust modulært UI-bibliotek"
echo "3. Innholdsbasert arkitektur (Markdown/YAML)"
echo ""

# Step 1: Analyze current state
echo "📊 STEP 1: Analyserer nåværende tilstand..."
echo "========================================="

# Find all imports in apps/web
echo ""
echo "📋 Imports i apps/web:"
echo "---------------------"
find apps/web/src -name "*.svelte" -o -name "*.ts" | while read file; do
  if grep -l "@moduli/" "$file" >/dev/null 2>&1; then
    echo ""
    echo "File: $file"
    grep "@moduli/" "$file" | grep -E "^import|from" | sed 's/^/  /'
  fi
done

# Check what exists in each package
echo ""
echo "📦 Eksisterende pakkestruktur:"
echo "-----------------------------"
for pkg in types ui content config utils graph; do
  echo ""
  echo "Package: @moduli/$pkg"
  if [ -d "packages/$pkg/src" ]; then
    echo "  Filer i src/:"
    find "packages/$pkg/src" -name "*.ts" -o -name "*.svelte" | head -10 | sed 's/^/    /'
    if [ -f "packages/$pkg/src/index.ts" ]; then
      echo "  ✓ index.ts exists"
    else
      echo "  ✗ index.ts missing"
    fi
  else
    echo "  ✗ No src directory"
  fi
done

# Step 2: Create cleanup plan
echo ""
echo ""
echo "📝 STEP 2: Opprydningsplan"
echo "========================="

cat > cleanup-plan.md << 'EOF'
# Moduli Cleanup Plan

## 1. Types Package (@moduli/types)
- [ ] Define all core types
- [ ] Export everything properly from index.ts
- [ ] Remove circular dependencies

## 2. UI Package (@moduli/ui)
- [ ] Complete component inventory
- [ ] Fix all exports in index.ts
- [ ] Implement centralized theming

## 3. Content Package (@moduli/content)
- [ ] Create proper loaders for Markdown/YAML
- [ ] Define content interfaces
- [ ] Export loading functions

## 4. Apps/Web
- [ ] Fix all imports to use @moduli/* packages
- [ ] Remove all hardcoded content
- [ ] Use only exported components from packages

## Next Steps:
1. Run fix-types-complete.sh
2. Run fix-ui-exports.sh
3. Run fix-content-loaders.sh
4. Run fix-web-imports.sh
EOF

echo "✓ Created cleanup-plan.md"

# Step 3: Generate specific fix scripts
echo ""
echo "📝 Genererer spesifikke fix-scripts..."

# Create comprehensive types fix
cat > fix-types-complete.sh << 'SCRIPT'
#!/bin/bash
echo "🔧 Fixing @moduli/types completely..."

cat > packages/types/src/content.ts << 'EOF'
import type { ConceptId, RelationType } from "./graph";

export enum ContentStatus {
  DRAFT = "draft",
  REVIEW = "review",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

export enum ContentType {
  CONCEPT = "concept",
  EXAMPLE = "example",
  EXERCISE = "exercise",
  THEOREM = "theorem",
  PROOF = "proof",
}

export interface ContentMetadata {
  author?: string;
  created?: Date;
  modified?: Date;
  version?: string;
  tags?: string[];
  difficulty?: number;
  timeEstimate?: number;
  prerequisites?: ConceptId[];
  learningObjectives?: string[];
}

export interface ContentItem {
  id: string;
  type: ContentType;
  status: ContentStatus;
  title: string;
  description?: string;
  content: string; // Markdown content
  metadata?: ContentMetadata;
  frontmatter?: Record<string, unknown>; // Raw YAML frontmatter
}

export interface ConceptContent extends ContentItem {
  type: ContentType.CONCEPT;
  examples?: string[]; // IDs of related examples
  exercises?: string[]; // IDs of related exercises
  relatedConcepts?: Array<{
    id: ConceptId;
    type: RelationType;
  }>;
  riveAnimations?: Array<{
    id: string;
    title: string;
    src: string;
  }>;
}

export interface ExampleContent extends ContentItem {
  type: ContentType.EXAMPLE;
  conceptId: ConceptId;
  solution?: string;
}

export interface ExerciseContent extends ContentItem {
  type: ContentType.EXERCISE;
  conceptId: ConceptId;
  solution?: string;
  hints?: string[];
}
EOF

cat > packages/types/src/ui.ts << 'EOF'
// UI Component prop types
export interface ComponentProps {
  class?: string;
  style?: string;
}

export interface ButtonProps extends ComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

export interface CardProps extends ComponentProps {
  title?: string;
  description?: string;
  href?: string;
  clickable?: boolean;
}

export interface LayoutProps extends ComponentProps {
  sidebar?: boolean;
  header?: boolean;
  maxWidth?: string;
}
EOF

cat > packages/types/src/theme.ts << 'EOF'
export interface ThemeColors {
  primary: string;
  primaryHover: string;
  secondary: string;
  secondaryHover: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  warning: string;
  success: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface ThemeTypography {
  fontFamily: string;
  fontFamilyMono: string;
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
}

export type ThemeMode = 'light' | 'dark' | 'cosmic';
EOF

cat > packages/types/src/index.ts << 'EOF'
// Re-export everything
export * from './content';
export * from './graph';
export * from './user';
export * from './utils';
export * from './ui';
export * from './theme';
EOF

echo "✓ Types package fixed!"
SCRIPT

# Create UI exports fix
cat > fix-ui-exports.sh << 'SCRIPT'
#!/bin/bash
echo "🔧 Fixing @moduli/ui exports..."

# First, create missing directories
mkdir -p packages/ui/src/components/{layout,navigation,content,form,feedback,theme,graph}
mkdir -p packages/ui/src/theme/{themes,tokens}
mkdir -p packages/ui/src/stores

# Create a complete index.ts
cat > packages/ui/src/index.ts << 'EOF'
// Layout Components
export { default as MainLayout } from './components/layout/MainLayout.svelte';

// Navigation Components  
export { default as TopNav } from './components/navigation/TopNav.svelte';
export { default as SideNav } from './components/navigation/SideNav.svelte';
export { default as Breadcrumbs } from './components/navigation/Breadcrumbs.svelte';

// Content Components
export { default as ConceptCard } from './components/content/ConceptCard.svelte';
export { default as PageHeader } from './components/content/PageHeader.svelte';
export { default as MarkdownContent } from './components/content/MarkdownContent.svelte';

// Form Components
export { default as Button } from './components/form/Button.svelte';
export { default as Input } from './components/form/Input.svelte';

// Feedback Components
export { default as Loading } from './components/feedback/Loading.svelte';
export { default as Toast } from './components/feedback/Toast.svelte';

// Theme Components
export { default as ThemeToggle } from './components/theme/ThemeToggle.svelte';

// Graph Components
export { default as HybridGraph } from './components/graph/HybridGraph.svelte';

// Theme system
export * from './theme';
export { cn } from './theme/classes';

// Stores
export { themeStore } from './stores/theme';
EOF

echo "✓ UI exports fixed!"
SCRIPT

# Make scripts executable
chmod +x fix-types-complete.sh
chmod +x fix-ui-exports.sh

echo ""
echo "✅ Cleanup analysis complete!"
echo ""
echo "📋 Neste steg:"
echo "1. Review cleanup-plan.md"
echo "2. Run: ./fix-types-complete.sh"
echo "3. Run: ./fix-ui-exports.sh"
echo "4. Then we'll fix content loaders and web imports"
EOF